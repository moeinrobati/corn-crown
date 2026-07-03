"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import ShapeLandingHero from "@/components/ui/shape-landing-hero";

export default function ContactPageClient() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: t("visitOurFarmTitle"),
      lines: ["1234 Harvest Lane", "Cornfield, IA 50000"],
    },
    {
      icon: Phone,
      title: t("callUs"),
      lines: ["(555) 123-4567", "Mon-Fri 8am-6pm"],
    },
    {
      icon: Mail,
      title: t("emailUs"),
      lines: ["hello@corncrown.com", "wholesale@corncrown.com"],
    },
    {
      icon: Clock,
      title: t("farmStoreHours"),
      lines: ["Mon-Sat: 8am - 7pm", "Sun: 10am - 5pm"],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black">
      <ShapeLandingHero
        title1={t("getInTouch")}
        title2={t("touch")}
        subtitle={t("contactDesc")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#111111] rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-[#EEEEEE] mb-6">
                {t("sendMessage")}
              </h2>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-[#467235]/20 border border-[#467235] rounded-xl text-[#467235]">
                  {t("thankYouMessage")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#EEEEEE] mb-2">
                      {t("name")}
                    </label>
                    <Input
                      type="text"
                      placeholder={t("yourName")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-black/50 border-white/20 text-[#EEEEEE] placeholder:text-[#EEEEEE]/40 focus:border-[#FFBF00] focus:ring-[#FFBF00]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#EEEEEE] mb-2">
                      {t("email")}
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-black/50 border-white/20 text-[#EEEEEE] placeholder:text-[#EEEEEE]/40 focus:border-[#FFBF00] focus:ring-[#FFBF00]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] mb-2">
                    {t("subject")}
                  </label>
                  <Input
                    type="text"
                    placeholder={t("whatIsThisAbout")}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="bg-black/50 border-white/20 text-[#EEEEEE] placeholder:text-[#EEEEEE]/40 focus:border-[#FFBF00] focus:ring-[#FFBF00]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#EEEEEE] mb-2">
                    {t("message")}
                  </label>
                  <Textarea
                    placeholder={t("tellUsWhatYouNeed")}
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-black/50 border-white/20 text-[#EEEEEE] placeholder:text-[#EEEEEE]/40 focus:border-[#FFBF00] focus:ring-[#FFBF00]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFBF00] text-black font-semibold rounded-full hover:bg-[#FFBF00]/90 transition-colors"
                >
                  {t("sendMessage")}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-[#111111] rounded-2xl p-6 border border-white/10 hover:border-[#FFBF00]/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#467235]/20 rounded-xl">
                    <info.icon className="w-6 h-6 text-[#467235]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#EEEEEE] mb-1">
                      {info.title}
                    </h3>
                    {info.lines.map((line) => (
                      <p key={line} className="text-[#EEEEEE]/60">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <div className="w-full h-full flex items-center justify-center bg-[#222222]">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#467235] mx-auto mb-2" />
                  <p className="text-[#EEEEEE]/60">Interactive Map</p>
                  <p className="text-sm text-[#EEEEEE]/40">
                    1234 Harvest Lane, Cornfield, IA
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
