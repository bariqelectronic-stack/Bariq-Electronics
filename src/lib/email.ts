/**
 * Email service abstraction for Bariq Electronics.
 *
 * Provider-agnostic layer — swap the implementation below for any transactional
 * email provider (Resend, Nodemailer, SendGrid, Postmark, etc.) without
 * touching the rest of the codebase.
 *
 * Usage:
 *   import { sendEmail, emailTemplates } from "@/lib/email";
 *   await sendEmail(emailTemplates.orderConfirmation({ order }));
 *
 * Setup:
 *   1. Install a provider SDK (e.g. `npm i resend`)
 *   2. Set the relevant env var (RESEND_API_KEY, SENDGRID_API_KEY, etc.)
 *   3. Implement sendEmail() below
 */

import { siteConfig } from "@/lib/config";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Provider implementation
// ---------------------------------------------------------------------------

/**
 * Send a transactional email.
 *
 * Replace the stub below with your chosen provider SDK call.
 * Example using Resend:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   const { data, error } = await resend.emails.send({ ... });
 */
/**
 * Checks whether an email provider is configured in the current environment.
 * Returns true if either Resend or SMTP credentials are present.
 */
export function isEmailConfigured(): boolean {
  return !!(process.env.RESEND_API_KEY || process.env.EMAIL_SERVER_HOST);
}

/**
 * Sends a transactional email.
 *
 * Returns { success: false, error: "not_configured" } silently if no
 * provider credentials are set — callers can decide whether to surface this.
 *
 * To activate email:
 *   Option A — Resend (recommended):
 *     npm install resend
 *     Add RESEND_API_KEY to .env.local
 *     Uncomment the Resend block below.
 *
 *   Option B — SMTP (Nodemailer):
 *     npm install nodemailer @types/nodemailer
 *     Add EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD
 *     Uncomment the Nodemailer block below.
 */
