import type { Metadata } from "next";
import SiteChrome from "@/components/layout/SiteChrome";
import "./globals.css";
import ReCaptchaProvider from "@/components/providers/ReCaptchaProvider";

export const metadata: Metadata = {
  title: "Medical Consortium of Africa",
  description: "MCA public website",
};

export default function RootLayout({ children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="h-full antialiased">
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
