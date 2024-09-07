import { ReduxProvider } from "@/context";
import "../styles/globals.css";
import { Footer, Navbar } from "@/components/layout";

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
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
