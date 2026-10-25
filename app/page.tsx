"use client";

import { useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShutterHero from "@/components/ShutterHero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import TrustedBy from "@/components/TrustedBy";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const targetId = hash.split("?")[0].replace("#", "");
      if (!targetId) return;

      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Re-align scroll position as dynamic layout and GSAP ScrollTrigger pin-spacers mount
    scrollToHash();
    const t1 = setTimeout(scrollToHash, 200);
    const t2 = setTimeout(scrollToHash, 600);
    const t3 = setTimeout(scrollToHash, 1200);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <Cursor />
      <Navbar />
      <main>
        <ShutterHero>
          <Hero />
        </ShutterHero>
        <Services />
        <WhyUs />
        <Process />
        <TrustedBy />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </LazyMotion>
  );
}
