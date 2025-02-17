import LoginButton from "@/components/auth/login";
import { StatusChecker } from "@/components/status-checker";

export default function Page() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <section className="z-10 flex w-full flex-col gap-y-6 rounded-lg p-8 px-6 sm:w-3/4 md:w-2/3 lg:w-1/4">
        <header>
          <h1 className="mb-4 text-left text-3xl font-medium text-gray-800 dark:text-gray-200">
            Login to Deelhub.
          </h1>
          <p className="text-left text-2xl font-medium text-[#878787]">
            Automate budgets, simplify client management, and stay organized.
          </p>
        </header>
        <div className="flex justify-center">
          <LoginButton />
        </div>
        <div className="flex-grow" />
        <section>
          <StatusChecker slug="deelhub" />
        </section>
      </section>
    </div>
  );
}
