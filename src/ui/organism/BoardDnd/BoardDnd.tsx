// Dnd
import { DndContext, DragOverlay } from "@dnd-kit/core";
// Molecules
import { ColumnDnd, DraggableTask } from "@/ui/molecules";
// Constants
import { STATUSES } from "@/constants";
// Interfaces
import type { Task } from "@/interfaces";
// Hooks
import { useBoardDnd } from "@/hooks";
// Styles
import "./board-dnd.scss";

type Props = {
  readonly tasks: Task[];
  readonly setTasks: (t: Task[]) => void;
};
export const BoardDnd = ({ tasks, setTasks }: Props) => {
  const {
    sensors,
    groups,
    onDragStart,
    onDragEnd,
    activeTask,
    collisionDetection,
  } = useBoardDnd(tasks, setTasks);

  return (
    <div className="o-board-dnd container">
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="o-board-dnd__grid">
          {STATUSES.map((s) => (
            <ColumnDnd
              key={s}
              status={s}
              tasks={groups[s]}
              renderTask={(t) => <DraggableTask key={t.id} task={t} />}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="o-board-dnd__card-overlay">
              <DraggableTask task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
