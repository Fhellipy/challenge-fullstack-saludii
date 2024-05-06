import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox, IconButton } from "@mui/material";
import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { TasksQuery, UpdateTaskInput } from "types/graphql";
import { Editor } from "../Editor/Editor";


type SortableItemProps = {
  task: TasksQuery['tasks'][number];
  handleUpdateTask: (id: string, input: UpdateTaskInput) => void;
  handleDelete: (id: string) => void;
};

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);


export function SortableItem(props: SortableItemProps) {
  const { task, handleUpdateTask, handleDelete } = props;

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
        <span className="w-full flex items-center justify-between">
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

          <Editor
             initialContent={task.title}
             placeholder="Adicione um título"
             onChange={(content) => {
               const input: UpdateTaskInput = {
                 title: content
               }

               handleUpdateTask(task.id, input)
             }}
           />

        </span>

        <span className="flex items-center whitespace-nowrap text-sm">
          <Checkbox id={task.id}
            checked={task.status === 'COMPLETED'}
            onChange={ev => {
              const input: UpdateTaskInput = {
                status: ev.target.checked ? 'COMPLETED' : 'PENDING'
              }

              handleUpdateTask(task.id, input)
            }}
          />
          <label htmlFor={task.id} className="truncate">
            Marcar como concluída
          </label>
        </span>
      </div>

      <Editor
        initialContent={task.description}
        placeholder="Adicione uma descrição"
        onChange={(content) => {
          const input: UpdateTaskInput = {
            description: content
          }

          handleUpdateTask(task.id, input)
        }}
      />
    </li>
  )
}
