// src/app/pages/Home.tsx
import React from "react";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { CardComparison } from "../components/CardComparison";
import { AppShowcase } from "../components/AppShowcase";
import { HowItWorks } from "../components/HowItWorks";
import { Testimonials } from "../components/Testimonials";

export function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <CardComparison />
      <AppShowcase />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}