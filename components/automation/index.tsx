"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  CalendarIcon,
  DollarSign,
  Edit,
  RefreshCw,
  Delete,
  Check,
  X,
} from "lucide-react";
import { useState } from "react";
import { CreateAutomation } from "./form-create";

export function Automation() {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      type: "subscription",
      name: "Welcome Email",
      schedule: "On signup",
      active: true,
    },
    {
      id: 2,
      type: "subscription",
      name: "Monthly Subscription Charge",
      schedule: "Every 1st of the month",
      active: true,
    },
    {
      id: 3,
      type: "one-time-payment",
      name: "Initial Setup Fee",
      schedule: "One-time after signup",
      active: false,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  const toggleAutomation = (id: number, checked: boolean) => {
    setAutomations((prev) =>
      prev.map((auto) =>
        auto.id === id ? { ...auto, active: checked } : auto,
      ),
    );
  };

  const startEditing = (id: number, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const saveEdit = (id: number) => {
    setAutomations((prev) =>
      prev.map((auto) => (auto.id === id ? { ...auto, name: editName } : auto)),
    );
    setEditingId(null);
  };

  const deleteAutomation = (id: number) => {
    setAutomations((prev) => prev.filter((auto) => auto.id !== id));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4">
      <div className="flex justify-end">
        <CreateAutomation />
      </div>
      <div className="space-y-4">
        {automations.map((auto) => (
          <div
            key={auto.id}
            className="flex items-center justify-between rounded-lg border bg-muted p-4"
          >
            <div className="flex items-center space-x-4">
              {auto.type === "subscription" && (
                <RefreshCw className="h-5 w-5 text-primary" />
              )}
              {auto.type === "one-time-payment" && (
                <DollarSign className="h-5 w-5 text-primary" />
              )}
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <div
                    className={`h-2 w-2 animate-pulse rounded-full ${
                      auto.active ? "bg-green-600" : "bg-red-500"
                    }`}
                  />
                  {editingId === auto.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-40 rounded border px-2 py-1 text-sm"
                    />
                  ) : (
                    auto.name
                  )}
                </h3>
                <span className="text-sm text-gray-500">
                  {auto.type === "subscription"
                    ? "Subscription"
                    : "One-time payment"}
                </span>
                <p className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1 h-4 w-4" /> {auto.schedule}
                </p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center space-x-2">
              <Switch
                checked={auto.active}
                onCheckedChange={(checked) =>
                  toggleAutomation(auto.id, checked)
                }
              />
              {editingId === auto.id ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => saveEdit(auto.id)}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => startEditing(auto.id, auto.name)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteAutomation(auto.id)}
              >
                <Delete className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
