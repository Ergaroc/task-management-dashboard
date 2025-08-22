// Libraries
import { useNavigate } from "react-router";
// Icons
import {
  ChevronDownDouble,
  ChevronSelectorHorizontal,
  ChevronUpDouble,
  Drag,
} from "@/icons/components";
// Interfaces
import type { Task } from "@/interfaces";
// Utils
import { formatDate } from "@/utils";
// Styles
import "./card.scss";

export const Card = ({ id, title, description, dueDate, priority }: Task) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tasks/${id}`);
  };

  const priorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return (
          <ChevronUpDouble
            data-tooltip-id="priority-tooltip"
            data-tooltip-content="High Priority"
            data-tooltip-place="top"
          />
        );
      case "Medium":
        return (
          <ChevronSelectorHorizontal
            data-tooltip-id="priority-tooltip"
            data-tooltip-content="Medium Priority"
            data-tooltip-place="top"
          />
        );
      case "Low":
        return (
          <ChevronDownDouble
            data-tooltip-id="priority-tooltip"
            data-tooltip-content="Low Priority"
            data-tooltip-place="top"
          />
        );
      default:
        return null;
    }
  };
  return (
    <button
      className={`m-card--${priority.toLowerCase()}`}
      onClick={handleCardClick}
    >
      <span className="m-card__drag-icon">
        <Drag />
      </span>
      <header className="m-card__header">
        <h3 className="m-card__title">{title}</h3>
        <span
          className={`m-card__priority--${priority.toLowerCase()}`}
          title={`Priority: ${priority}`}
        >
          {priorityIcon(priority)}
        </span>
      </header>
      {!description && !dueDate ? (
        <p
          className="m-card__description--no-details"
          title="This task has no description or due date."
        >
          This task has no description or due date.
        </p>
      ) : (
        <>
          <p
            className="m-card__description"
            title={description ?? "No description provided."}
          >
            {description ?? "No description provided."}
          </p>
          <footer className="m-card__footer">
            <p
              className="m-card__due-date"
              title={dueDate ? formatDate(dueDate) : "No due date set"}
            >
              {dueDate ? formatDate(dueDate) : "No due date set"}
            </p>
          </footer>
        </>
      )}
    </button>
  );
};
