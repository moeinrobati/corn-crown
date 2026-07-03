"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Emoji from "@/components/ui/emoji";

export default function AboutPageClient() {
  const { t } = useLanguage();

  const timeline = [
    { year: "1987", title: t("theBeginning"), description: t("theBeginningDesc") },
    { year: "1995", title: t("growingHeritage"), description: t("growingHeritageDesc") },
    { year: "2005", title: t("organicCertification"), description: t("organicCertificationDesc") },
    { year: "2015", title: t("directToTable"), description: t("directToTableDesc") },
    { year: "2024", title: t("digitalHarvest"), description: t("digitalHarvestDesc") },
  ];

  const values = [
    { icon: "🌾", title: t("qualityFirst"), description: t("qualityDesc") },
    { icon: "🌱", title: t("sustainabilityTitle"), description: t("sustainabilityDesc") },
    { icon: "👨‍🌾", title: t("heritage"), description: t("heritageDesc") },
    { icon: "🤝", title: t("community"), description: t("communityDesc") },
  ] as const;

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="/images/products/grilling-corn.jpg"
          alt="Corn field at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {t("ourStoryTitle")}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {t("storySubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-sm font-semibold text-[#467235] uppercase tracking-wider">
                {t("ourHeritage")}
              </span>
              <h2 className="text-4xl font-bold text-[#EEEEEE]">
                {t("fromSmallFarm")}{" "}
                <span className="text-[#FFBF00]">{t("familyTable")}</span>
              </h2>
              <p className="text-lg text-[#EEEEEE]/70 leading-relaxed">
                {t("farmDesc1")}
              </p>
              <p className="text-lg text-[#EEEEEE]/70 leading-relaxed">
                {t("farmDesc2")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img
                src="/images/products/golden-sweet-corn.jpg"
                alt="Corn Crown farmer"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[#467235] uppercase tracking-wider">
              {t("ourStory")}
            </span>
            <h2 className="mt-2 text-4xl font-bold text-[#EEEEEE]">
              {t("milestones")}
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-[#467235]/30" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16 pb-12 last:pb-0"
              >
                <div className="absolute left-[20px] top-2 w-[18px] h-[18px] rounded-full bg-[#FFBF00] border-4 border-black" />

                <div className="bg-black/50 rounded-xl p-6 border border-white/10">
                  <span className="text-sm font-bold text-[#FFBF00]">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-[#EEEEEE] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-[#EEEEEE]/60 mt-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-[#467235] uppercase tracking-wider">
              {t("about")}
            </span>
            <h2 className="mt-2 text-4xl font-bold text-[#EEEEEE]">
              {t("ourCoreValues")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] rounded-2xl p-8 border border-white/10 hover:border-[#FFBF00]/30 transition-colors"
              >
                <div className="mb-4"><Emoji size={40}>{value.icon}</Emoji></div>
                <h3 className="text-xl font-bold text-[#EEEEEE] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#EEEEEE]/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#467235]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              {t("tasteTheDifference")}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t("tasteDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#FFBF00] text-black font-semibold rounded-full hover:bg-[#FFBF00]/90 transition-colors"
              >
                {t("shopNow")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                {t("contact")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
