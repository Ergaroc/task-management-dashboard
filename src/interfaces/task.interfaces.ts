// Types
import type { TaskPriority, TaskStatus } from "../types/task.types";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
}
