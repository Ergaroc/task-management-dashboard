// Constants
import { PRIORITY_ORDER } from "@/constants";
// Interfaces
import type { Task } from "@/interfaces";

export type TaskSortField = "title" | "dueDate" | "priority";
export type TaskSortOrder = "asc" | "desc";

const collator = new Intl.Collator(undefined, {
  sensitivity: "base",
  numeric: true,
});

export const makeTaskComparator = (
  field: TaskSortField,
  order: TaskSortOrder
) => {
  const dir = order === "asc" ? 1 : -1;

  if (field === "title") {
    return (a: Task, b: Task) => {
      const ta = (a.title ?? "").trim();
      const tb = (b.title ?? "").trim();
      if (!ta && !tb) return 0;
      if (!ta) return 1;
      if (!tb) return -1;
      return collator.compare(ta, tb) * dir;
    };
  }

  if (field === "dueDate") {
    const toNum = (d?: string) =>
      d ? Date.parse(d) : Number.POSITIVE_INFINITY;
    return (a: Task, b: Task) => (toNum(a.dueDate) - toNum(b.dueDate)) * dir;
  }

  return (a: Task, b: Task) =>
    (PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]) * dir;
};

export const sortTasks = (
  list: Task[],
  field: TaskSortField,
  order: TaskSortOrder
) => {
  const cmp = makeTaskComparator(field, order);
  return [...list].sort(cmp);
};
