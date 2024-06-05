import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        <h1 className="font-bold">Not found – 404</h1>
        <div>
          <Link href="/" className="hover:underline">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
}
