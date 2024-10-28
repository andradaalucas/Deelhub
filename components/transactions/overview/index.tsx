import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export function Overview() {
  const [isLoadingOverview, setIsLoadingOverview] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingOverview(false);
    }, 2000);
  }, []);
  return (
    <Card className="col-span-full mx-auto grid w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div>AI-Powered Recommendations</div>
        </CardTitle>
        <CardDescription>
          Products and services tailored for you
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <div className="flex-shrink-0 rounded-full bg-gray-100 p-3 dark:bg-[#27272a]">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <div>
                {isLoadingOverview ? (
                  <>
                    <div className="mb-2 h-6 w-24 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                    <div className="h-8 w-48 animate-pulse bg-zinc-200 dark:bg-[#2b2b2b]" />
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold">Product {item}</h3>
                    <p className="text-sm text-gray-400 dark:text-gray-300">
                      Recommended based on your spending habits
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
