import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  MessageCircle,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/config";

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: { label: "Pending", color: "warning", icon: Clock },
  confirmed: { label: "Confirmed", color: "info", icon: Package },
  shipped: { label: "Shipped", color: "info", icon: Truck },
  delivered: { label: "Delivered", color: "success", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "error", icon: XCircle },
};

const TIMELINE_STEPS: { key: OrderStatus; label: string; description: string }[] = [
  { key: "pending", label: "Order Placed", description: "Your order has been received" },
  { key: "confirmed", label: "Confirmed", description: "Order verified and being prepared" },
  { key: "shipped", label: "Shipped", description: "On the way to your address" },
  { key: "delivered", label: "Delivered", description: "Successfully delivered" },
];

// Demo order data — replace with DB lookup once configured
const DEMO_ORDERS: Record<
  string,
  {
    id: string;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
    trackingNumber?: string;
    items: { name: string; sku: string; qty: number; note: string }[];
    address: {
      name: string;
      phone: string;
      line1: string;
      line2?: string;
      city: string;
      province: string;
    };
    paymentMethod: string;
    notes?: string;
  }
> = {
  "ORD-0001": {
    id: "ORD-0001",
    status: "shipped",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-22",
    trackingNumber: "TCS-123456789",
    items: [
      { name: "Digital Microscope Pro (Demo)", sku: "DEMO-001", qty: 1, note: "Price: Contact for quote" },
      { name: "Hot Air Rework Station (Demo)", sku: "DEMO-003", qty: 1, note: "Price: Contact for quote" },
    ],
    address: {
      name: "Muhammad Bariq",
      phone: "0300 9445230",
      line1: "House #12, Street 5, Block C",
      line2: "Gulshan-e-Iqbal",
      city: "Karachi",
      province: "Sindh",
    },
    paymentMethod: "Bank Transfer",
    notes: "Please pack securely.",
  },
};

