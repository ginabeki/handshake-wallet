import HowItWorks from "@/components/howItWorks/HowItWorks";
import { CallToAction, ExploreMarketPlace, Features, Hero } from "@/components";

import React from "react";
import SecurePurchases from "@/components/securePurchases/securePurchases";
import Reviews from "@/components/reviews/reviews";
const HomePage = () => {
  return (
    <main className="w-full mx-auto">
      <Hero />
      <Features />
      <CallToAction />
      <ExploreMarketPlace />
      <HowItWorks />
      <SecurePurchases />
      <Reviews />
    </main>
  );
};

export default HomePage;
