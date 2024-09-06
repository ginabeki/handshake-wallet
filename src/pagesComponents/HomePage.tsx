import HowItWorks from "@/components/howItWorks/HowItWorks";
import React from "react";
import SecurePurchases from "@/components/securePurchases/securePurchases";
import Reviews from "@/components/reviews/reviews";
const HomePage = () => {
  return (
    <main className="w-full mx-auto">
      <div className="w-full">
        <HowItWorks />
        <SecurePurchases />
        <Reviews />
      </div>
    </main>
  );
};

export default HomePage;
