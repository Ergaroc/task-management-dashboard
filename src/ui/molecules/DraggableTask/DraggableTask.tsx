// Dnd
import { useDraggable } from "@dnd-kit/core";
// Components
import { Card } from "../Card/Card";
// Interfaces
import type { Task } from "@/interfaces";

export const DraggableTask = ({ task }: { readonly task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
    });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`m-draggable-task ${
        isDragging ? "m-draggable-task--dragging" : ""
      }`}
      aria-roledescription="Draggable task card"
    >
      <Card {...task} />
    </div>
  );
};
