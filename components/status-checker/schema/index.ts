import * as z from "zod";
const statusEnum = z.enum([
  "operational",
  "degraded_performance",
  "partial_outage",
  "major_outage",
  "under_maintenance",
  "unknown",
  "incident",
]);

export const statusSchema = z.object({ status: statusEnum });
