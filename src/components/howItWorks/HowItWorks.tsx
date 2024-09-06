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
    return (
        <div>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-40 mx-auto section-container">
                {/* First column */}
                <div className="lg:w-1/2">
                    <div>
                        <h3 className="text-[#2A2A2A] text-3xl font-roboto font-semibold mb-4">How It Works</h3>
                        <p className="text-[#4A4A4A] text-base mb-10">
                            Your journey to seamless global transactions
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-6 border-b border-b-[#27BF52] py-2 md:py-5 mb-4">
                            <p className="text-[#27BF52] flex items-center justify-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] font-medium border border-[#27BF52] rounded-full">
                                1
                            </p>
                            <div>
                                <h3 className="font-semibold md:text-xl">Create wallet</h3>
                                <p className="text-[#4A4A4A] text-base font-poppins">
                                    Create your wallet and verify your identity
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-b-[#27BF52] py-2 md:py-5 mb-4">
                            <p className="text-[#27BF52] flex items-center justify-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] font-medium border border-[#27BF52] rounded-full">
                                2
                            </p>
                            <div>
                                <h3 className="font-semibold md:text-xl">Send, exchange & shop</h3>
                                <p className="text-[#4A4A4A] text-base font-poppins">
                                    Send money globally or shop in the marketplace{" "}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-b-[#27BF52] py-2 md:py-5 mb-4">
                            <p className="text-[#27BF52] flex items-center justify-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] font-medium border border-[#27BF52] rounded-full">
                                3
                            </p>
                            <div>
                                <h3 className="font-semibold md:text-xl">
                                    Connect with providers
                                </h3>
                                <p className="text-[#4A4A4A] text-base font-poppins">
                                    Connect with liquidity providers for transfers{" "}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-b-[#27BF52] py-2 md:py-5 mb-4">
                            <p className="text-[#27BF52] flex items-center justify-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] font-medium border border-[#27BF52] rounded-full">
                                4
                            </p>
                            <div>
                                <h3 className="font-semibold md:text-xl">Funds held securely</h3>
                                <p className="text-[#4A4A4A] text-base font-poppins">
                                    For marketplace purchases, funds are held securely until
                                    delivery{" "}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-b-[#27BF52] py-2 md:py-5 mb-4">
                            <p className="text-[#27BF52] flex items-center justify-center w-[30px] h-[30px] md:h-[50px] md:w-[50px] font-medium border border-[#27BF52] rounded-full">
                                5
                            </p>
                            <div>
                                <h3 className="font-semibold md:text-xl">Confirmation</h3>
                                <p className="text-[#4A4A4A] text-base font-poppins">
                                    Complete your transfer or confirm receipt of goods{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second column - Accordion */}
                <div className="bg-[#EDF2F7] rounded-[24px] lg:w-1/2 text-black p-6">
                    <p className="p-4 mb-6">
                        Some customers have some difficulty about Handshake several topic.
                        Most asked question:
                    </p>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1" className="bg-[#E3EAF1] mb-3 text-left rounded-[24px]">
                            <AccordionTrigger className="text-left px-2 md:px-10">
                                What services and transactions can be performed through internet
                                banking?
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-2 border-t-4 px-10 text-[#4A4A4A] border-t-[#FFDD33] rounded-xl">
                                What services and transactions can be performed through internet
                                banking?{" "}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="bg-[#E3EAF1] mb-3 text-left rounded-[24px]">
                            <AccordionTrigger className="text-left px-2 md:px-10">
                                What services and transactions can be performed through internet
                                banking?
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-2 border-t-4 px-10 text-[#4A4A4A] border-t-[#FFDD33] rounded-xl">
                                What services and transactions can be performed through internet
                                banking?{" "}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="bg-[#E3EAF1] mb-3 text-left rounded-[24px]">
                            <AccordionTrigger className="text-left px-2 md:px-10">
                                What services and transactions can be performed through internet
                                banking?
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-2 border-t-4 px-10 text-[#4A4A4A] border-t-[#FFDD33] rounded-xl">
                                What services and transactions can be performed through internet
                                banking?{" "}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="bg-[#E3EAF1] mb-3 text-left rounded-[24px]">
                            <AccordionTrigger className="text-left px-2 md:px-10">
                                What services and transactions can be performed through internet
                                banking?
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-2 border-t-4 px-10 text-[#4A4A4A] border-t-[#FFDD33] rounded-xl">
                                What services and transactions can be performed through internet
                                banking?{" "}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="bg-[#E3EAF1] mb-3 text-left rounded-[24px]">
                            <AccordionTrigger className="text-left px-2 md:px-10">
                                What services and transactions can be performed through internet
                                banking?
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-2 border-t-4 px-10 text-[#4A4A4A] border-t-[#FFDD33] rounded-xl">
                                What services and transactions can be performed through internet
                                banking?{" "}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="flex flex-col md:flex-row gap-6 mt-10">
                        <p>Still don’t understand Handshake:</p>
                        <Button asChild>
                            <Link href="/">Contact Us </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
