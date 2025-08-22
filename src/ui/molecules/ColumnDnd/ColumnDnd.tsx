// Dnd
import { useDroppable } from "@dnd-kit/core";
// Types
import type { TaskStatus } from "@types";
// Interfaces
import type { Task } from "@/interfaces";
// Styles
import "./column-dnd.scss";

type Props = {
  readonly status: TaskStatus;
  readonly tasks: readonly Task[];
  readonly renderTask: (t: Task) => React.ReactNode;
};

export const ColumnDnd = ({ status, tasks, renderTask }: Props) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <section
      ref={setNodeRef}
      className={`m-column-dnd--${status.replace(/\s/g, "-").toLowerCase()}`}
      aria-labelledby={`col-${status}`}
    >
      <header className="m-column-dnd__header">
        <h2 id={`col-${status}`} className="m-column-dnd__title">
          {status}
        </h2>
        <span className="m-column-dnd__badge">{tasks.length}</span>
      </header>

      <div className="m-column-dnd__cards">{tasks.map(renderTask)}</div>
    </section>
  );
};
