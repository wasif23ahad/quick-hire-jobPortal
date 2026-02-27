import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuickHire - Discover More Than 5000+ Jobs",
  description:
    "Great platform for the job seeker that searching for new career heights and passionate about startups. Find your dream job easier.",
  keywords: ["jobs", "career", "hiring", "job board", "recruitment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
