// Api
import { api } from "./client";
// Types
import type { TaskPriority, TaskStatus } from "@/types";
// Interfaces
import type { Task } from "@/interfaces";

type GetTasksParams = {
  status?: TaskStatus;
  priority?: TaskPriority;
  sort?: "dueDate" | "priority";
  order?: "asc" | "desc";
};

export const getTasks = (params: GetTasksParams = {}) => {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.priority) search.set("priority", params.priority);
  if (params.sort) search.set("sort", params.sort);
  if (params.order) search.set("order", params.order);

  const query = search.toString();
  const url = query ? "/api/tasks?" + query : "/api/tasks";
  return api.get<Task[]>(url);
};

export const getTask = (id: string) => api.get<Task>(`/api/tasks/${id}`);

export const createTask = (task: Partial<Task>) =>
  api.post<Task>("/api/tasks", task);

export const updateTask = (id: string, patch: Partial<Task>) =>
  api.put<Task>(`/api/tasks/${id}`, patch);

export const deleteTask = (id: string) =>
  api.delete<{ ok: true }>(`/api/tasks/${id}`);
