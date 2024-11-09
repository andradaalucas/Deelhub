import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="cursor-default text-[#0575f5] transition-colors duration-200 hover:text-[#68b5fb]">
    {children}
  </span>
);

const features = [
  {
    title: "User Management",
    description:
      "Efficiently manage users and their roles within your organization.",
    items: [
      "Invite new users via email",
      "Assign roles (Admin, Manager, Member)",
      "Set permissions for different user types",
      "Deactivate or remove users when needed",
    ],
  },
  {
    title: "User Management",
    description:
      "Efficiently manage users and their roles within your organization.",
    items: [
      "Invite new users via email",
      "Assign roles (Admin, Manager, Member)",
      "Set permissions for different user types",
      "Deactivate or remove users when needed",
    ],
  },
  {
    title: "User Management",
    description:
      "Efficiently manage users and their roles within your organization.",
    items: [
      "Invite new users via email",
      "Assign roles (Admin, Manager, Member)",
      "Set permissions for different user types",
      "Deactivate or remove users when needed",
    ],
  },
];

export function GetStarted() {
  return (
    // <div className="min-h-screen">
    //   <main className="mx-auto max-w-3xl px-6 py-12">
    //     <section id="getting-started" className="mb-12">
    //       <h1>Introduction</h1>
    //       <span>

    //       </span>
    //     </section>

    //     <section id="key-features" className="mb-12">
    //       <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
    //       {features.map((feature) => (
    //         <div key={feature.title} className="mb-8">
    //           <h3 className="mb-4 text-xl font-semibold">{feature.title}</h3>
    //           <p className="mb-4 text-gray-600">{feature.description}</p>
    //           <ul className="list-inside list-disc space-y-2">
    //             {feature.items.map((item) => (
    //               <li key={item}>{item}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </section>

    //     <section id="user-management" className="mb-12">
    //       <h2 className="mb-4 text-2xl font-semibold">User Management</h2>
    //       <p className="mb-4 text-gray-600">
    //         Efficiently manage users and their roles within your organization:
    //       </p>
    //       <ul className="list-inside list-disc space-y-2">
    //         <li>
    //           Invite new users via <Keyword>email</Keyword>
    //         </li>
    //         <li>
    //           Assign <Keyword>roles</Keyword> (Admin, Manager, Member)
    //         </li>
    //         <li>
    //           Set <Keyword>permissions</Keyword> for different user types
    //         </li>
    //         <li>
    //           <Keyword>Deactivate</Keyword> or remove users when needed
    //         </li>
    //       </ul>
    //     </section>

    //     <section className="mb-12">
    //       <Card>
    //         <CardHeader>Need More Help?</CardHeader>
    //         <CardContent>
    //           <p>Our support team is always here to assist you.</p>
    //           <CardFooter>
    //             <Button>
    //               Contact Support
    //               <ChevronRight className="ml-2 h-4 w-4" />
    //             </Button>
    //           </CardFooter>
    //         </CardContent>
    //       </Card>
    //     </section>
    //   </main>
    // </div>
    <div>Coming soon</div>
  );
}
