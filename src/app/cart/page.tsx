"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/i18n";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/tilt-card";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } =
    useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center"
            >
              <ShoppingBag className="w-12 h-12 text-[#EEEEEE]/30" />
            </motion.div>
            <h1 className="text-3xl font-bold text-[#EEEEEE] mb-4">
              Your cart is empty
            </h1>
            <p className="text-[#EEEEEE]/60 mb-8">
              Looks like you haven&apos;t added any products yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#FFBF00] text-black font-semibold rounded-full hover:bg-[#FFBF00]/90 transition-colors"
            >
              {t("shopNow")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#EEEEEE]">
              Shopping Cart
            </h1>
            <p className="text-[#EEEEEE]/60 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#111111] rounded-2xl p-4 md:p-6 border border-white/10"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.id}`}
                      className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-[#467235] font-medium">
                            {item.category}
                          </p>
                          <Link
                            href={`/products/${item.id}`}
                            className="text-lg font-bold text-[#EEEEEE] hover:text-[#FFBF00] transition-colors"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-[#EEEEEE]/40 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-[#EEEEEE] hover:border-[#FFBF00] hover:text-[#FFBF00] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-[#EEEEEE] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-[#EEEEEE] hover:border-[#FFBF00] hover:text-[#FFBF00] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <p className="text-xl font-bold text-[#FFBF00]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Clear Cart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-end"
            >
              <button
                onClick={clearCart}
                className="text-sm text-[#EEEEEE]/40 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-[#111111] rounded-2xl p-6 border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold text-[#EEEEEE] mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#EEEEEE]/60">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#EEEEEE]/60">
                  <span>Shipping</span>
                  <span className="text-[#467235]">Free</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-[#EEEEEE] font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#FFBF00]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full h-12 bg-[#FFBF00] text-black font-semibold rounded-xl hover:bg-[#FFBF00]/90 transition-colors flex items-center justify-center gap-2">
                Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-xs text-[#EEEEEE]/40 text-center mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
