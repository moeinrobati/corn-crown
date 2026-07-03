"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { InteractiveTiltCard } from "@/components/ui/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { Product } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart-context";
import Emoji from "@/components/ui/emoji";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: Props) {
  const { t, localize } = useLanguage();
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      router.push("/cart");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToProducts")}
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square"
          >
            <InteractiveTiltCard
              image={{ src: product.image, alt: product.name }}
              glareIntensity={0.4}
              hoverScale={1.02}
              borderRadius={20}
            />
            {product.badge && (
              <div className="absolute top-6 left-6 z-10">
                <Badge className="bg-[#FFBF00] text-black font-semibold text-sm px-4 py-1">
                  {product.badgeKey ? localize(product.badgeKey, product.badge || '') : product.badge}
                </Badge>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-[#467235] font-medium uppercase tracking-wider">
                {localize(product.categoryKey, product.category)}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#EEEEEE] mt-2">
                {localize(product.nameKey, product.name)}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-4xl font-bold text-[#FFBF00]">
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-xl text-[#EEEEEE]/40 line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
              {product.discount && (
                <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.discount}%
                </span>
              )}
            </div>

            <Separator className="bg-white/10" />

            <p className="text-lg text-[#EEEEEE]/80 leading-relaxed">
              {localize(product.descKey, product.description)}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#EEEEEE]">
                {t("quantity")}
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/20 rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-[#EEEEEE] font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[#EEEEEE]/60">
                  ${(product.price * quantity).toFixed(2)} {t("total")}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={isAdded}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-3 px-8 py-4 font-semibold rounded-full transition-all duration-300 text-lg ${
                isAdded
                  ? "bg-[#467235] text-white"
                  : "bg-[#FFBF00] text-black hover:bg-[#FFBF00]/90"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  {t("addToCart")}
                </>
              )}
            </motion.button>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="mb-1"><Emoji size={28}>🌿</Emoji></div>
                <p className="text-sm text-[#EEEEEE]">{t("organic")}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="mb-1"><Emoji size={28}>🚚</Emoji></div>
                <p className="text-sm text-[#EEEEEE]">{t("freeShipping")}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="mb-1"><Emoji size={28}>⭐</Emoji></div>
                <p className="text-sm text-[#EEEEEE]">{t("premiumQuality")}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="mb-1"><Emoji size={28}>🔄</Emoji></div>
                <p className="text-sm text-[#EEEEEE]">{t("easyReturns")}</p>
              </div>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[#EEEEEE] mb-4">
                  {t('specifications')}
                </h3>
                <div className="bg-white/5 rounded-xl border border-white/10 divide-y divide-white/10">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-3">
                      <span className="text-[#EEEEEE]/60 text-sm">{t('spec.' + key)}</span>
                      <span className="text-[#EEEEEE] text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-[#EEEEEE] mb-8">
              {t("youMightAlsoLike")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="block group"
                >
                  <div className="relative aspect-square mb-3">
                    <InteractiveTiltCard
                      image={{ src: related.image, alt: related.name }}
                      glareIntensity={0.3}
                      hoverScale={1.02}
                      borderRadius={12}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#EEEEEE] group-hover:text-[#FFBF00] transition-colors">
                    {localize(related.nameKey, related.name)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-[#FFBF00]">
                      ${related.price.toFixed(2)}
                    </p>
                    {related.originalPrice && (
                      <p className="text-sm text-[#EEEEEE]/40 line-through">
                        ${related.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
