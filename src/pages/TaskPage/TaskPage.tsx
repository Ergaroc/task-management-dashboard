// React
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
// Libraries
import { Tooltip } from "react-tooltip";
// Organisms
import { BoardDnd, TaskList, TaskModalForm, Toolbar } from "@/ui/organism";
// Types
import type { TaskPriority, TaskSort, TaskStatus } from "@/types";
// Interfaces
import type { Task } from "@/interfaces";
// Utils
import { exportTasksCSV, sortTasks } from "@/utils";
// Hooks
import { useMediaQuery } from "@/hooks";
// Api
import { getTasks } from "@/api/tasksOperations";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [status, setStatus] = useState<TaskStatus | "">("");
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [sortField, setSortField] = useState<"priority" | "dueDate" | "title">(
    "title"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const loadTasks = useCallback(async () => {
    const list = await getTasks();
    setTasks(list);
  }, []);

  const [isPending, startTransition] = useTransition();

  const onPriorityChange = (p: TaskPriority | "") =>
    startTransition(() => setPriority(p));

  const onStatusChange = (s: TaskStatus | "") =>
    startTransition(() => setStatus(s));

  const onSortFieldChange = (f: "" | TaskSort) =>
    startTransition(() => {
      if (f === "") {
        setSortField("title");
      } else {
        setSortField(f);
      }
    });

  const onSortOrderChange = (o: "asc" | "desc") =>
    startTransition(() => setSortOrder(o));

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const okPriority = priority ? t.priority === priority : true;
      const okStatus = status ? t.status === status : true;
      return okPriority && okStatus;
    });
  }, [tasks, priority, status]);

  const sorted = useMemo(() => {
    return sortTasks(filtered, sortField, sortOrder);
  }, [filtered, sortField, sortOrder]);

  const handleCreateTaskButton = () => {
    setOpenCreate(true);
  };

  const handleExportAll = () => {
    if (!tasks.length) return;
    exportTasksCSV(tasks, { filename: "tasks_all.csv" });
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <section className="p-tasks container">
      <Toolbar
        onCreateTask={handleCreateTaskButton}
        priority={priority}
        status={status}
        sortField={sortField}
        sortOrder={sortOrder}
        onPriorityChange={onPriorityChange}
        onStatusChange={onStatusChange}
        onSortFieldChange={onSortFieldChange}
        onSortOrderChange={onSortOrderChange}
        onExportAll={handleExportAll}
        pending={isPending}
      />

      {isDesktop ? (
        <BoardDnd tasks={sorted} setTasks={setTasks} />
      ) : (
        <TaskList tasks={sorted} sortField={sortField} sortOrder={sortOrder} />
      )}

      <TaskModalForm
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        mode={"create"}
        onSuccess={loadTasks}
      />

      <Tooltip id="priority-tooltip" />
    </section>
  );
};
