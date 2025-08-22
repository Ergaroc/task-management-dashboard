// React
import { useCallback, useEffect, useMemo, useState } from "react";
// React-router
import { useNavigate, useParams } from "react-router";
// Atoms
import { Button, LoaderSpinner } from "@/ui/atoms";
// Organisms
import { TaskModalForm } from "@/ui/organism";
// Icons
import { ArrowLeft, Edit, Trash } from "@/icons/components";
// Types
import type { TaskStatus } from "@/types";
// Interfaces
import type { Task } from "@/interfaces";
// Utils
import { formatDate } from "@/utils";
// Api
import { getTask, updateTask, deleteTask } from "@/api/tasksOperations";
// Styles
import "./task-details-page.scss";

const NEXT_STATUS: Record<TaskStatus, TaskStatus | null> = {
  "To Do": "In Progress",
  "In Progress": "Done",
  Done: null,
};

export const TaskDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTask = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const t = await getTask(id);
      setTask(t);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Task not found.");
      setTask(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  const nextStatus = useMemo(
    () => (task ? NEXT_STATUS[task.status] : null),
    [task]
  );

  const handleBack = () => navigate("/tasks");

  const handleAdvance = async () => {
    if (!task || !nextStatus) return;
    try {
      setWorking(true);
      const updated = await updateTask(task.id, { status: nextStatus });
      setTask(updated);
    } finally {
      setWorking(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;
    try {
      setWorking(true);
      await deleteTask(task.id);
      navigate("/tasks");
    } finally {
      setWorking(false);
    }
  };

  if (loading) {
    return (
      <section className="p-task-details container">
        <output>
          <LoaderSpinner size={64} />
        </output>
      </section>
    );
  }

  if (error || !task) {
    return (
      <section className="p-task-details container">
        <p className="p-task-details__error">Task not found.</p>
        <button className="p-task-details__btn" onClick={handleBack}>
          ← Back to tasks
        </button>
      </section>
    );
  }

  return (
    <section className="p-task-details container" aria-labelledby="task-title">
      <header className="p-task-details__header">
        <h1 id="task-title" className="p-task-details__title">
          {task.title}
        </h1>
        <div className="p-task-details__actions">
          {nextStatus && (
            <Button
              type="button"
              onClick={handleAdvance}
              variant="blue"
              disabled={working}
            >
              Move to {nextStatus}
            </Button>
          )}

          <Button
            type="button"
            onClick={() => setOpenEdit(true)}
            variant="white"
            disabled={working}
            leftIcon={<Edit />}
          >
            Edit
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            variant="red"
            disabled={working}
            leftIcon={<Trash />}
          >
            Delete
          </Button>
        </div>
      </header>

      <div className="p-task-details__meta">
        <span
          className={`p-task-details__chip p-task-details__chip--${task.priority.toLowerCase()}`}
        >
          {task.priority} priority
        </span>
        <span className="p-task-details__chip">{task.status}</span>
        <span className="p-task-details__chip">
          {task.dueDate ? `Due: ${formatDate(task.dueDate)}` : "No due date"}
        </span>
      </div>

      <article className="p-task-details__card card">
        <h2 className="p-task-details__section">Description</h2>
        <p className="p-task-details__description">
          {task.description?.trim() || "No description provided."}
        </p>
      </article>

      <Button
        type="button"
        onClick={handleBack}
        variant="blue"
        disabled={working}
        leftIcon={<ArrowLeft />}
      >
        Back
      </Button>

      <TaskModalForm
        open={openEdit}
        mode="edit"
        initial={task}
        onClose={() => setOpenEdit(false)}
        onSuccess={loadTask}
      />
    </section>
  );
};
