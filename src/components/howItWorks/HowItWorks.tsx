import React from "react";
import Title from "../ui/Title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";

const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Create wallet",
      description: "Create your wallet and verify your identity",
    },
    {
      title: "Send, exchange & shop",
      description: "Send money globally or shop in the marketplace",
    },
    {
      title: "Connect with providers",
      description: "Connect with liquidity providers for transfers",
    },
    {
      title: "Funds held securely",
      description:
        "For marketplace purchases, funds are held securely until delivery",
    },
    {
      title: "Confirmation",
      description: "Complete your transfer or confirm receipt of goods",
    },
  ];

  const questions = [
    {
      question:
        "What services and transactions can be performed through internet banking?",
      answer:
        "What services and transactions can be performed through internet banking?",
    },
    {
      question:
        "What services and transactions can be performed through internet banking?",
      answer:
        "What services and transactions can be performed through internet banking?",
    },
    {
      question:
        "What services and transactions can be performed through internet banking?",
      answer:
        "What services and transactions can be performed through internet banking?",
    },
    {
      question:
        "What services and transactions can be performed through internet banking?",
      answer:
        "What services and transactions can be performed through internet banking?",
    },
    {
      question:
        "What services and transactions can be performed through internet banking?",
      answer:
        "What services and transactions can be performed through internet banking?",
    },
  ];
  return (
    <section>
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 items-start justify-center gap-5">
        {/* First column */}
        <div className="space-y-5 lg:px-5">
          <div className="space-y-2">
            <Title title="How It Works" />
            <p className="text-black/60 text-[16px]">
              Handshake wallet facilitates financial management online through a
              secure and efficient process.
            </p>
          </div>
          <div className="space-y-4">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-row gap-6 border-b border-b-primary-green/20 py-2 md:py-4"
              >
                <div className="text-primary-green flex items-center justify-center w-[40px] h-[40px] md:h-[50px] md:w-[50px] font-medium border border-primary-green/20 rounded-full text-[14px]  md:text-[20px]">
                  {index + 1}
                </div>
                <div className="w-3/4">
                  <h3 className="font-semibold text-[18px] md:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="text-black/50 text-[12px] md:text-[15px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Second column - Accordion */}
        <div className="bg-[#EDF2F780] rounded-2xl text-black p-6 space-y-8">
          <p className="text-[16px]">
            Some of the clients&apos; questions are answered below. If you have
            any. If you have any other questions, please contact us.
          </p>
          <Accordion type="single" collapsible className="space-y-5">
            {questions.map((question, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="bg-[#E3EAF1] rounded-2xl overflow-hidden px-2 md:px-5 text-start"
              >
                <AccordionTrigger className="text-start text-[16px]">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/60 text-[14px]">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex flex-col md:flex-row gap-6 mt-10">
            <p>Still don&apos;t understand Handshake wallet?</p>
            <Button asChild>
              <Link href="/contact">Contact Us </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
