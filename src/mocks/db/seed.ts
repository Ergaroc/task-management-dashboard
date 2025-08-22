// Constants
import { PRIORITIES, STATUSES } from "@/constants";
// Interfaces
import type { Task } from "@/interfaces";

export const makeSeed = (count = 125): Task[] => {
  const now = new Date();
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const due = new Date(now.getTime() + (i % 60) * 43200000);

    tasks.push({
      id: crypto.randomUUID(),
      title: `Task #${i + 1}`,
      description: i % 3 === 0 ? `Description for task ${i + 1}` : undefined,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      priority: PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)],
      dueDate: i % 2 === 0 ? due.toISOString() : undefined,
    });
  }
  return tasks;
};
