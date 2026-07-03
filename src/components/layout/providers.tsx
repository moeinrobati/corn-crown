"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart-context";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>{children}</CartProvider>
    </LanguageProvider>
  );
}
