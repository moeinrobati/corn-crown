"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChefHat, Utensils } from "lucide-react";
import Emoji from "@/components/ui/emoji";
import { useLanguage } from "@/lib/i18n";

const floatingItems = [
  { emoji: "\ud83c\udf3d", x: "10%", y: "20%", delay: 0, duration: 6 },
  { emoji: "\ud83c\udf7f", x: "85%", y: "15%", delay: 1, duration: 7 },
  { emoji: "\ud83c\udf2e", x: "75%", y: "70%", delay: 2, duration: 5 },
  { emoji: "\ud83e\udd57", x: "15%", y: "75%", delay: 0.5, duration: 8 },
  { emoji: "\ud83c\udf55", x: "90%", y: "45%", delay: 1.5, duration: 6 },
  { emoji: "\ud83c\udf70", x: "5%", y: "50%", delay: 2.5, duration: 7 },
  { emoji: "\ud83c\udf5e", x: "50%", y: "85%", delay: 0.8, duration: 6 },
  { emoji: "\ud83e\uddc3", x: "60%", y: "10%", delay: 1.8, duration: 5 },
];

export default function RecipeHero() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(255,191,0,0.08) 0%, transparent 50%)",
              "radial-gradient(ellipse at 80% 50%, rgba(255,191,0,0.08) 0%, transparent 50%)",
              "radial-gradient(ellipse at 50% 20%, rgba(255,191,0,0.08) 0%, transparent 50%)",
              "radial-gradient(ellipse at 20% 50%, rgba(255,191,0,0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating food emojis */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl select-none pointer-events-none"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            delay: item.delay,
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Emoji size={44}>{item.emoji}</Emoji>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto" style={{ y, opacity, scale }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#EEEEEE] mb-6 tracking-tight"
        >
          {t('recipe.theArtOf')}
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] via-[#FFD700] to-[#FFBF00]">
              {t('recipe.corn')}
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFBF00] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>{" "}
          {t('recipe.cuisine')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#EEEEEE]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t('recipe.heroDesc')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#recipes"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#FFBF00] text-black font-semibold rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              {t('recipe.exploreRecipes')}
            </span>
          </motion.a>

          <motion.a
            href="/chef-specials"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-[#EEEEEE] font-medium rounded-full hover:border-[#FFBF00]/30 hover:text-[#FFBF00] transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChefHat className="w-5 h-5" />
            {t('recipe.chefSpecials')}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 md:gap-12"
        >
          {[
            { value: "50+", label: t('recipe.recipes') },
            { value: "9", label: t('recipe.categories') },
            { value: "4.8", label: t('recipe.avgRating') },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#FFBF00]">{stat.value}</div>
              <div className="text-xs text-[#EEEEEE]/40 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[#FFBF00]"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
