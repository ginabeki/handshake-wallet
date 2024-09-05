import { CallToAction, Features, Hero } from "@/components";

import React from "react";

const HomePage = () => {
  return (
    <main className="w-full mx-auto">
      <Hero />
      <Features />
      <CallToAction />
    </main>
  );
};

export default HomePage;
