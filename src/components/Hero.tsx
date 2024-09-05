import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import CustomImage from "./CustomImage";
import { images } from "@/data";

const Hero = () => {
  const users = [
    { name: "user1", src: images.user1 },
    { name: "user2", src: images.user2 },
    { name: "user3", src: images.user3 },
  ];
  return (
    <section id="hero" className="w-full mx-auto">
      <div
        className="section-container py-10 lg:py-20 grid grid-cols-1 md:grid-cols-2 
      lg:grid-cols-3 items-start justify-between gap-10"
      >
        <div className="hidden w-full h-auto md:flex flex-col items-center justify-center">
          <div className="w-full h-full -ml-10">
            <CustomImage
              src={images.hero1}
              alt="hero image"
              width={1000}
              height={1000}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col items-center md:items-start justify-start space-y-6 md:space-y-6">
          <h1 className="w-full mx-auto font-roboto font-semibold text-4xl lg:text-6xl first-letter:uppercase text-center md:text-left">
            Borderless transactions & Secure Purchases
          </h1>
          <p className="w-full text-primary-gray text-[15px] md:text-[17px] lg:text-[19px] text-center md:text-left">
            Send money instantly and shop locally using our platform
          </p>
          <div className="w-full inline-flex items-center justify-center lg:justify-start space-x-4">
            <Link href={"/send-money"}>
              <Button>Send money</Button>
            </Link>
            <Link href={"/marketplace"}>
              <Button variant="outline">
                <span className="hidden sm:block">Explore &nbsp;</span>

                <span>Marketplace</span>
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center md:justify-start space-y-2 max-w-[500px] text-center md:text-left">
            <div className="w-full inline-flex items-center justify-center md:justify-start space-x-5">
              <div className="inline-flex -space-x-3 items-center justify-start">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="w-[30px] md:w-[50px] h-[30px] md:h-[50px] rounded-full overflow-hidden"
                  >
                    <CustomImage
                      src={user.src}
                      alt={`${user.name}`}
                      width={2000}
                      height={2000}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-[20px] md:text-[24px] lg:text-[30px] font-semibold">
                15 Million+
              </div>
            </div>
            <p className="text-primary-gray text-[14px] md:text-[16px] lg:text-[18px]">
              Trusted by million of satidfied users, our financial services have
              made a real impact on people's lives
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
