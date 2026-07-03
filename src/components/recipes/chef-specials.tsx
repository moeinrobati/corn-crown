"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Crown, Star, ChefHat, ArrowRight } from "lucide-react";
import RecipeCard from "./recipe-card";
import { allRecipes } from "@/lib/recipes-data";
import { useLanguage } from "@/lib/i18n";

export default function ChefSpecials() {
  const { t, localize } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const specials = allRecipes.filter((r) => r.isChefSpecial);

  return (
    <section ref={ref} id="chef-specials" className="mb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFBF00]/10 border border-[#FFBF00]/20 mb-6"
        >
          <Crown className="w-4 h-4 text-[#FFBF00]" />
          <span className="text-sm font-medium text-[#FFBF00]">{t('recipe.chefSpecials')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4"
        >
          {t('recipe.handpickedByChefs')}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] to-[#FFD700]">
            {t('recipe.masterChefs')}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#EEEEEE]/50 max-w-xl mx-auto"
        >
          {t('recipe.chefSpecialsDesc')}
        </motion.p>
      </div>

      {/* Featured Chef Special CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-10"
      >
        <Link href="/chef-specials">
          <div className="group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-[#FFBF00]/10 rounded-2xl p-6 md:p-8 overflow-hidden cursor-pointer hover:border-[#FFBF00]/30 transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#FFBF00]/5 blur-[80px] group-hover:bg-[#FFBF00]/10 transition-all duration-700 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFBF00]/20 bg-[#FFBF00]/5 text-[#FFBF00] text-xs tracking-widest uppercase mb-3">
                  <ChefHat className="w-3 h-3" />
                  {t('recipe.featuredSpecial')}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#EEEEEE] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  {t('recipe.blackTruffleParmesan')}
                </h3>
                <p className="text-sm text-white/40">
                  {t('recipe.blackTruffleDesc')}
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E8A317] to-[#F4C430] text-black font-semibold text-sm"
              >
                {t('recipe.viewSpecial')}
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Specials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {specials.map((recipe, i) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={i} />
        ))}
      </div>
    </section>
  );
}
