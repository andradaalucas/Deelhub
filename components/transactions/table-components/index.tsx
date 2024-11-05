import { CreateForm } from "../form-create";
import { OptionsTable } from "./options-table";

export function OptionsAndCreate() {
  return (
    <div className="flex items-center gap-2">
      <OptionsTable />
      <CreateForm />
    </div>
  );
}
