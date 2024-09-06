import React from "react";
import Title from "./ui/Title";
import { LockClosedIcon, NumberedListIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import Link from "next/link";

const ExploreMarketPlace = () => {
  const items = [
    {
      title: "Wide range of products from local sellers",
      icon: NumberedListIcon,
    },
    {
      title: "Buyer protection through secure fund holding",
      icon: LockClosedIcon,
    },
  ];
  return (
    <section id="explore-marketplace" className="w-full mx-auto">
      <div className="section-container py-10 space-y-10">
        <Title title="Explore our marketplace" customClass="text-center" />
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 items-stretch justify-between gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-row md:flex-col items-start justify-start gap-3 md:gap-5 p-5 rounded-xl overflow-hidden bg-primary-gray/10 w-full md:min-h-[250px] lg:min-h-[300px]"
            >
              <div className="bg-primary-yellow inline-flex items-center justify-center rounded-full overflow-hidden p-2 md:p-3 w-[50px] h-[50px]">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-black" />
              </div>
              <h3 className="w-2/3 md:w-full text-[16px] md:text-[20px] lg:text-[26px] font-medium">
                {item.title}
              </h3>
            </div>
          ))}
          <div className="relative  rounded-xl overflow-hidden w-full min-h-[150px] md:min-h-[250px] lg:min-h-[300px] bg-[url('/images/hero/hero1.png')] bg-cover bg-black">
            <div className="absolute bg-black/85 inset-0 flex flex-col items-start justify-center md:justify-end gap-3 md:gap-5 p-5">
              <h3 className="w-full text-[16px] md:text-[20px] lg:text-[26px] font-medium text-white">
                Seamless payment settlement using our wallet
              </h3>
              <Link
                href={"/marketplace"}
                className="rounded-full overflow-hidden"
              >
                <Button>View More &rarr;</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreMarketPlace;
