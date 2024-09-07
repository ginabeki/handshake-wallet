import React from "react";
import Title from "./ui/Title";
import { ArrowPathRoundedSquareIcon, CurrencyDollarIcon, ShieldCheckIcon, WalletIcon } from "@heroicons/react/24/outline";

const Features = () => {
  const features = [
    {
      title: "Fast Cross-Border Transfers",
      description: "Connect with liquidity providers for optimal rates",
      icon: WalletIcon,
    },
    {
      title: "Secure Local Marketplace",
      description: "Buy and sell with confidence using our trust-based system",
      icon: ShieldCheckIcon,
    },
    {
      title: "Multi-Currency Support",
      description: "Transact in your preferred currency",
      icon: CurrencyDollarIcon,
    },
    {
      title: "User-Controlled Data",
      description: "Maintain privacy with decentralized identity management",
      icon: ArrowPathRoundedSquareIcon,
    },
  ];
  return (
    <section id="features" className="w-full mx-auto">
      <div className="section-container space-y-20 py-10">
        <Title
          title="Feel the best experience with our features"
          customClass="max-w-[680px] text-center mx-auto"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch justify-center gap-5 md:gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-between space-y-3 bg-primary-gray/10 p-4 rounded-lg overflow-hidden hover:bg-primary-gray/30 transition-all duration-200 ease-linear"
            >
              <div className="bg-primary-yellow flex items-center justify-center rounded-full overflow-hidden p-2">
                <item.icon className="w-5 h-5 text-black" />
              </div>
              <h3 className="text-[20px] font-medium">{item.title}</h3>
              <p className="text-[16px] text-primary-gray/90">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
