import type { Metadata } from "next";
import {  Sora } from "next/font/google";
import "./globals.css";

const soraSans = Sora({
  variable: "--font-sora-sans",
  subsets: ["latin"],
});

const soraMono = Sora({
  variable: "--font-sora-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkVault",
  description: "Your smart bookmark app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraSans.variable} ${soraMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
