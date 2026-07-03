import { Metadata } from "next";
import ContactPageClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us | Corn Crown",
  description:
    "Get in touch with Corn Crown. We'd love to hear from you about our products, wholesale inquiries, or farm visits.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
