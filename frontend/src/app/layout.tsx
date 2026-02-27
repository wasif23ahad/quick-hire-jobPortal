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
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${epilogue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
