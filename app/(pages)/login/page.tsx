import LoginButton from "@/components/auth/login";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative hidden h-3/4 w-1/3 overflow-hidden rounded-lg shadow-lg lg:block">
        <Image
          src="/assets/images/background-login.avif"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          priority // Mejora el rendimiento para imágenes importantes
        />
      </div>
      <div className="w-full rounded-lg p-8 px-6 sm:w-3/4 md:w-2/3 lg:w-1/4">
        <h1 className="mb-4 text-left text-3xl font-medium text-gray-800 dark:text-gray-200">
          Login to Deelhub.
        </h1>
        <p className="mb-6 text-left text-2xl font-medium text-[#878787]">
          Automate financial tasks, stay organized, and make informed decisions
          effortlessly.
        </p>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
