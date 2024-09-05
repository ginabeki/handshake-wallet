"use client";

import { images } from "@/data";
import Link from "next/link";
import React, { useState } from "react";
import CustomImage from "../CustomImage";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navigations = [
  { name: "Home", href: "/", customClass: "block lg:hidden" },
  { name: "about", href: "/about", customClass: "" },
  {
    name: "send money",
    href: "/send-money",
    customClass: "block lg:hidden xl:block",
  },
  { name: "marketplace", href: "/marketplace", customClass: "" },
  { name: "features", href: "/features", customClass: "" },
  { name: "contact", href: "/contact", customClass: "" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full mx-auto drop-shadow-md">
      <div className="w-full mx-auto flex flex-row items-center justify-between max-w-[1440px] px-5 py-6 md:px-10">
        <Link href={"/"} className="w-[200px]">
          <CustomImage
            src={images.logo2}
            alt="handShake Wallet logo"
            width={500}
            height={500}
            className="w-full h-full object-center object-cover"
          />
        </Link>
        <nav className="hidden lg:inline-flex items-center justify-center space-x-3 text-[14px]">
          {navigations.map((nav, index) => (
            <Link
              key={index}
              href={nav.href}
              className={`px-6 py-1.5 capitalize rounded-full text-center text-black flex flex-row items-center justify-center font-medium transition-all duration-200 ease-linear ${
                nav.customClass
              } 
              ${
                String(pathname) === nav.href
                  ? "bg-primary-yellow"
                  : "bg-transparent hover:bg-primary-yellow/70"
              }`}
            >
              <span>{nav.name}</span>
            </Link>
          ))}
        </nav>
        <div className="inline-flex items-center justify-end space-x-10">
          <div className="text-[14px] hidden md:block">
            <Link
              href={"/send-money"}
              className={`px-6 py-2 capitalize rounded-full text-center flex flex-row items-center justify-center font-medium transition-all duration-200 ease-linear  ${
                String(pathname) === "/send-money"
                  ? "bg-primary-yellow text-black"
                  : "bg-black hover:bg-primary-yellow/70 hover:text-black text-white"
              }`}
            >
              <span>Send money</span>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center lg:hidden"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XMarkIcon
                aria-hidden="true"
                className="h-8 w-8 text-red-600 group-data-[open]:block"
              />
            ) : (
              <Bars3Icon
                aria-hidden="true"
                className="h-8 w-8 text-black group-data-[open]:hidden"
              />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 w-full h-full backdrop-blur-md bg-black/50 p-5 overflow-hidden lg:hidden 
            "
          >
            <div className="flex flex-col items-center justify-center gap-2 md:max-w-[300px] md:ml-auto w-full">
              {navigations.map((nav) => (
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  key={nav.name}
                  href={nav.href}
                  className={`capitalize relative w-full border-black p-3 inline-flex 
                    items-center justify-start space-x-5 rounded-lg ${
                      nav.customClass
                    }
                   ${
                     String(pathname) === nav.href
                       ? "bg-primary-yellow"
                       : "bg-white hover:bg-primary-yellow/70 text-black"
                   }`}
                >
                  <span>{nav.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
