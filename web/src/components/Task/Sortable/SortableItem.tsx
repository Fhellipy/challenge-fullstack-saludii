import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import { TaskItem } from "./Sortable";


type SortableItemProps = {
  task: TaskItem;
};

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);


export function SortableItem({ task }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id, animateLayoutChanges });

  const style = {
    transform: CSS.Transform .toString(transform),
    transition,
  };

  const handleProps = {
    ...attributes,
    ...listeners,
  };

  return (
    <li
      className="flex items-center gap-2 p-2 border rounded bg-white shadow-sm"
      ref={setNodeRef}
      style={style}
    >
      <div>
        <button
          type="button"
          aria-label="Drag"
          {...handleProps}
          className="flex w-full items-center justify-center rounded p-2 text-gray-500 transition-all duration-300 hover:bg-primary/50"
        >
            <GripVerticalIcon size={16} />
        </button>
      </div>

      {task.title}
    </li>
  )
}
