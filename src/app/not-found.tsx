import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="bg-[#F7F7F7] min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-6xl font-black text-[#E5E5E5] mb-4">404</div>
        <h1 className="text-xl font-black text-[#0A0A0A] mb-2">Page Not Found</h1>
        <p className="text-sm text-[#9E9E9E] mb-6 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href="/">
            <Button className="font-bold">Go to Homepage</Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="font-semibold">Browse Products</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
