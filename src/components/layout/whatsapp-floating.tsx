'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/config';

export function WhatsAppFloating() {
  const message =
    'Hello Bariq Electronics, I would like to know more about your products.';

  return (
    <a
      href={getWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bariq Electronics on WhatsApp"
      className="fixed bottom-20 right-6 sm:bottom-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" />
    </a>
  );
}

