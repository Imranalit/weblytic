import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomQuoteClient from "./CustomQuoteClient";

export const metadata: Metadata = {
  title: "Build a Custom Quote — Weblytic",
  description:
    "Mix packages, stack add-on features, and tell us your timeline. We respond with a scoped quote within 24 hours.",
  alternates: { canonical: "https://weblytic.cc/custom-quote" },
  openGraph: {
    title: "Build a Custom Quote | Weblytic",
    description: "Mix packages and features to scope your project.",
    url: "https://weblytic.cc/custom-quote",
  },
};

export default function CustomQuotePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-20">
        <CustomQuoteClient />
      </main>
      <Footer />
    </div>
  );
}
