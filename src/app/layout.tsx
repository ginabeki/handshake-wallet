"use client";

import { Inter } from "next/font/google";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/lib/state/store";
import { Footer, Navbar } from "@/components/layout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>HandShake-Wallet</title>
        <meta name="description" content="HandShake Wallet" />
        <link rel="icon" href="./images/logo/logo.png" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
