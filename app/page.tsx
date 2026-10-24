"use client";

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
