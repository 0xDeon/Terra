import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Terra - Bitcoin-Native Social Platform",
  description: "A Bitcoin-native social platform built on the Stacks blockchain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
