import React from "react";
import Title from "../ui/Title";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomImage from "../CustomImage";
import { images } from "@/data";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mx-auto">
      <div className="section-container py-10">
        <div className="bg-[#171717] p-10 rounded-[32px]">
          <div className=" border-[#667085] border-b pb-20">
            <CustomImage
              src={images.icons.newsletter}
              className="mb-8 ml-4 md:ml-0"
              alt={"Newsletter icon"}
            />
            <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
              <div className="md:w-1/2 flex flex-col gap-4 md:gap-5 px-4">
                <Title
                  title="Keep up with the latest"
                  customClass="text-white md:pr-20"
                />
                <p className="text-[#9E9E9E]">
                  Join our newsletter to stay upto date on features and
                  realeases.
                </p>
              </div>
              <div className="md:w-1/2 flex flex-col gap-5 pl-4">
                <p className="text-white">Stay up to date</p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-full bg-white md:w-[300px] bg-opacity-10 border-none"
                  />
                  <Button>Subscribe</Button>
                </div>
                <p className="text-[#98A2B3] font-poppins">
                  By subscribing you agree to our{" "}
                  <span className="text-white underline">Privacy Policy</span>
                </p>
              </div>
            </div>
          </div>
          {/* Lower footer */}
          <div className="flex flex-col md:flex-row mt-10 lg:justify-between px-4">
            <div className="flex flex-col gap-4 px-2 mb-10 md:mb-0">
              <CustomImage src={images.footerLogo} alt="Company logo" />
              <p className="text-[#9E9E9E] px-10">
                Borderless transfers. Trusted purchases.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-[#9E9E9E] flex flex-col gap-4">
                <h4 className="text-white">Products</h4>
                <Link href={""}>Personal</Link>
                <Link href={""}>Marketplace</Link>
                <Link href={""}>Wallet</Link>
              </div>
              <div className="text-[#9E9E9E] flex flex-col gap-4">
                <h4 className="text-white">Company</h4>
                <Link href={""}>About</Link>
                <Link href={""}>Careers</Link>
                <Link href={""}>Newsletter</Link>
              </div>
              <div className="text-[#9E9E9E] flex flex-col gap-4">
                <h4 className="text-white">Community</h4>
                <Link href={""}>Refer a Friend</Link>
                <Link href={""}>Gift</Link>
              </div>
              <div className="text-[#9E9E9E] flex flex-col gap-4">
                <h4 className="text-white">Support</h4>
                <Link href={""}>Help</Link>
                <Link href={""}>FAQ</Link>
                <Link href={""}>Contact</Link>
              </div>
              <div className="text-[#9E9E9E] flex flex-col gap-4">
                <h4 className="text-white">Legal</h4>
                <Link href={""}>Privacy Policy</Link>
                <Link href={""}>Terms of Services</Link>
                <Link href={""}>Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
