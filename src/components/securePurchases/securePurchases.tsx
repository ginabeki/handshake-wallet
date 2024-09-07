import React from "react";
import Title from "../ui/Title";
import { images } from "@/data";
import CustomImage from "../CustomImage";
import { Button } from "../ui/button";
import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const SecurePurchases = () => {
  const steps = [
    {
      id: 1,
      icon: BanknotesIcon,
      description: "Buyer commits funds, securely held by handshake wallet",
    },
    {
      id: 2,
      icon: ClockIcon,
      description:
        "We ship the item after the seller drops it to the nearest pick up store",
    },
    {
      id: 3,
      icon: CheckCircleIcon,
      description: "Buyer receives and confirms",
    },
    { id: 4, icon: TruckIcon, description: "We facilitate delivery tracking" },
    {
      id: 5,
      icon: WalletIcon,
      description: "Funds released to the seller via our wallet",
    },
  ];
  return (
    <section className="w-full mx-auto">
      <div className="section-container py-10">
        <div className="rounded-2xl bg-[#edfdf3] px-5 py-10 md:py-20 space-y-10 lg:space-y-20 flex flex-col items-center justify-center">
          <div className="space-y-3">
            <Title title="Secure purchase process" customClass="text-center" />
            <p className="text-black/60 text-center">
              Your peace of mind, guaranteed
            </p>
          </div>
          <div className="flex flex-wrap items-center md:items-stretch justify-center gap-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className="w-full md:w-[300px] lg:w-1/3 bg-[#ffff] p-4 rounded-xl items-center flex gap-4"
              >
                <div className="bg-primary-yellow rounded-full overflow-hidden flex items-center justify-center p-2">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6  text-black" />
                </div>
                <p className="w-2/3 text-[12px] md:text-[14px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <Button asChild variant="default" className="mx-auto text-center">
            <Link href={"/marketplace"}> Start Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SecurePurchases;
