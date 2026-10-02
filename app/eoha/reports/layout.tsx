import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malaria Guard - Reports",
  description: "Ward-level malaria risk reports for Limpopo Province.",
};

export default function ReportsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}