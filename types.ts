export type PartnerCategory =
  | "Academic"
  | "Government"
  | "NGO"
  | "Funder";

export type Partner = {
  name: string;
  category: PartnerCategory;
  logoSrc: string;
  url: string;
  description: string;
};
