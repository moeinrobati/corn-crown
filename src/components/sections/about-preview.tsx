"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { EtherealShadow } from "@/components/ui/ethereal-shadow";

export default function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ethereal Shadow Background */}
      <div className="absolute inset-0 z-0">
        <EtherealShadow
          color="rgba(70, 114, 53, 0.4)"
          animation={{ scale: 60, speed: 40 }}
          noise={{ opacity: 0.5, scale: 1 }}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src="/images/products/grilling-corn.jpg"
              alt="Corn field at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <span className="text-sm font-semibold text-[#FFBF00] uppercase tracking-wider">
              {t("ourHeritage")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t("fromFieldTo")}{" "}
              <span className="text-[#FFBF00]">{t("familyTable")}</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {t("aboutDesc1")}
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              {t("aboutDesc2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#FFBF00] text-black font-semibold rounded-full hover:bg-[#FFBF00]/90 transition-colors"
              >
                {t("discoverOurStory")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                {t("visitOurFarm")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
