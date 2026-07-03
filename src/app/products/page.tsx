"use client";

import { Metadata } from "next";
import ProductGrid from "@/components/products/product-grid";
import { useLanguage } from "@/lib/i18n";

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#EEEEEE] mb-4">
            {t("ourProducts")}
          </h1>
          <p className="text-lg text-[#EEEEEE]/60 max-w-2xl mx-auto">
            {t("productsDesc")}
          </p>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </div>
    </div>
  );
}
