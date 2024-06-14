import type { Metadata } from "next";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";
import theme from "./theme";
import { ColorModeScript } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />

        <Providers>
          {  <Navbar />}
          <main className="min-h-screen">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
