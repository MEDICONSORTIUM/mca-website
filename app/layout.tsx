import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Consortium of Africa",
  description: "MCA public website",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body>
        <ReCaptchaProvider>
          <SiteChrome section="header" />
          {children}
          <SiteChrome section="footer" />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
