import { Metadata } from "next";
import AboutPageClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Corn Crown",
  description:
    "Learn about Corn Crown's heritage, our commitment to quality, and three generations of farming expertise.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
