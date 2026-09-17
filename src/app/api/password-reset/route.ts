import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { siteConfig } from "@/lib/config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured." },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    // Always return the same response to avoid exposing account existence.
    if (!user || !user.passwordHash) {
      return NextResponse.json({ success: true });
    }

    const token = randomBytes(32).toString("hex");
    const identifier = `password-reset:${normalizedEmail}`;
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.identifier, identifier));

    await db.insert(verificationTokens).values({
      identifier,
      token,
      expires,
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://bariq-electronics.vercel.app";

    const resetUrl =
      `${baseUrl}/reset-password?token=${encodeURIComponent(token)}` +
      `&email=${encodeURIComponent(normalizedEmail)}`;

    const apiKey = process.env.RESEND_API_KEY;
    const from =
      process.env.RESEND_FROM ||
      `${siteConfig.name} <noreply@bariqelectronics.com>`;

    if (!apiKey) {
      console.error("[password-reset] RESEND_API_KEY is missing");
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const html = `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:32px">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;padding:32px">
          <h2 style="margin:0 0 12px;color:#0A0A0A">
            Reset Your Password
          </h2>

          <p style="color:#6B6B6B;font-size:15px;line-height:1.6">
            Hi ${user.name || "there"},
          </p>

          <p style="color:#6B6B6B;font-size:15px;line-height:1.6">
            We received a request to reset your Bariq Electronics password.
          </p>

          <a
            href="${resetUrl}"
            style="display:inline-block;background:#E65C00;color:#fff;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:8px;margin:12px 0"
          >
            Reset Password
          </a>

          <p style="color:#9E9E9E;font-size:13px;line-height:1.6">
            This link expires in 1 hour.
            If you did not request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `;

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [normalizedEmail],
          subject: `Reset your password — ${siteConfig.name}`,
          html,
          text: `Reset your password: ${resetUrl}`,
        }),
      }
    );

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();

      console.error(
        "[password-reset] Resend error:",
        errorText
      );

      return NextResponse.json(
        { error: "Unable to send reset email right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[password-reset]", error);

    return NextResponse.json(
      { error: "Unable to process your request." },
      { status: 500 }
    );
  }
}