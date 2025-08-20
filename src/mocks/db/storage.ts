import type { Task } from "@types";

const KEY = "tm.tasks.v1";

export const loadTasks = (): Task[] => {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Task[]) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(KEY, JSON.stringify(tasks));
};

export const resetTasks = (tasks: Task[]) => {
  saveTasks(tasks);
};
