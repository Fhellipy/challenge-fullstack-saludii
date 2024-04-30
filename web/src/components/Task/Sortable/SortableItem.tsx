import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox, IconButton } from "@mui/material";
import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { TasksQuery } from "types/graphql";
import { Editor } from "../Editor/Editor";


type SortableItemProps = {
  task: TasksQuery['tasks'][number];
  handleCheckboxChange: (id: string, status: string) => void;
  handleDelete: (id: string) => void;
};

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);


export function SortableItem(props: SortableItemProps) {
  const { task, handleCheckboxChange, handleDelete } = props;

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

  //! Reordering will only be allowed when searching for all elements to avoid duplication of relationships between tasks
  const statusFilter = document.getElementById("demo-simple-select")?.innerText

  return (
    <li
      className="flex flex-col items-center gap-2 p-1 sm:p-2 border rounded-lg bg-muted shadow-custom"
      ref={setNodeRef}
      style={style}
    >
      <div className="w-full flex flex-col border-b p-2 justify-between sm:flex-row">
        <span className="w-full flex items-center justify-between sm:w-fit">
          {statusFilter === 'Todos' && (
            <button
               type="button"
               aria-label="Drag"
               {...handleProps}
               className="flex w-fit items-center justify-center rounded p-2 text-muted-foreground transition-all duration-300 hover:bg-muted-foreground/20"
               >
                 <GripVerticalIcon size={18} />
            </button>
            )}

          <IconButton aria-label="delete" onClick={() => handleDelete(task.id)}>
            <TrashIcon className="text-muted-foreground" size={20}/>
          </IconButton>
        </span>

        <span className="flex items-center whitespace-nowrap text-sm">
          <Checkbox id={task.id}
            defaultChecked={task.status === 'COMPLETED'}
            onChange={ev => {
              handleCheckboxChange(task.id, ev.target.checked ? 'COMPLETED' : 'PENDING')
            }}
          />
          <label htmlFor={task.id}>Marcar como Concluído</label>
        </span>
      </div>

      <Editor initialContent={task.description} />
    </li>
  )
}
