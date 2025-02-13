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
    <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-6">
      {children}
    </main>
  );
}
