"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RecipeCard from "./recipe-card";
import Emoji from "@/components/ui/emoji";
import type { RecipeCategory } from "@/lib/recipes-data";
import { useLanguage } from "@/lib/i18n";

export default function RecipeCategorySection({ category, index }: { category: RecipeCategory; index: number }) {
  const { t, localize } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <Emoji size={32}>{category.emoji}</Emoji>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#EEEEEE]">{localize(category.nameKey, category.name)}</h2>
            <p className="text-sm text-[#EEEEEE]/40 mt-1">{category.recipes.length} {t('recipe.recipes')}</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex items-center gap-2 text-sm text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors group"
        >
          {t('recipe.viewAll')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {category.recipes.map((recipe, i) => (
          <RecipeCard key={recipe.id} recipe={recipe} index={i + index * 5} />
        ))}
      </div>
    </motion.section>
  );
}
