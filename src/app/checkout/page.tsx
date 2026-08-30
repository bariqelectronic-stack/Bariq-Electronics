"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { Check, Lock } from "lucide-react";

const STEPS = ["Information", "Shipping", "Payment"];

const COUNTRIES = [
  { value: "PK", label: "Pakistan" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "CN", label: "China" },
  { value: "IN", label: "India" },
  { value: "AU", label: "Australia" },
  { value: "CA", label: "Canada" },
];

export default function CheckoutPage() {
  const { items, getSubtotal, getItemCount, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", company: "",
    line1: "", line2: "", city: "", state: "", postalCode: "", country: "PK", phone: "",
    shippingMethod: "standard", paymentMethod: "bank_transfer",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePlaceOrder() {
    const num = `BRQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setOrderNumber(num);
    setOrderPlaced(true);
    clearCart();
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#6B6B6B] mb-4">Your cart is empty.</p>
          <Link href="/shop"><Button>Shop Now</Button></Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen">
        <div className="container-site py-16">
          <div className="max-w-lg mx-auto bg-white border border-[#E5E5E5] rounded-[12px] p-10 text-center">
            <div className="w-14 h-14 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-[#16A34A]" />
            </div>
            <h1 className="text-xl font-black text-[#0A0A0A] mb-2">Order Placed!</h1>
            <p className="text-sm text-[#6B6B6B] mb-4">
              Thank you for your order. Your order number is:
            </p>
            <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] px-5 py-3 font-mono font-bold text-[#0A0A0A] text-lg mb-6">
              {orderNumber}
            </div>
            <p className="text-xs text-[#9E9E9E] mb-6">
              We&apos;ll contact you at <strong>{form.email}</strong> to confirm your order and payment details.
            </p>
            <div className="space-y-2">
              <Link href="/shop">
                <Button className="w-full font-bold">Continue Shopping</Button>
              </Link>
              <Link href={`/track-order`} className="block text-sm text-[#E65C00] hover:underline mt-2">
                Track your order
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#E65C00] rounded-[5px] flex items-center justify-center">
                <span className="text-white font-black text-xs">BE</span>
              </div>
              <span className="font-bold text-sm text-[#0A0A0A]">Bariq Electronics</span>
            </Link>
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#9E9E9E]" />
              <span className="text-xs text-[#9E9E9E]">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-3">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-1.5 text-xs font-medium ${i === step ? "text-[#E65C00]" : i < step ? "text-[#16A34A]" : "text-[#9E9E9E]"}`}>
                  {i < step ? <Check className="w-3.5 h-3.5" /> : <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold" style={{ borderColor: "currentColor" }}>{i + 1}</span>}
                  {s}
                </div>
                {i < STEPS.length - 1 && <div className="flex-1 h-px bg-[#E5E5E5]" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
                <h2 className="font-bold text-[#0A0A0A] mb-5">Customer Information</h2>
                <div className="space-y-4">
                  <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="your@email.com" required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="First Name" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} required />
                    <Input label="Last Name" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} required />
                  </div>
                  <Input label="Company (optional)" value={form.company} onChange={(e) => handleChange("company", e.target.value)} />
                  <Input label="Address" value={form.line1} onChange={(e) => handleChange("line1", e.target.value)} placeholder="Street address" required />
                  <Input label="Apartment, suite, etc. (optional)" value={form.line2} onChange={(e) => handleChange("line2", e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="City" value={form.city} onChange={(e) => handleChange("city", e.target.value)} required />
                    <Input label="State / Province" value={form.state} onChange={(e) => handleChange("state", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Postal Code" value={form.postalCode} onChange={(e) => handleChange("postalCode", e.target.value)} />
                    <Select label="Country" value={form.country} onChange={(e) => handleChange("country", e.target.value)} options={COUNTRIES} />
                  </div>
                  <Input label="Phone" type="tel" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                </div>
                <Button className="mt-6 w-full font-bold" onClick={() => setStep(1)} disabled={!form.email || !form.firstName || !form.line1 || !form.city}>
                  Continue to Shipping
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
                <h2 className="font-bold text-[#0A0A0A] mb-5">Shipping Method</h2>
                <div className="space-y-3">
                  {[
                    { value: "standard", label: "Standard Shipping", desc: "Estimated delivery time will be provided after order confirmation", price: "Calculated at checkout" },
                    { value: "express", label: "Express Shipping", desc: "Faster delivery where available", price: "Calculated at checkout" },
                  ].map((method) => (
                    <label key={method.value} className={`flex items-start gap-3 p-4 border rounded-[8px] cursor-pointer transition-colors ${form.shippingMethod === method.value ? "border-[#E65C00] bg-[#F7F3EE]" : "border-[#E5E5E5] hover:border-[#D0D0D0]"}`}>
                      <input type="radio" name="shipping" value={method.value} checked={form.shippingMethod === method.value} onChange={() => handleChange("shippingMethod", method.value)} className="mt-0.5" />
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#0A0A0A]">{method.label}</div>
                        <div className="text-xs text-[#9E9E9E] mt-0.5">{method.desc}</div>
                      </div>
                      <div className="text-sm font-medium text-[#6B6B6B]">{method.price}</div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                  <Button className="flex-1 font-bold" onClick={() => setStep(2)}>Continue to Payment</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
                <h2 className="font-bold text-[#0A0A0A] mb-5">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[
                    { value: "bank_transfer", label: "🏦 Bank Transfer", desc: "Pay via direct bank transfer. Account details will be sent after order confirmation." },
                    { value: "cod", label: "💵 Cash on Delivery", desc: "Pay cash when your order arrives. Available in select areas." },
                    { value: "whatsapp", label: "📱 Pay via WhatsApp", desc: "Place your order and arrange payment directly on WhatsApp." },
                  ].map((method) => (
                    <label key={method.value} className={`flex items-start gap-3 p-4 border rounded-[8px] cursor-pointer transition-colors ${form.paymentMethod === method.value ? "border-[#E65C00] bg-[#F7F3EE]" : "border-[#E5E5E5] hover:border-[#D0D0D0]"}`}>
                      <input type="radio" name="payment" value={method.value} checked={form.paymentMethod === method.value} onChange={() => handleChange("paymentMethod", method.value)} className="mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-[#0A0A0A]">{method.label}</div>
                        <div className="text-xs text-[#9E9E9E] mt-0.5">{method.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] p-4 mb-5 text-xs text-[#6B6B6B]">
                  <strong>Note:</strong> We currently accept Bank Transfer, Cash on Delivery, and WhatsApp-arranged payments.
                  JazzCash and EasyPaisa integration can be activated — see <code>.env.example</code> for setup.
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button className="flex-1 font-bold" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 sticky top-20">
              <h3 className="font-bold text-[#0A0A0A] mb-4 pb-3 border-b border-[#E5E5E5] text-sm">
                Order Summary ({itemCount} {itemCount === 1 ? "item" : "items"})
              </h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-2 text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0A0A0A] text-xs font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-[#9E9E9E] text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-[#0A0A0A] font-medium text-xs flex-shrink-0">
                      {item.priceAtAdd > 0 ? formatPrice(item.priceAtAdd * item.quantity) : "—"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#E5E5E5] pt-3 space-y-1.5 text-sm">
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Subtotal</span>
                  <span>{subtotal > 0 ? formatPrice(subtotal) : "—"}</span>
                </div>
                <div className="flex justify-between text-[#6B6B6B]">
                  <span>Shipping</span>
                  <span>TBD</span>
                </div>
                <div className="flex justify-between font-bold text-[#0A0A0A] pt-2 border-t border-[#E5E5E5]">
                  <span>Total</span>
                  <span>{subtotal > 0 ? formatPrice(subtotal) : "—"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
