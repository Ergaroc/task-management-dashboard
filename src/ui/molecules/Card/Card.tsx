import type { Task } from "@/types";
import "./card.scss";
import { useNavigate } from "react-router";
import {
  ChevronDownDouble,
  ChevronSelectorHorizontal,
  ChevronUpDouble,
} from "@/icons/components";
import { formatDate } from "@/utils";

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
        <p className="m-card__description--no-details">
          This task has no description or due date.
        </p>
      ) : (
        <>
          <p className="m-card__description">
            {description ?? "No description provided."}
          </p>
          <footer className="m-card__footer">
            <p className="m-card__due-date">
              {dueDate ? formatDate(dueDate) : "No due date set"}
            </p>
          </footer>
        </>
      )}
    </button>
  );
};
