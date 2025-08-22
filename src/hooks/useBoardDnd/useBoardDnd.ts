// React
import { useState, useMemo } from "react";
// Libraries
import {
  PointerSensor,
  useSensors,
  useSensor,
  closestCenter,
} from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
// Types
import type { TaskStatus } from "@types";
// Interfaces
import type { Task } from "@/interfaces";
// Api
import { updateTask } from "@/api/tasksOperations";

export const useBoardDnd = (tasks: Task[], setTasks: (t: Task[]) => void) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const groups = useMemo(
    () => ({
      "To Do": tasks.filter((t) => t.status === "To Do"),
      "In Progress": tasks.filter((t) => t.status === "In Progress"),
      Done: tasks.filter((t) => t.status === "Done"),
    }),
    [tasks]
  );

  const onDragStart = (e: DragStartEvent) => {
    setActiveTask(e.active.data.current?.task ?? null);
  };

  const onDragEnd = async (e: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;
    const dragged = active.data.current?.task as Task | undefined;
    const newStatus = over.id as TaskStatus;
    if (!dragged || dragged.status === newStatus) return;

    const prev = tasks;
    const next = prev.map((t) =>
      t.id === dragged.id ? { ...t, status: newStatus } : t
    );
    setTasks(next);
    try {
      await updateTask(dragged.id, { status: newStatus });
    } catch {
      setTasks(prev);
    }
  };

  return {
    sensors,
    groups,
    onDragStart,
    onDragEnd,
    activeTask,
    collisionDetection: closestCenter,
  };
};
