"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";
import VideoHero from "@/components/ui/scroll-expansion-hero";
import { useLanguage } from "@/lib/i18n";

const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return { matches, mounted };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

function MobileHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFBF00]/[0.06] via-transparent to-[#467235]/[0.06]" />

      {/* Image - top right, decorative */}
      <div className="absolute top-0 end-0 w-[65%] h-[60%]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-transparent z-10 h-24" />
        <div className="absolute inset-0 bg-gradient-to-s from-[#030303] via-transparent to-transparent z-10 w-32" />
        <img
          src="/images/truffle-popcorn-hero.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#030303]/50 to-[#030303] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/30 z-10" />
      </div>

      {/* Floating gold accent shape */}
      <div className="absolute top-[15%] end-[8%] w-20 h-20 rounded-full bg-[#FFBF00]/10 blur-2xl" />
      <div className="absolute bottom-[25%] start-[5%] w-28 h-28 rounded-full bg-[#467235]/10 blur-3xl" />

      {/* Content */}
      <div className="relative z-20 w-full px-6 pt-24 pb-16">
        <div className="max-w-md">
          {MotionDiv && (
            <>
              <MotionDiv
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFBF00]/10 border border-[#FFBF00]/20 mb-5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFBF00] animate-pulse" />
                <span className="text-xs font-medium text-[#FFBF00] tracking-wide uppercase">
                  {t("premiumCorn")}
                </span>
              </MotionDiv>

              <MotionDiv
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <h1 className="text-4xl font-bold text-[#EEEEEE] leading-tight mb-3 tracking-tight">
                  {t("heroTitle")}
                </h1>
                <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFBF00] to-[#FFD700] mb-4">
                  {t("heroSubtitle")}
                </p>
              </MotionDiv>

              <MotionDiv
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
              >
                <p className="text-sm text-[#EEEEEE]/50 leading-relaxed mb-8 max-w-sm">
                  {t("heroDesc")}
                </p>
              </MotionDiv>

              <MotionDiv
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/products"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-[#FFBF00] text-black font-semibold rounded-xl text-sm hover:bg-[#FFD700] transition-all duration-300 active:scale-[0.97]"
                >
                  {t("shopNow")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>

                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/[0.06] backdrop-blur-sm text-[#EEEEEE]/80 font-medium rounded-xl text-sm border border-white/[0.08] hover:bg-white/[0.1] hover:text-[#EEEEEE] transition-all duration-300 active:scale-[0.97]"
                >
                  {t("ourStory")}
                </Link>
              </MotionDiv>
            </>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center z-20">
        <ChevronDown className="w-5 h-5 text-[#FFBF00]/40 animate-bounce" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none" />
    </section>
  );
}

export default function HeroSection() {
  const { matches: isMobile, mounted } = useMediaQuery("(max-width: 1023px)");

  if (!mounted) return null;

  return isMobile ? (
    <MobileHero />
  ) : (
    <VideoHero videoSrc="/videos/hero-video.mp4" />
  );
}
