import type { Metadata } from "next";
import { Inter, Cormorant } from "next/font/google";
import { SmoothScroll } from "../components/SmoothScroll";
import { CookieConsent } from "../components/CookieConsent";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Terra - The Social Layer for Bitcoin",
  description:
    "Terra is the Bitcoin-native social platform where creators launch coins, mint NFTs, and build real communities on the Stacks blockchain.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
