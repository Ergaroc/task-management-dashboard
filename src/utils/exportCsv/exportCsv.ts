// Interfaces
import type { Task } from "@/interfaces";

type ExportOptions = {
  filename?: string;
  delimiter?: string;
  includeBOM?: boolean;
};

const quote = (s: string, delimiter: string) => {
  const needsQuote =
    s.includes('"') || s.includes(delimiter) || /[\r\n]/.test(s);
  const escaped = s.replace(/"/g, '""');
  return needsQuote ? `"${escaped}"` : escaped;
};

const toYyyyMmDd = (iso?: string) => (iso ? iso.slice(0, 10) : "");

export const tasksToCSV = (tasks: Task[], opts: ExportOptions = {}): string => {
  const delimiter = opts.delimiter ?? ",";
  const header = [
    "id",
    "title",
    "description",
    "status",
    "priority",
    "dueDate",
  ];

  const rows = tasks.map((t) => [
    t.id ?? "",
    t.title ?? "",
    t.description ?? "",
    t.status ?? "",
    t.priority ?? "",
    toYyyyMmDd(t.dueDate),
  ]);

  const csv = [header, ...rows]
    .map((cols) => cols.map((c) => quote(String(c), delimiter)).join(delimiter))
    .join("\r\n");

  return opts.includeBOM ?? true ? "\uFEFF" + csv : csv;
};

export const downloadCSV = (csvText: string, filename = "tasks.csv") => {
  const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportTasksCSV = (tasks: Task[], options?: ExportOptions) => {
  const csv = tasksToCSV(tasks, options);
  downloadCSV(csv, options?.filename ?? "tasks.csv");
};
