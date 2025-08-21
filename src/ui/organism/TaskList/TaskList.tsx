import { memo } from "react";
import type { Task } from "@types";
import "./TaskList.scss";
import { Card } from "@/ui/molecules";

interface TaskListProps {
  tasks: Task[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskList = ({ tasks }: TaskListProps) => {
  const toDoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  if (!tasks.length) {
    return (
      <output className="o-task-list o-task-list--empty" aria-live="polite">
        <p className="o-task-list__empty-text">No tasks yet.</p>
      </output>
    );
  }

  return (
    <div className={`o-task-list`}>
      <section
        className="o-task-list__section--to-do"
        aria-labelledby="todo-title"
      >
        <h2 className="o-task-list__title" id="todo-title">
          To Do ({toDoTasks.length})
        </h2>
        <div className="o-task-list__cards">
          {toDoTasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>
      </section>

      <section
        className="o-task-list__section--in-progress"
        aria-labelledby="inprogress-title"
      >
        <h2 className="o-task-list__title" id="inprogress-title">
          In Progress ({inProgressTasks.length})
        </h2>
        <div className="o-task-list__cards">
          {inProgressTasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>
      </section>

      <section
        className="o-task-list__section--done"
        aria-labelledby="done-title"
      >
        <h2 className="o-task-list__title" id="done-title">
          Done ({doneTasks.length})
        </h2>
        <div className="o-task-list__cards">
          {doneTasks.map((task) => (
            <Card key={task.id} {...task} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default memo(TaskList);
