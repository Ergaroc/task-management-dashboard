// Msw
import { http, HttpResponse } from "msw";
// Database
import { loadTasks, saveTasks, resetTasks } from "./db/storage";
import { makeSeed } from "./db/seed";
// Types
import type { TaskPriority, TaskStatus } from "@types";
// Interfaces
import type { Task } from "@/interfaces";
// Constants
import { PRIORITY_ORDER } from "@/constants";

const compareNullable = (a?: string, b?: string) => {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.localeCompare(b);
};

const applyFiltersAndSort = (tasks: Task[], req: Request): Task[] => {
  const url = new URL(req.url);
  const status = url.searchParams.get("status") as TaskStatus | null;
  const priority = url.searchParams.get("priority") as TaskPriority | null;
  const sort = url.searchParams.get("sort");

  let list = [...tasks];

  if (status) list = list.filter((t) => t.status === status);
  if (priority) list = list.filter((t) => t.priority === priority);

  if (sort === "dueDate") {
    list.sort((a, b) => compareNullable(a.dueDate, b.dueDate));
  } else if (sort === "priority") {
    list.sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    );
  } else {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }
  return list;
};

export const handlers = [
  http.get("/api/__ensure-seed", () => {
    if (loadTasks().length === 0) {
      resetTasks(makeSeed(150));
    }
    return HttpResponse.json({ ok: true });
  }),

  http.post("/api/__reset", async ({ request }) => {
    const body = (await request.json().catch(() => ({}))) as { count?: number };
    resetTasks(makeSeed(body.count ?? 150));
    return HttpResponse.json({ ok: true });
  }),

  http.get("/api/tasks", ({ request }) => {
    const tasks = applyFiltersAndSort(loadTasks(), request);
    return HttpResponse.json(tasks);
  }),

  http.post("/api/tasks", async ({ request }) => {
    const data = (await request.json()) as Partial<Task>;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: (data.title ?? "").trim() || "Untitled",
      description: data.description,
      status: (data.status as TaskStatus) ?? "To Do",
      priority: (data.priority as TaskPriority) ?? "Medium",
      dueDate: data.dueDate,
    };

    const tasks = loadTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.get("/api/tasks/:id", ({ params }) => {
    const t = loadTasks().find((x) => x.id === params.id);
    return t
      ? HttpResponse.json(t)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),

  http.put("/api/tasks/:id", async ({ params, request }) => {
    const patch = (await request.json()) as Partial<Task>;

    const tasks = loadTasks();
    const idx = tasks.findIndex((x) => x.id === params.id);
    if (idx === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const { id: _ignore, ...rest } = patch;
    tasks[idx] = { ...tasks[idx], ...rest };
    saveTasks(tasks);

    return HttpResponse.json(tasks[idx]);
  }),

  http.delete("/api/tasks/:id", ({ params }) => {
    const tasks = loadTasks();
    const next = tasks.filter((x) => x.id !== params.id);
    if (next.length === tasks.length) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    saveTasks(next);
    return HttpResponse.json({ ok: true });
  }),
];
