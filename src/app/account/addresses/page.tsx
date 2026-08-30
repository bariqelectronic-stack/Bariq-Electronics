"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { MapPin, Plus, Pencil, Trash2, Star, X } from "lucide-react";

type Address = {
  id: string;
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
};

const DEMO_ADDRESSES: Address[] = [
  {
    id: "addr_1",
    label: "Home",
    name: "Muhammad Bariq",
    phone: "0300 9445230",
    line1: "House #12, Street 5",
    line2: "Block C, Gulshan-e-Iqbal",
    city: "Karachi",
    province: "Sindh",
    postalCode: "75300",
    isDefault: true,
  },
];

type FormState = Omit<Address, "id" | "isDefault">;

const EMPTY_FORM: FormState = {
  label: "",
  name: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  province: "",
  postalCode: "",
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(DEMO_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(addr: Address) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, isDefault, ...rest } = addr;
    setForm(rest);
    setEditingId(id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...form } : a))
      );
      toast.success("Address updated.");
    } else {
      const newAddr: Address = {
        id: `addr_${Date.now()}`,
        ...form,
        isDefault: addresses.length === 0,
      };
      setAddresses((prev) => [...prev, newAddr]);
      toast.success("Address added.");
    }
    closeForm();
  }

  function handleDelete(id: string) {
    setAddresses((prev) => {
      const remaining = prev.filter((a) => a.id !== id);
      if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
        remaining[0].isDefault = true;
      }
      return remaining;
    });
    toast.success("Address removed.");
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Default address updated.");
  }

  const field = (
    key: keyof FormState,
    label: string,
    opts?: { placeholder?: string; required?: boolean }
  ) => (
    <Input
      label={label}
      value={form[key]}
      onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
      placeholder={opts?.placeholder}
      required={opts?.required ?? true}
    />
  );

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
            <span>/</span>
            <span>Addresses</span>
          </nav>
          <h1 className="text-xl font-black text-[#0A0A0A]">Saved Addresses</h1>
        </div>
      </div>

      <div className="container-site py-8 max-w-2xl">
        {/* Address cards */}
        <div className="space-y-3 mb-4">
          {addresses.length === 0 && (
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-10 text-center">
              <MapPin className="w-10 h-10 text-[#E5E5E5] mx-auto mb-3" />
              <p className="font-medium text-[#9E9E9E]">No saved addresses</p>
              <p className="text-xs text-[#BDBDBD] mt-1">Add an address to speed up checkout.</p>
            </div>
          )}

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`bg-white border rounded-[12px] p-5 relative ${
                addr.isDefault
                  ? "border-[#E65C00] ring-1 ring-[#E65C00]/20"
                  : "border-[#E5E5E5]"
              }`}
            >
              {addr.isDefault && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#E65C00] bg-[#FFF5EE] border border-[#E65C00]/20 rounded-full px-2 py-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Default
                </span>
              )}

              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-8 h-8 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#9E9E9E]" />
                </div>
                <div className="flex-1 min-w-0">
                  {addr.label && (
                    <div className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wide mb-1">{addr.label}</div>
                  )}
                  <div className="font-semibold text-[#0A0A0A] text-sm">{addr.name}</div>
                  <div className="text-sm text-[#6B6B6B] mt-0.5">
                    {addr.line1}
                    {addr.line2 && `, ${addr.line2}`}
                  </div>
                  <div className="text-sm text-[#6B6B6B]">
                    {[addr.city, addr.province, addr.postalCode].filter(Boolean).join(", ")}
                  </div>
                  <div className="text-sm text-[#6B6B6B]">{addr.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F0F0F0]">
                <button
                  onClick={() => openEdit(addr)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <span className="text-[#E5E5E5]">|</span>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] hover:text-[#DC2626] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-[#E5E5E5]">|</span>
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#6B6B6B] hover:text-[#E65C00] transition-colors"
                    >
                      <Star className="w-3.5 h-3.5" />
                      Set as default
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full font-bold" onClick={openAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>

        <p className="text-xs text-[#9E9E9E] text-center mt-4">
          Address changes require database and authentication configuration.
        </p>
      </div>

      {/* Address form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeForm} />
          <div className="relative bg-white w-full sm:max-w-lg sm:rounded-[16px] rounded-t-[16px] p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black text-[#0A0A0A]">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                onClick={closeForm}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {field("label", "Label (e.g. Home, Office)", { placeholder: "Home", required: false })}
              <div className="grid grid-cols-2 gap-4">
                {field("name", "Full Name", { placeholder: "Muhammad Bariq" })}
                {field("phone", "Phone", { placeholder: "0300 9445230" })}
              </div>
              {field("line1", "Address Line 1", { placeholder: "House #, Street" })}
              {field("line2", "Address Line 2", { placeholder: "Block, Area (optional)", required: false })}
              <div className="grid grid-cols-2 gap-4">
                {field("city", "City", { placeholder: "Karachi" })}
                {field("province", "Province", { placeholder: "Sindh" })}
              </div>
              {field("postalCode", "Postal Code", { placeholder: "75300", required: false })}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 font-bold" onClick={closeForm}>
                  Cancel
                </Button>
                <Button type="submit" loading={loading} className="flex-1 font-bold">
                  {editingId ? "Save Changes" : "Add Address"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
