import { api } from "./client";
import type { Task } from "@types";

export const getTasks = () => api.get<Task[]>("/api/tasks");

export const getTask = (id: string) => api.get<Task>(`/api/tasks/${id}`);

export const createTask = (task: Partial<Task>) =>
  api.post<Task>("/api/tasks", task);

export const updateTask = (id: string, patch: Partial<Task>) =>
  api.put<Task>(`/api/tasks/${id}`, patch);

export const deleteTask = (id: string) =>
  api.delete<{ ok: true }>(`/api/tasks/${id}`);
