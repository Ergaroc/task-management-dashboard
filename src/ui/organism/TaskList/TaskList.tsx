// React
import { useEffect, useMemo, useRef } from "react";
// Molecules
import { Card } from "@/ui/molecules";
// Constants
import { STATUSES } from "@/constants";
// Interfaces
import type { Task } from "@/interfaces";
// Types
import type { TaskStatus } from "@types";
// Utils
import {
  makeTaskComparator,
  type TaskSortField,
  type TaskSortOrder,
} from "@/utils";
// Styles
import "./TaskList.scss";

type Props = {
  tasks: Task[];
  sortField: TaskSortField;
  sortOrder: TaskSortOrder;
};

export const TaskList = ({ tasks, sortField, sortOrder }: Props) => {
  const cmp = useMemo(
    () => makeTaskComparator(sortField, sortOrder),
    [sortField, sortOrder]
  );

  const groups = useMemo(() => {
    const map: Record<TaskStatus, Task[]> = {
      "To Do": [],
      "In Progress": [],
      Done: [],
    };
    for (const t of tasks) map[t.status].push(t);
    STATUSES.forEach((s) => {
      map[s] = map[s].slice().sort(cmp);
    });
    return map;
  }, [tasks, cmp]);

  const scrollers = useRef<Record<TaskStatus, HTMLDivElement | null>>({
    "To Do": null,
    "In Progress": null,
    Done: null,
  });
  useEffect(() => {
    STATUSES.forEach((s) =>
      scrollers.current[s]?.scrollTo({ left: 0, behavior: "instant" as any })
    );
  }, [sortField, sortOrder, tasks.length]);

  if (!tasks.length) {
    return (
      <output className="o-task-list o-task-list--empty" aria-live="polite">
        <p className="o-task-list__empty-text">No tasks yet.</p>
      </output>
    );
  }

  return (
    <div className="o-task-list container">
      <div className="o-task-list__grid">
        {STATUSES.map((status) => (
          <section
            key={status}
            className={`o-task-list__column o-task-list__column--${status
              .toLowerCase()
              .replace(" ", "-")}`}
            aria-labelledby={`col-${status}`}
          >
            <header className="o-task-list__header">
              <h2 id={`col-${status}`} className="o-task-list__title">
                {status}
              </h2>
              <span className="o-task-list__count">
                {groups[status].length}
              </span>
            </header>

            <div
              className="o-task-list__cards"
              ref={(el) => {
                scrollers.current[status] = el;
              }}
            >
              {groups[status].map((t) => (
                <div key={t.id} className="o-task-list__item">
                  <Card {...t} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
