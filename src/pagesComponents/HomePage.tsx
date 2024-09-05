import { Hero, Title } from "@/components";
import Features from "@/components/Features";
import React from "react";

const HomePage = () => {
  return (
    <main className="w-full mx-auto">
      <Hero />
      <Features />
    </main>
  );
};

export default HomePage;
