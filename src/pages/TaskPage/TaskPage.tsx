import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "@/api/tasksOperations";
import type { Task } from "@types";
import TaskList from "@/ui/organism/TaskList/TaskList";
import "./task-page.scss";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  return (
    <section className="p-tasks container">
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      <Tooltip id="priority-tooltip" />
    </section>
  );
};