export async function sendEmail(payload: EmailPayload): Promise<SendEmailResult> {
  // ── Not configured ─────────────────────────────────────────────────────────
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[email] Not configured — would send "${payload.subject}" to ${payload.to}. ` +
        "Add RESEND_API_KEY or SMTP vars to .env.local to enable."
      );
    }
    return { success: false, error: "not_configured" };
  }

  // ── Option A: Resend ───────────────────────────────────────────────────────
  // Uncomment after: npm install resend
  //
  // if (process.env.RESEND_API_KEY) {
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   const from = payload.from ?? `${siteConfig.name} <noreply@bariqelectronics.com>`;
  //   const { data, error } = await resend.emails.send({
  //     from,
  //     to: payload.to,
  //     subject: payload.subject,
  //     html: payload.html,
  //     text: payload.text,
  //     reply_to: payload.replyTo,
  //   });
  //   if (error) return { success: false, error: error.message };
  //   return { success: true, messageId: data?.id };
  // }

  // ── Option B: SMTP (Nodemailer) ────────────────────────────────────────────
  // Uncomment after: npm install nodemailer @types/nodemailer
  //
  // if (process.env.EMAIL_SERVER_HOST) {
  //   const nodemailer = await import("nodemailer");
  //   const transport = nodemailer.createTransport({
  //     host: process.env.EMAIL_SERVER_HOST,
  //     port: Number(process.env.EMAIL_SERVER_PORT || 587),
  //     auth: {
  //       user: process.env.EMAIL_SERVER_USER,
  //       pass: process.env.EMAIL_SERVER_PASSWORD,
  //     },
  //   });
  //   const info = await transport.sendMail({
  //     from: payload.from ?? process.env.EMAIL_FROM ?? siteConfig.email,
  //     to: payload.to,
  //     subject: payload.subject,
  //     html: payload.html,
  //     text: payload.text,
  //   });
  //   return { success: true, messageId: info.messageId };
  // }

  return { success: false, error: "not_configured" };
}

// ---------------------------------------------------------------------------
// Templates
// ---------------------------------------------------------------------------

const brandColor = "#E65C00";

function baseLayout(body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${siteConfig.name}</title>
</head>
<body style="margin:0;padding:0;background:#F7F7F7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F7F7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:${brandColor};padding:24px 32px;">
            <span style="color:#ffffff;font-size:20px;font-weight:900;letter-spacing:-0.5px;">${siteConfig.name}</span>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${body}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #F0F0F0;background:#F7F7F7;">
            <p style="margin:0;font-size:11px;color:#9E9E9E;text-align:center;">
              ${siteConfig.name} &bull; ${siteConfig.phone} &bull; ${siteConfig.email}
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function button(label: string, href: string): string {
  return `<a href="${href}" style="display:inline-block;background:${brandColor};color:#ffffff;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px;">${label}</a>`;
}

// ---------------------------------------------------------------------------
// Email template builders
// ---------------------------------------------------------------------------

export const emailTemplates = {
  orderConfirmation({
    order,
    customerName,
    baseUrl,
  }: {
    order: { id: string; items: { name: string; qty: number }[] };
    customerName: string;
    baseUrl: string;
  }): EmailPayload {
    const itemRows = order.items
      .map((i) => `<tr><td style="padding:8px 0;border-bottom:1px solid #F0F0F0;font-size:14px;color:#0A0A0A;">${i.name}</td><td style="padding:8px 0;border-bottom:1px solid #F0F0F0;font-size:14px;color:#6B6B6B;text-align:right;">×${i.qty}</td></tr>`)
      .join("");

    const body = `
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#0A0A0A;">Order Confirmed</h2>
      <p style="margin:0 0 24px;font-size:15px;color:#6B6B6B;">Hi ${customerName}, thank you for your order!</p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#9E9E9E;text-transform:uppercase;letter-spacing:0.5px;">Order ID</p>
      <p style="margin:0 0 24px;font-size:18px;font-weight:900;color:#0A0A0A;font-family:monospace;">${order.id}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
        <thead><tr><th style="text-align:left;font-size:11px;font-weight:700;color:#9E9E9E;text-transform:uppercase;padding-bottom:8px;border-bottom:2px solid #E5E5E5;">Item</th><th style="text-align:right;font-size:11px;font-weight:700;color:#9E9E9E;text-transform:uppercase;padding-bottom:8px;border-bottom:2px solid #E5E5E5;">Qty</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <p style="font-size:14px;color:#6B6B6B;">Our team will contact you to confirm pricing and payment details. You can also reach us on WhatsApp anytime.</p>
      ${button("View Order", `${baseUrl}/account/orders/${order.id}`)}
    `;

    return {
      to: "",
      subject: `Order Confirmed — ${order.id} | ${siteConfig.name}`,
      html: baseLayout(body),
      text: `Order ${order.id} confirmed. View at ${baseUrl}/account/orders/${order.id}`,
    };
  },

  orderShipped({
    order,
    customerName,
    trackingNumber,
    baseUrl,
  }: {
    order: { id: string };
    customerName: string;
    trackingNumber?: string;
    baseUrl: string;
  }): EmailPayload {
    const trackingSection = trackingNumber
      ? `<p style="font-size:14px;color:#6B6B6B;">Tracking number: <strong style="color:#0A0A0A;font-family:monospace;">${trackingNumber}</strong></p>`
      : "";

    const body = `
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#0A0A0A;">Your Order is on the Way!</h2>
      <p style="margin:0 0 24px;font-size:15px;color:#6B6B6B;">Hi ${customerName}, order <strong>${order.id}</strong> has been shipped.</p>
      ${trackingSection}
      <p style="font-size:14px;color:#6B6B6B;">Contact us on WhatsApp if you need help with tracking.</p>
      ${button("Track Order", `${baseUrl}/account/orders/${order.id}`)}
    `;

    return {
      to: "",
      subject: `Your order has shipped — ${order.id} | ${siteConfig.name}`,
      html: baseLayout(body),
      text: `Order ${order.id} shipped.${trackingNumber ? ` Tracking: ${trackingNumber}` : ""}`,
    };
  },

  passwordReset({
    resetUrl,
    customerName,
  }: {
    resetUrl: string;
    customerName: string;
  }): EmailPayload {
    const body = `
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#0A0A0A;">Reset Your Password</h2>
      <p style="margin:0 0 24px;font-size:15px;color:#6B6B6B;">Hi ${customerName}, we received a request to reset your password. Click the button below to set a new one.</p>
      ${button("Reset Password", resetUrl)}
      <p style="margin-top:20px;font-size:13px;color:#9E9E9E;">This link expires in 1 hour. If you didn&rsquo;t request a password reset, you can safely ignore this email.</p>
    `;

    return {
      to: "",
      subject: `Reset your password — ${siteConfig.name}`,
      html: baseLayout(body),
      text: `Reset your password: ${resetUrl}`,
    };
  },

  contactConfirmation({
    name,
    message,
  }: {
    name: string;
    message: string;
  }): EmailPayload {
    const body = `
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#0A0A0A;">Message Received</h2>
      <p style="margin:0 0 24px;font-size:15px;color:#6B6B6B;">Hi ${name}, we&rsquo;ve received your message and will get back to you shortly.</p>
      <div style="background:#F7F7F7;border-radius:8px;padding:16px;margin-bottom:24px;">
        <p style="margin:0;font-size:14px;color:#6B6B6B;font-style:italic;">&ldquo;${message.substring(0, 200)}${message.length > 200 ? "…" : ""}&rdquo;</p>
      </div>
      <p style="font-size:14px;color:#6B6B6B;">You can also reach us directly on WhatsApp at <strong>${siteConfig.whatsapp}</strong> for faster responses.</p>
    `;

    return {
      to: "",
      subject: `We received your message — ${siteConfig.name}`,
      html: baseLayout(body),
      text: `Hi ${name}, we received your message. We'll get back to you soon.`,
    };
  },

  wholesaleEnquiry({
    businessName,
    contactName,
    email,
    phone,
    message,
  }: {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    message: string;
  }): EmailPayload {
    const body = `
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:900;color:#0A0A0A;">New Wholesale Enquiry</h2>
      <table width="100%" style="margin-bottom:16px;">
        <tr><td style="padding:6px 0;font-size:13px;color:#9E9E9E;width:120px;">Business</td><td style="font-size:14px;font-weight:600;color:#0A0A0A;">${businessName}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9E9E9E;">Contact</td><td style="font-size:14px;font-weight:600;color:#0A0A0A;">${contactName}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9E9E9E;">Email</td><td style="font-size:14px;font-weight:600;color:#0A0A0A;">${email}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#9E9E9E;">Phone</td><td style="font-size:14px;font-weight:600;color:#0A0A0A;">${phone}</td></tr>
      </table>
      <div style="background:#F7F7F7;border-radius:8px;padding:16px;">
        <p style="margin:0;font-size:14px;color:#6B6B6B;">${message}</p>
      </div>
    `;

    return {
      to: siteConfig.email,
      replyTo: email,
      subject: `Wholesale Enquiry from ${businessName} — ${siteConfig.name}`,
      html: baseLayout(body),
      text: `Wholesale enquiry from ${businessName} (${contactName}). Email: ${email}. Phone: ${phone}. Message: ${message}`,
    };
  },
};
