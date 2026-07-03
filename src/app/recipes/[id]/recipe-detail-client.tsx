"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Flame,
  Star,
  Users,
  ChefHat,
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  Zap,
  Timer,
  Heart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/lib/recipes-data";
import { useLanguage } from "@/lib/i18n";

const difficultyColors = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

interface Props {
  recipe: Recipe;
  relatedRecipes: Recipe[];
}

export default function RecipeDetailClient({ recipe, relatedRecipes }: Props) {
  const { t, localize } = useLanguage();
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-[#EEEEEE]/60 hover:text-[#FFBF00] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('recipe.backToRecipes')}
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-12"
        >
          <div className="relative aspect-[21/9] md:aspect-[3/1]">
            <img
              src={recipe.image}
              alt={localize(recipe.titleKey, recipe.title)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6 md:p-10">
              <div className="w-full">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="bg-white/10 backdrop-blur-md text-white/90 border border-white/10 text-xs">
                    {localize(recipe.categoryKey, recipe.category)}
                  </Badge>
                  {recipe.isNew && (
                    <Badge className="bg-[#FFBF00] text-black text-xs font-semibold">
                      <Zap className="w-3 h-3 mr-1" /> {t('recipe.new')}
                    </Badge>
                  )}
                  {recipe.isVegetarian && (
                    <Badge className="bg-emerald-500/90 text-white text-xs">
                      <Leaf className="w-3 h-3 mr-1" /> {t('recipe.vegetarian')}
                    </Badge>
                  )}
                  {recipe.isChefSpecial && (
                    <Badge className="bg-[#467235] text-white text-xs">
                      <ChefHat className="w-3 h-3 mr-1" /> {t('recipe.chefSpecial')}
                    </Badge>
                  )}
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColors[recipe.difficulty]}`}
                  >
                    {t('diff.' + recipe.difficulty)}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                  {localize(recipe.titleKey, recipe.title)}
                </h1>
                <p className="text-lg text-white/70 max-w-3xl mb-4">
                  {localize(recipe.descKey, recipe.description)}
                </p>
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Clock className="w-4 h-4 text-[#FFBF00]" />
                    <span className="text-sm">{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Timer className="w-4 h-4 text-[#FFBF00]" />
                    <span className="text-sm">{t('recipe.prep')}: {recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Users className="w-4 h-4 text-[#FFBF00]" />
                    <span className="text-sm">{recipe.servings} {t('recipe.servings')}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80">
                    <Flame className="w-4 h-4 text-[#FFBF00]" />
                    <span className="text-sm">{recipe.calories} {t('recipe.cal')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(recipe.rating)
                              ? "fill-[#FFBF00] text-[#FFBF00]"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/60 font-medium">
                      {recipe.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Favorite button */}
          <motion.button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite ? "fill-rose-500 text-rose-500" : "text-white/70"
              }`}
            />
          </motion.button>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients & Nutrition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Ingredients Card */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#FFBF00]" />
                {t('recipe.ingredients')}
              </h2>
              <Separator className="bg-white/10 mb-4" />
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                    className="flex items-start gap-3 cursor-pointer group"
                    onClick={() => toggleIngredient(i)}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        checkedIngredients.includes(i)
                          ? "bg-[#FFBF00] border-[#FFBF00]"
                          : "border-white/20 group-hover:border-[#FFBF00]/50"
                      }`}
                    >
                      {checkedIngredients.includes(i) && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <span
                      className={`text-sm transition-all ${
                        checkedIngredients.includes(i)
                          ? "text-[#EEEEEE]/40 line-through"
                          : "text-[#EEEEEE]/80"
                      }`}
                    >
                      {localize(`recipe.${recipe.id}.ing.${i}`, ingredient)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Nutrition Card */}
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FFBF00]" />
                {t('recipe.nutritionPerServing')}
              </h2>
              <Separator className="bg-white/10 mb-4" />
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-[#FFBF00]">
                    {recipe.calories}
                  </p>
                  <p className="text-xs text-[#EEEEEE]/50">{t('recipe.calories')}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-[#467235]">
                    {recipe.nutrition.protein}
                  </p>
                  <p className="text-xs text-[#EEEEEE]/50">{t('recipe.protein')}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-[#EEEEEE]">
                    {recipe.nutrition.carbs}
                  </p>
                  <p className="text-xs text-[#EEEEEE]/50">{t('recipe.carbs')}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-[#EEEEEE]">
                    {recipe.nutrition.fat}
                  </p>
                  <p className="text-xs text-[#EEEEEE]/50">{t('recipe.fat')}</p>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            {recipe.tips.length > 0 && (
              <div className="bg-[#FFBF00]/5 border border-[#FFBF00]/10 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-[#FFBF00] mb-3">
                  {t('recipe.proTips')}
                </h2>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#EEEEEE]/70"
                    >
                      <span className="text-[#FFBF00] mt-0.5">&#9670;</span>
                      {localize(`recipe.${recipe.id}.tip.${i}`, tip)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* Right Column - Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#EEEEEE] mb-2 flex items-center gap-2">
                {t('recipe.instructions')}
              </h2>
              <p className="text-sm text-[#EEEEEE]/40 mb-6">
                {t('recipe.followSteps')}
              </p>
              <Separator className="bg-white/10 mb-8" />
              <ol className="space-y-6">
                {recipe.instructions.map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06 }}
                    className="flex gap-4 cursor-pointer group"
                    onClick={() => toggleStep(i)}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          checkedSteps.includes(i)
                            ? "bg-[#467235] text-white"
                            : "bg-[#FFBF00] text-black"
                        }`}
                      >
                        {checkedSteps.includes(i) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          i + 1
                        )}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p
                        className={`text-[#EEEEEE]/80 leading-relaxed transition-all ${
                          checkedSteps.includes(i)
                            ? "line-through opacity-50"
                            : ""
                        }`}
                      >
                        {localize(`recipe.${recipe.id}.step.${i}`, step)}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-2xl font-bold text-[#EEEEEE] mb-8">
              {`More ${localize(recipe.categoryKey, recipe.category)} Recipes`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedRecipes.map((related, i) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/recipes/${related.id}`}
                    className="block group"
                  >
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <h3 className="text-sm font-bold text-[#EEEEEE] group-hover:text-[#FFBF00] transition-colors">
                      {localize(related.titleKey, related.title)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-[#EEEEEE]/40" />
                      <span className="text-xs text-[#EEEEEE]/40">
                        {related.cookingTime}
                      </span>
                      <span className="text-xs text-[#EEEEEE]/20">|</span>
                      <Flame className="w-3 h-3 text-[#EEEEEE]/40" />
                      <span className="text-xs text-[#EEEEEE]/40">
                        {related.calories} {t('recipe.cal')}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
