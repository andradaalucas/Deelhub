import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { redirect } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	!user && redirect('/auth/login')
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
