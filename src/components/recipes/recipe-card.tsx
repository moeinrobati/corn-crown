"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Clock, Flame, Star, Heart, ArrowRight, Leaf, Zap } from "lucide-react";
import type { Recipe } from "@/lib/recipes-data";
import { useLanguage } from "@/lib/i18n";

const difficultyColors = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Hard: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function RecipeCard({ recipe, index }: { recipe: Recipe; index: number }) {
  const { t, localize } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltValues, setTiltValues] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    setTiltValues({ x: -(y / 50) * 8, y: (x / 50) * 8 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltValues({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/recipes/${recipe.id}`}>
      <motion.div
        ref={cardRef}
        className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden cursor-pointer"
        style={{ perspective: 1000 }}
        animate={{
          rotateX: tiltValues.x,
          rotateY: tiltValues.y,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={recipe.image}
            alt={localize(recipe.titleKey, recipe.title)}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {recipe.isNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FFBF00] text-black"
              >
                <Zap className="w-3 h-3" />
                {t('recipe.new')}
              </motion.span>
            )}
            {recipe.isVegetarian && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/90 text-white">
                <Leaf className="w-3 h-3" />
                {t('recipe.veg')}
              </span>
            )}
          </div>

          {/* Favorite button */}
          <motion.button
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-rose-500 text-rose-500" : "text-white/70"
              }`}
            />
          </motion.button>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 backdrop-blur-md text-white/90 border border-white/10">
              {localize(recipe.categoryKey, recipe.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#EEEEEE] mb-1.5 group-hover:text-[#FFBF00] transition-colors duration-300">
            {localize(recipe.titleKey, recipe.title)}
          </h3>
          <p className="text-sm text-[#EEEEEE]/50 leading-relaxed mb-4 line-clamp-2">
            {localize(recipe.descKey, recipe.description)}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-[#EEEEEE]/60">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{recipe.cookingTime}</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1.5 text-[#EEEEEE]/60">
              <Flame className="w-3.5 h-3.5" />
              <span className="text-xs">{recipe.calories} {t('recipe.cal')}</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColors[recipe.difficulty]}`}>
              {t('diff.' + recipe.difficulty)}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(recipe.rating)
                        ? "fill-[#FFBF00] text-[#FFBF00]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#EEEEEE]/60 font-medium">
                {recipe.rating}
              </span>
            </div>

            <motion.button
              className="flex items-center gap-1.5 text-xs font-medium text-[#FFBF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 3 }}
            >
              {t('recipe.viewRecipe')}
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "0 0 40px rgba(255, 191, 0, 0.08), inset 0 0 40px rgba(255, 191, 0, 0.02)"
              : "0 0 0px rgba(255, 191, 0, 0), inset 0 0 0px rgba(255, 191, 0, 0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
      </Link>
    </motion.div>
  );
}
