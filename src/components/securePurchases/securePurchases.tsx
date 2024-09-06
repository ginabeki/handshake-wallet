import React from "react";
import Title from "../ui/Title";
import { images } from "@/data";
import CustomImage from "../CustomImage";
import { Button } from "../ui/button";

const SecurePurchases = () => {
    return (
        <div className="">
            <div className="bg-[#edfdf3] mt-20 section-container py-20 rounded-[32px] mx-auto">
                <Title title="Secure purchase process" customClass="text-center mb-4" />
                <p className="text-[#4A4A4A] text-base mb-10 text-center">
                    Your peace of mind, guaranteed
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto md:w-[65%]">
                    <div className="bg-[#ffff] p-4 rounded-[32px] items-center flex gap-4 md:col-span-1">
                        <CustomImage
                            src={images.icons.buyer}
                            width={50}
                            height={50}
                            alt="Buyer commits funds, securely held by handshake wallet"
                        />
                        <p>Buyer commits funds, securely held by handshake wallet</p>
                    </div>
                    <div className="bg-[#ffff] p-4 rounded-[32px] items-center flex gap-4 md:col-span-1">
                        <CustomImage
                            src={images.icons.delivery} width={50}
                            height={50}
                            alt="We ship the item after the seller drops it to the nearest pick up store"
                        />
                        <p>We ship the item after the seller drops it to the nearest pick up store</p>
                    </div>
                    <div className="bg-[#ffff] p-4 rounded-[32px] items-center flex gap-4 md:col-span-1">
                        <CustomImage
                            src={images.icons.confirm}
                            width={50}
                            height={50}
                            alt="Buyer receives and confirms"
                        />
                        <p>Buyer receives and confirms</p>
                    </div>
                    <div className="bg-[#ffff] p-4 rounded-[32px] items-center flex gap-4 md:col-span-1">
                        <CustomImage
                            src={images.icons.delivery}
                            width={50}
                            height={50}
                            alt="We facilitate delivery tracking"
                        />
                        <p>We facilitate delivery tracking</p>
                    </div>
                    <div className="bg-[#ffff] p-4 rounded-[32px] flex gap-4 items-center md:col-span-2 mx-auto justify-center">
                        <CustomImage
                            src={images.icons.funds}
                            width={50}
                            height={50}
                            alt="Funds released to seller via our wallet"
                        />
                        <p>Funds released to seller via our wallet</p>
                    </div>
                </div>
                <Button variant="default" className="mt-20 mx-auto block">Start Shopping</Button>
            </div>
        </div>
    );
};

export default SecurePurchases;
