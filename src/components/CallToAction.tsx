import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import React from "react";
import Title from "./ui/Title";
import CustomImage from "./CustomImage";
import { images } from "@/data";

const CallToAction = () => {
  return (
    <section id="call-to-action" className="w-full mx-auto">
      <div className="section-container py-10">
        <div className="bg-primary-gray/10 p-5 md:p-10 rounded-lg md:rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-10">
          <div className="space-y-6">
            <div className="bg-primary-yellow inline-flex items-center justify-center p-3 rounded-full overflow-hidden">
              <BuildingLibraryIcon className="w-8 h-8 text-black" />
            </div>
            <Title
              title="Insant Transfer anywhere around the world"
              customClass="text-[25px] leading-[25px] md:text-[30px] lg:text-[40px]"
            />

            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-primary-gray font-normal">
              Experience seamless global transactions with our tbDEX-powered
              wallet. We connect you to optimal liquidity providers, ensuring
              swift and secure cross-border transfers. Embrace financial freedom
              at your fingertips.
            </p>
          </div>
          <div className="w-full h-full">
            <CustomImage
              src={images.map}
              alt="map img"
              width={1000}
              height={1000}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
