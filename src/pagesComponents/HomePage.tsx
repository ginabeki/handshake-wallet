import { CallToAction, ExploreMarketPlace, Features, Hero } from "@/components";

import React from "react";

const HomePage = () => {
  return (
    <main className="w-full h-auto">
      <Hero />
      <Features />
      <CallToAction />
      <ExploreMarketPlace />
    </main>
  );
};

export default HomePage;