function getStepIndex(status: OrderStatus): number {
  if (status === "cancelled") return -1;
  return TIMELINE_STEPS.findIndex((s) => s.key === status);
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = DEMO_ORDERS[id];

  if (!order) {
    // Show a graceful "not found" that also handles non-demo IDs
    return (
      <div className="bg-[#F7F7F7] min-h-screen">
        <div className="bg-white border-b border-[#E5E5E5]">
          <div className="container-site py-6">
            <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
              <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
              <span>/</span>
              <Link href="/account/orders" className="hover:text-[#0A0A0A]">Orders</Link>
              <span>/</span>
              <span>{id}</span>
            </nav>
            <h1 className="text-xl font-black text-[#0A0A0A]">Order Not Found</h1>
          </div>
        </div>
        <div className="container-site py-16 text-center max-w-lg">
          <AlertCircle className="w-12 h-12 text-[#E5E5E5] mx-auto mb-4" />
          <p className="font-medium text-[#9E9E9E]">
            Order <span className="font-mono text-[#0A0A0A]">{id}</span> could not be found.
          </p>
          <p className="text-sm text-[#BDBDBD] mt-1 mb-6">
            It may belong to a different account or require database configuration.
          </p>
          <Link href="/account/orders">
            <Button variant="outline" className="font-bold">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[order.status];
  const StatusIcon = statusCfg.icon;
  const stepIndex = getStepIndex(order.status);
  const whatsappLink = getWhatsAppLink(`Hi, I have a question about order ${order.id}`);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
            <span>/</span>
            <Link href="/account/orders" className="hover:text-[#0A0A0A]">Orders</Link>
            <span>/</span>
            <span className="font-mono">{order.id}</span>
          </nav>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-black text-[#0A0A0A]">Order {order.id}</h1>
              <p className="text-sm text-[#9E9E9E] mt-0.5">Placed {order.createdAt}</p>
            </div>
            <Badge variant={statusCfg.color as "success" | "warning" | "error" | "info"} className="text-sm px-3 py-1">
              <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
              {statusCfg.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container-site py-8 max-w-3xl space-y-4">
        {/* Timeline */}
        {order.status !== "cancelled" && (
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            <h2 className="text-sm font-bold text-[#0A0A0A] mb-5">Order Progress</h2>
            <div className="relative">
              {/* Track line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#E5E5E5] hidden sm:block" />
              <div
                className="absolute top-4 left-4 h-0.5 bg-[#E65C00] hidden sm:block transition-all"
                style={{
                  width: stepIndex >= 0 ? `${(stepIndex / (TIMELINE_STEPS.length - 1)) * 100}%` : "0%",
                }}
              />

              <div className="grid grid-cols-4 gap-2 relative">
                {TIMELINE_STEPS.map((step, i) => {
                  const done = i <= stepIndex;
                  const active = i === stepIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 relative z-10 transition-all ${
                          done
                            ? "bg-[#E65C00] border-[#E65C00] text-white"
                            : "bg-white border-[#E5E5E5] text-[#BDBDBD]"
                        } ${active ? "ring-2 ring-[#E65C00]/25" : ""}`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{i + 1}</span>
                        )}
                      </div>
                      <div className={`text-xs font-semibold ${done ? "text-[#0A0A0A]" : "text-[#BDBDBD]"}`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-[#9E9E9E] mt-0.5 hidden sm:block">{step.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t border-[#F0F0F0] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#9E9E9E]">Tracking Number</div>
                  <div className="font-mono font-bold text-sm text-[#0A0A0A]">{order.trackingNumber}</div>
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  Track via WhatsApp
                </a>
              </div>
            )}
          </div>
        )}

        {/* Cancelled banner */}
        {order.status === "cancelled" && (
          <div className="bg-[#FEF2F2] border border-[#DC2626]/20 rounded-[12px] p-4 flex items-start gap-3">
            <XCircle className="w-5 h-5 text-[#DC2626] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#DC2626] text-sm">Order Cancelled</div>
              <div className="text-xs text-[#6B6B6B] mt-0.5">
                This order was cancelled on {order.updatedAt}. Contact us if you have questions.
              </div>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F0F0F0]">
            <h2 className="text-sm font-bold text-[#0A0A0A]">Items Ordered</h2>
          </div>
          <div className="divide-y divide-[#F0F0F0]">
            {order.items.map((item, i) => (
              <div key={i} className="px-5 py-4 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#BDBDBD]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0A0A0A] text-sm">{item.name}</div>
                  <div className="text-xs text-[#9E9E9E] font-mono mt-0.5">SKU: {item.sku}</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">{item.note}</div>
                </div>
                <div className="text-sm font-bold text-[#0A0A0A] flex-shrink-0">×{item.qty}</div>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 bg-[#F7F7F7] border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6B6B]">Payment Method</span>
              <span className="font-semibold text-[#0A0A0A]">{order.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1.5">
              <span className="text-[#6B6B6B]">Total</span>
              <span className="font-black text-[#0A0A0A]">Contact for pricing</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-[#E65C00]" />
            <h2 className="text-sm font-bold text-[#0A0A0A]">Shipping Address</h2>
          </div>
          <div className="text-sm text-[#6B6B6B] space-y-0.5">
            <div className="font-semibold text-[#0A0A0A]">{order.address.name}</div>
            <div>{order.address.line1}</div>
            {order.address.line2 && <div>{order.address.line2}</div>}
            <div>{order.address.city}, {order.address.province}</div>
            <div>{order.address.phone}</div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-5">
            <h2 className="text-sm font-bold text-[#0A0A0A] mb-2">Order Notes</h2>
            <p className="text-sm text-[#6B6B6B]">{order.notes}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/account/orders" className="flex-1">
            <Button variant="outline" className="w-full font-bold">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Orders
            </Button>
          </Link>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="w-full font-bold bg-[#25D366] hover:bg-[#1ebe5d]">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </a>
        </div>

        <p className="text-xs text-[#9E9E9E] text-center">
          Full order tracking requires database and authentication configuration.
        </p>
      </div>
    </div>
  );
}
