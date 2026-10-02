"use client";

import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

type SiteChromeProps = {
  section: "header" | "footer";
};

export default function SiteChrome({ section }: SiteChromeProps) {
  return section === "header" ? <NavBar /> : <Footer />;
}