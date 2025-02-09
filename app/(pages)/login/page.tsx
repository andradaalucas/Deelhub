import LoginButton from "@/components/auth/login";
import { Vercel, Nextjs, Supabase, TypeScript } from "@/components/ui/brands";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="w-full rounded-lg p-8 px-6 sm:w-3/4 md:w-2/3 lg:w-1/4">
        <div>
          <h1 className="mb-4 text-left text-3xl font-medium text-gray-800 dark:text-gray-200">
            Login to Deelhub.
          </h1>
          <p className="mb-6 text-left text-2xl font-medium text-[#878787]">
            Automate budgets, simplify client management, and stay organized.
          </p>
        </div>
        <div className="flex justify-center">
          <LoginButton />
        </div>
        <div className="mt-6">
          <div className="font-semibold">Build with</div>
          <div className="flex gap-4">
            <Vercel className="h-9 w-9 grayscale" />
            <Nextjs className="h-9 w-9 grayscale" />
            <Supabase className="h-9 w-9 grayscale" />
            <TypeScript className="h-9 w-9 grayscale" />
          </div>
        </div>
      </section>
    </div>
  );
}
