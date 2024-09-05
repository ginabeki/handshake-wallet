import { images } from "@/data";
import Link from "next/link";
import React from "react";
import CustomImage from "../CustomImage";

const navigations = [
  { name: "about", href: "/" },
  { name: "send money", href: "/" },
  { name: "marketplace", href: "/" },
  { name: "features", href: "/" },
  { name: "contact", href: "/" },
];

const Navbar = () => {
  return (
    <>
      <header className="w-full mx-auto">
        <div className="w-full mx-auto flex flex-row items-center justify-between max-w-[1440px] p-5 md:px-10 lg:px-20">
          <div className="w-[200px]">
            <CustomImage
              src={images.logo2}
              alt="handShake Wallet logo"
              width={500}
              height={500}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <nav className="inline-flex items-center justify-center space-x-5 text-[14px]">
            {navigations.map((nav, index) => (
              <Link
                key={index}
                href={nav.href}
                className="px-6 py-1.5 capitalize hover:bg-primary-yellow rounded-full text-center text-black flex flex-row items-center justify-center font-medium transition-all duration-200 ease-linear"
              >
                <span>{nav.name}</span>
              </Link>
            ))}
          </nav>
          <div className="text-[14px]">
            <Link
              href={"/"}
              className="px-6 py-2 capitalize bg-black text-white hover:text-black hover:bg-primary-yellow rounded-full text-center flex flex-row items-center justify-center font-medium transition-all duration-200 ease-linear"
            >
              <span>Send money</span>
            </Link>
          </div>
        </div>
      </header>
      <section className="w-full mx-auto bg-green-300 p-5">
        <div className="section-container bg-white">
          <span>hello there</span>
        </div>
      </section>
    </>
  );
};

export default Navbar;
