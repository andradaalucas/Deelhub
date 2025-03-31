import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deelhub",
};

export default async function InLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      {children}
    </div>
  );
}
