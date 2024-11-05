import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
