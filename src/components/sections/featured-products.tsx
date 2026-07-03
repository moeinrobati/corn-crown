"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveTiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";

const featuredProducts = products.filter((p) => p.featured);

export default function FeaturedProducts() {
  const { t, localize } = useLanguage();

  return (
    <section className="py-24 bg-[#EEEEEE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-[#467235] uppercase tracking-wider">
            {t("ourSelection")}
          </span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-black">
            {t("featuredHarvest")}
          </h2>
          <p className="mt-4 text-lg text-black/60 max-w-2xl mx-auto">
            {t("featuredDesc")}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/products/${product.id}`} className="block group">
                <div className="relative aspect-square mb-4">
                  <InteractiveTiltCard
                    image={{ src: product.image, alt: product.name }}
                    glareIntensity={0.4}
                    hoverScale={1.02}
                    borderRadius={16}
                  />
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-[#FFBF00] text-black font-semibold">
                        {product.badgeKey ? localize(product.badgeKey, product.badge || '') : product.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-[#467235] font-medium">
                    {localize(product.categoryKey, product.category)}
                  </p>
                  <h3 className="text-xl font-bold text-black group-hover:text-[#467235] transition-colors">
                    {localize(product.nameKey, product.name)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-[#FFBF00]">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-lg text-black/40 line-through">
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 bg-black text-[#FFBF00] font-semibold rounded-full hover:bg-black/90 transition-colors"
          >
            {t("viewAllProducts")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
