"use client";

import { Toaster as SonnerToaster, toast } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#fff",
          border: "1px solid #E5E5E5",
          color: "#0A0A0A",
          borderRadius: "8px",
          fontSize: "14px",
        },
      }}
    />
  );
}

export { toast };
