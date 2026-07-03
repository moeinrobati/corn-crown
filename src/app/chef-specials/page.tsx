"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ChefHat,
  ArrowRight,
  ArrowLeft,
  Leaf,
  Star,
  Heart,
  Sparkles,
  Quote,
} from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ChefSpecialsPage() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ingredients = [
    { nameKey: "chef.ing.popcorn.name", descKey: "chef.ing.popcorn.desc" },
    { nameKey: "chef.ing.butter.name", descKey: "chef.ing.butter.desc" },
    { nameKey: "chef.ing.truffleOil.name", descKey: "chef.ing.truffleOil.desc" },
    { nameKey: "chef.ing.parmesan.name", descKey: "chef.ing.parmesan.desc" },
    { nameKey: "chef.ing.salt.name", descKey: "chef.ing.salt.desc" },
    { nameKey: "chef.ing.thyme.name", descKey: "chef.ing.thyme.desc" },
  ];

  const steps = [
    { num: "01", titleKey: "chef.step.pop.title", descKey: "chef.step.pop.desc" },
    { num: "02", titleKey: "chef.step.butter.title", descKey: "chef.step.butter.desc" },
    { num: "03", titleKey: "chef.step.season.title", descKey: "chef.step.season.desc" },
    { num: "04", titleKey: "chef.step.finish.title", descKey: "chef.step.finish.desc" },
    { num: "05", titleKey: "chef.step.enjoy.title", descKey: "chef.step.enjoy.desc" },
  ];

  const quoteParts = t("chef.quote").split(/<hl>|<\/hl>/);
  const quoteHighlight = t("chef.quoteHighlight");

  return (
    <div className="min-h-screen text-[#F5F0E8] relative">
      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/bg-chef.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/70" />
      </div>

      <div className="relative z-10">
      {/* ────────────────── NAV ────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/recipes"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#F4C430] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("chef.backToRecipes")}
          </a>
          <span
            className="text-sm tracking-[0.4em] uppercase text-[#F4C430]/70 font-bold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Corn Crown
          </span>
        </div>
      </nav>

      {/* ────────────────── HERO ────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-12 pb-12 md:pt-20 md:pb-20 overflow-hidden"
      >
        {/* Deep green radial glow — right side */}
        <div className="absolute right-[-10%] top-[10%] w-[700px] h-[700px] rounded-full bg-[#1a5c2e]/20 blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh]">
            {/* ── Left: Text ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-6 lg:space-y-8"
            >
              {/* Badge */}
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#F4C430]/30 bg-[#F4C430]/[0.06] text-[#F4C430] text-[11px] tracking-[0.25em] uppercase font-semibold">
                  <ChefHat className="w-3.5 h-3.5" />
                  {t("chef.special")}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.08]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                <span className="text-[#F5F0E8] block">{t("chef.blackTruffle")}</span>
                <span className="bg-gradient-to-r from-[#E8A317] via-[#F4C430] to-[#E8A317] bg-clip-text text-transparent block">
                  {t("chef.parmesanPopcorn")}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="text-[11px] tracking-[0.4em] uppercase text-white/35 font-medium"
              >
                {t("chef.tagline")}
              </motion.p>

              {/* Gold divider */}
              <motion.div
                variants={fadeUp}
                className="h-[2px] w-24 rounded-full bg-gradient-to-r from-[#E8A317] to-[#F4C430]"
              />

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-base lg:text-lg text-white/55 leading-relaxed max-w-lg"
              >
                {t("chef.heroDesc")}
              </motion.p>

              {/* Feature icons row */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-4 gap-3 pt-2"
              >
                {[
                  { Icon: Leaf, label: t("chef.premiumIngredients") },
                  { Icon: ChefHat, label: t("chef.chefCrafted") },
                  { Icon: Sparkles, label: t("chef.nonGmoCorn") },
                  { Icon: Heart, label: t("chef.madeWithLove") },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                      <f.Icon className="w-[18px] h-[18px] text-[#F4C430]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-white/35 text-center leading-tight whitespace-pre-line">
                      {f.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA + Tagline */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2"
              >
                <motion.button
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 40px rgba(244,196,48,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#E8A317] to-[#F4C430] text-black font-bold text-sm tracking-wide shadow-lg shadow-[#F4C430]/10"
                >
                  {t("chef.orderNow")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <div className="flex flex-col gap-1">
                  <span
                    className="text-[#F4C430] text-xl leading-none"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                    }}
                  >
                    {t("chef.pureFlavor")}
                  </span>
                  <span className="h-[2px] w-28 bg-gradient-to-r from-[#F4C430]/50 to-transparent rounded-full" />
                </div>
              </motion.div>
            </motion.div>

            {/* ── Right: Hero Bowl ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative flex justify-center items-center"
            >
              <img
                src="/images/chef-specials/hero-bowl.png"
                alt={t("recipe.blackTruffleParmesan")}
                className="w-full max-w-4xl object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────── INGREDIENTS + RECIPE ────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ── Ingredients Card ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 md:p-8"
            >
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2 mb-1"
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-emerald-400 font-bold">
                  {t("chef.ingredientsTitle")}
                </span>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="h-px bg-white/10 mb-6"
              />
              <div className="space-y-0">
                {ingredients.map((ing) => (
                  <motion.div
                    key={ing.nameKey}
                    variants={fadeUp}
                    className="flex items-center gap-4 py-4 border-b border-white/[0.04] last:border-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#F5F0E8]">
                        {t(ing.nameKey)}
                      </p>
                      <p className="text-xs text-white/40">{t(ing.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Recipe Card ── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="bg-[#0f0f0f] border border-white/[0.06] rounded-2xl relative overflow-hidden"
            >
              {/* Gold sparkle dots */}
              <div className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full bg-[#F4C430]/25" />
              <div className="absolute top-10 right-16 w-1 h-1 rounded-full bg-[#F4C430]/15" />
              <div className="absolute bottom-20 right-10 w-2 h-2 rounded-full bg-[#F4C430]/20" />

              <div className="p-8 md:p-10">
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-2 mb-1"
                >
                  <ChefHat className="w-4 h-4 text-[#F4C430]" />
                  <span className="text-[11px] tracking-[0.3em] uppercase text-[#F4C430] font-bold">
                    {t("chef.theRecipe")}
                  </span>
                </motion.div>
                <motion.div
                  variants={fadeUp}
                  className="h-px bg-white/10 mb-6"
                />

                <div className="flex gap-6">
                  {/* Steps list */}
                  <div className="flex-1 space-y-8">
                    {steps.map((step) => (
                      <motion.div
                        key={step.num}
                        variants={fadeUp}
                        className="flex gap-5"
                      >
                        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-emerald-900/50 border border-emerald-700/30 flex items-center justify-center">
                          <span className="text-xs font-bold text-emerald-300">
                            {step.num}
                          </span>
                        </div>
                        <div className="pt-1">
                          <p className="text-sm font-bold tracking-[0.15em] uppercase text-[#F5F0E8] mb-2">
                            {t(step.titleKey)}
                          </p>
                          <p className="text-sm text-white/55 leading-[1.8]">
                            {t(step.descKey)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────── CLOSING QUOTE BANNER ────────────────── */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#1a5c2e] to-[#0d2818] rounded-3xl overflow-hidden"
          >
            {/* Faint leaf/corn watermark */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-[0.04] pointer-events-none">
              <svg
                viewBox="0 0 300 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M80 50 Q120 200 80 350"
                  stroke="white"
                  strokeWidth="40"
                  fill="none"
                  opacity="0.5"
                />
                <path
                  d="M130 30 Q170 200 130 370"
                  stroke="white"
                  strokeWidth="30"
                  fill="none"
                  opacity="0.3"
                />
                <path
                  d="M180 60 Q210 200 180 340"
                  stroke="white"
                  strokeWidth="25"
                  fill="none"
                  opacity="0.2"
                />
              </svg>
            </div>

            <div className="relative px-8 py-14 md:px-14 md:py-20">
              <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                {/* Quote */}
                <div className="flex-1 text-center lg:text-left">
                  <Quote className="w-8 h-8 text-[#F4C430]/30 mb-5 mx-auto lg:mx-0" />
                  <blockquote
                    className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold leading-snug text-white/90 mb-5"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                    }}
                  >
                    {quoteParts[0]}
                    <span className="text-[#F4C430]">{quoteHighlight}</span>
                    {quoteParts[1]}
                  </blockquote>
                  <span
                    className="text-[#F4C430] text-xl inline-block"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontStyle: "italic",
                    }}
                  >
                    {t("chef.ourChef")}
                  </span>
                </div>

                {/* Quality Stamp */}
                <motion.div
                  initial={{ rotate: -15, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
                  className="flex-shrink-0"
                >
                  <div className="relative w-44 h-44 md:w-52 md:h-52">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#F4C430]/30" />
                    <div className="absolute inset-[6px] rounded-full border border-[#F4C430]/15" />
                    {/* Inner content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className="text-4xl md:text-5xl font-bold text-[#F4C430] leading-none"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        100%
                      </span>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#F4C430]/60 mt-2 font-semibold">
                        {t("chef.premiumQuality")}
                      </span>
                      <div className="flex items-center gap-1 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 text-[#F4C430]/50 fill-[#F4C430]/50"
                          />
                        ))}
                      </div>
                      <span className="text-[8px] tracking-[0.15em] uppercase text-white/25 mt-2">
                        {t("chef.satisfactionGuaranteed")}
                      </span>
                    </div>
                    {/* SVG ring text */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 220 220"
                    >
                      <defs>
                        <path
                          id="stamp-circle"
                          d="M 110, 110 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                          fill="none"
                        />
                      </defs>
                      <text
                        fill="rgba(244,196,48,0.25)"
                        fontSize="9"
                        letterSpacing="4"
                        fontWeight="600"
                      >
                        <textPath href="#stamp-circle">
                          {`${t("chef.premiumQuality").toUpperCase()} ★ ${t("chef.satisfactionGuaranteed").toUpperCase()} ★ ${t("chef.premiumQuality").toUpperCase()} ★`}
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
      </div>
    </div>
  );
}
