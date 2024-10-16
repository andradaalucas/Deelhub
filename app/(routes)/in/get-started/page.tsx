import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="cursor-default text-[#0575f5] transition-colors duration-200 hover:text-[#68b5fb]">
    {children}
  </span>
);

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <section id="getting-started" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Getting Started</h2>
          <ol className="list-inside list-decimal space-y-4">
            <li className="text-gray-700">
              <span className="font-medium">
                <Keyword>Sign Up</Keyword>:
              </span>
              Create your account by clicking the {"Sign Up"} button on the
              homepage.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">
                <Keyword>Login</Keyword>:
              </span>
              Once your account is created, log in using your credentials.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">
                <Keyword>Dashboard</Keyword>:
              </span>
              After logging in, you{"'"}ll be taken to your dashboard where you
              can see an overview of your tasks and projects.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">
                <Keyword>Create a Project</Keyword>:
              </span>
              Click on the {"New Project"} button to create your first project.
            </li>
            <li className="text-gray-700">
              <span className="font-medium">
                <Keyword>Add Tasks</Keyword>:
              </span>
              Within your project, you can start adding tasks by clicking
              {"Add Task"}.
            </li>
          </ol>
        </section>

        <section id="key-features" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">Key Features</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-2 text-lg font-medium">
                <Keyword>Task Management</Keyword>
              </h3>
              <p className="text-gray-600">
                Create, assign, and track tasks easily. Set
                <Keyword>due dates</Keyword>, <Keyword>priorities</Keyword>, and
                add descriptions to keep everyone informed.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-2 text-lg font-medium">
                <Keyword>Team Collaboration</Keyword>
              </h3>
              <p className="text-gray-600">
                Invite team members, assign tasks, and communicate within the
                app using <Keyword>comments</Keyword> and
                <Keyword>mentions</Keyword>.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-2 text-lg font-medium">
                <Keyword>Progress Tracking</Keyword>
              </h3>
              <p className="text-gray-600">
                View project progress at a glance with our intuitive
                <Keyword>dashboards</Keyword> and reports.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-2 text-lg font-medium">
                <Keyword>File Sharing</Keyword>
              </h3>
              <p className="text-gray-600">
                Upload, share, and manage files with your team. Keep documents
                organized and accessible at any time.
              </p>
            </div>
          </div>
        </section>

        <section id="user-management" className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold">User Management</h2>
          <p className="mb-4 text-gray-600">
            Efficiently manage users and their roles within your organization:
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>
              Invite new users via <Keyword>email</Keyword>
            </li>
            <li>
              Assign <Keyword>roles</Keyword> (Admin, Manager, Member)
            </li>
            <li>
              Set <Keyword>permissions</Keyword> for different user types
            </li>
            <li>
              <Keyword>Deactivate</Keyword> or remove users when needed
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <h2 className="mb-2 text-xl font-semibold">Need More Help?</h2>
            <p className="mb-4 text-gray-600">
              Our support team is always here to assist you.
            </p>
            <Button>
              Contact Support
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
