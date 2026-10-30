import SessionGuard from "@/components/eoha/SessionGuard";

export default function EohaLayout({ children }: { children: React.ReactNode }) {
  return <SessionGuard>{children}</SessionGuard>;
}
