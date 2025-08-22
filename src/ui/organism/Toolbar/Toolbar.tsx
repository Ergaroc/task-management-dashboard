// Atoms
import { Button } from "@/ui/atoms";
// Types
import type { TaskPriority, TaskSort, TaskStatus } from "@/types";
// Icons
import { Download, PlusLarge } from "@/icons/components";
// Styles
import "./toolbar.scss";

interface ToolbarProps {
  onCreateTask: () => void;
  priority?: TaskPriority | "";
  status?: TaskStatus | "";
  sortField?: TaskSort | "";
  sortOrder?: "asc" | "desc";
  onPriorityChange?: (newPriority: TaskPriority | "") => void;
  onStatusChange?: (newStatus: TaskStatus | "") => void;
  onSortFieldChange?: (value: TaskSort | "") => void;
  onSortOrderChange?: (value: "asc" | "desc") => void;
  onExportAll?: () => void;
  pending?: boolean;
}

export const Toolbar = ({
  onCreateTask,
  priority = "",
  status = "",
  sortField = "title",
  sortOrder = "asc",
  onPriorityChange,
  onStatusChange,
  onSortFieldChange,
  onSortOrderChange,
  onExportAll,
  pending,
}: ToolbarProps) => {
  return (
    <section className="o-toolbar container" aria-label="Task controls">
      <div className="o-toolbar__group o-toolbar__group--primary">
        <Button
          variant="blue"
          type="button"
          className="o-toolbar__btn o-toolbar__btn--primary"
          onClick={onCreateTask}
          leftIcon={<PlusLarge />}
          disabled={pending}
        >
          Create task
        </Button>

        <Button
          variant="blue"
          type="button"
          className="o-toolbar__btn o-toolbar__btn--primary"
          onClick={onExportAll ?? (() => {})}
          leftIcon={<Download />}
          disabled={pending}
        >
          Export CSV
        </Button>
      </div>

      <div className="o-toolbar__group">
        <label className="o-toolbar__label" htmlFor="filter-priority">
          Priority
        </label>
        <select
          id="filter-priority"
          className="o-toolbar__select"
          value={priority}
          onChange={(e) =>
            onPriorityChange?.(e.target.value as TaskPriority | "")
          }
          disabled={pending}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="o-toolbar__group">
        <label className="o-toolbar__label" htmlFor="filter-status">
          Status
        </label>
        <select
          id="filter-status"
          className="o-toolbar__select"
          value={status}
          onChange={(e) => onStatusChange?.(e.target.value as TaskStatus | "")}
          disabled={pending}
        >
          <option value="">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="o-toolbar__group">
        <label className="o-toolbar__label" htmlFor="sort-field">
          Sort by
        </label>
        <select
          id="sort-field"
          className="o-toolbar__select"
          value={sortField}
          onChange={(e) =>
            onSortFieldChange?.(
              e.target.value as "priority" | "dueDate" | "title"
            )
          }
          disabled={pending}
        >
          <option value="title">Title</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div className="o-toolbar__group o-toolbar__group--compact">
        <span className="o-toolbar__label">Order</span>
        <div className="o-toolbar__segmented" aria-label="Sort order">
          <button
            type="button"
            className="o-toolbar__chip"
            aria-pressed={sortOrder === "asc"}
            onClick={() => onSortOrderChange?.("asc")}
            disabled={pending}
          >
            Asc
          </button>
          <button
            type="button"
            className="o-toolbar__chip"
            aria-pressed={sortOrder === "desc"}
            onClick={() => onSortOrderChange?.("desc")}
            disabled={pending}
          >
            Desc
          </button>
        </div>
      </div>
    </section>
  );
};
