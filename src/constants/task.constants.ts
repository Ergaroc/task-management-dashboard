// Types
import type { TaskStatus, TaskPriority } from "@/types";

export const STATUSES: TaskStatus[] = ["To Do", "In Progress", "Done"];
export const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];
export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  Low: 0,
  Medium: 1,
  High: 2,
};
