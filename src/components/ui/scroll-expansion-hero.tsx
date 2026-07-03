"use client";

import { useEffect, useRef, ReactNode } from "react";

interface VideoHeroProps {
  videoSrc: string;
  /** Height of the scroll-driving wrapper. Taller = slower/more controlled scrubbing. */
  sectionHeight?: string; // e.g. "400vh"
  children?: ReactNode;
}

export default function VideoHero({
  videoSrc,
  sectionHeight = "400vh",
  children,
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const rafRef = useRef<number>(0);
  // ذخیره آخرین پوزیشن برای اعمال اینرسی و نرم‌تر شدن حرکت (Lerp)
  const currentTargetRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.pause();

    const onMetadata = () => {
      durationRef.current = video.duration;
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", onMetadata);
    // اگر ویدیو قبلاً کَش شده باشد، کامپوننت ممکن است رویداد loadedmetadata را از دست بدهد
    if (video.readyState >= 1) {
      onMetadata();
    }

    const tick = () => {
      if (durationRef.current > 0 && video.readyState >= 2) {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;

        if (scrollable > 0) {
          const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
          const rawTarget = progress * durationRef.current;

          // افکت Lerp (Linear Interpolation) برای نرم کردن حرکت ویدیو در اسکرول‌های سریع
          // فرمول: current = current + (target - current) * easing
          currentTargetRef.current += (rawTarget - currentTargetRef.current) * 0.1;

          // جلوگیری از پرش‌های میکروسکوپی و سنگین کردن پردازش مرورگر
          if (Math.abs(video.currentTime - currentTargetRef.current) > 0.001) {
            video.currentTime = currentTargetRef.current;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      video.removeEventListener("loadedmetadata", onMetadata);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ position: "relative", height: sectionHeight }}
    >
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
          playsInline
          preload="auto"
          controls={false}
        />
      </div>

      {/* تغییر استایل برای قرارگیری محتوا روی ویدیو در زمان اسکرول */}
      <div 
        className="relative z-20 pointer-events-none" 
        style={{ position: "relative", zIndex: 20, pointerEvents: "none" }}
      >
        {children}
      </div>
    </section>
  );
}