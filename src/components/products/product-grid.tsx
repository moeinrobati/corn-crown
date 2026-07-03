"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveTiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

export default function ProductGrid() {
  const { t, localize } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categoryKey === "cat." + selectedCategory);

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat.key
                ? "bg-[#FFBF00] text-black"
                : "bg-white/10 text-[#EEEEEE] hover:bg-white/20"
            }`}
          >
            {t('cat.' + cat.key)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/products/${product.id}`} className="block group">
              <div className="relative aspect-square mb-3">
                <InteractiveTiltCard
                  image={{ src: product.image, alt: product.name }}
                  glareIntensity={0.3}
                  hoverScale={1.02}
                  borderRadius={12}
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-[#FFBF00] text-black font-semibold text-xs">
                      {product.badgeKey ? localize(product.badgeKey, product.badge || '') : product.badge}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#467235] font-medium">
                  {localize(product.categoryKey, product.category)}
                </p>
                <h3 className="text-sm font-bold text-[#EEEEEE] group-hover:text-[#FFBF00] transition-colors">
                  {localize(product.nameKey, product.name)}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-[#FFBF00]">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-sm text-[#EEEEEE]/40 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  )}
                  {product.discount && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#EEEEEE]/60 text-lg">
            {t("noProductsFound")}
          </p>
        </div>
      )}
    </div>
  );
}
