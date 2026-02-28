import type { Metadata } from "next";
import { Epilogue, Inter, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire - Discover More Than 5000+ Jobs",
  description:
    "Great platform for the job seeker that searching for new career heights and passionate about startups. Find your dream job easier.",
  keywords: ["jobs", "career", "hiring", "job board", "recruitment"],
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${epilogue.variable} ${inter.variable} ${redHatDisplay.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
