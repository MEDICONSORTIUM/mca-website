import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malaria Guard - Resource Center",
  description: "Research papers, datasets, and methodology documentation.",
};

export default function ResourceCenterLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
