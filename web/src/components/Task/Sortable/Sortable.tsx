import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CircleAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CreateTaskInput, TasksQuery, UpdateTaskInput } from "types/graphql";
import { SortableItem } from "./SortableItem";

type SortableProps = {
  tasks: TasksQuery['tasks'];
  handleCreateTask: (input: CreateTaskInput) => void;
  handleUpdateTask: (id: string, input: UpdateTaskInput, emitForMe?: boolean) => void;
  handleUpdatePositionTasks: (tasks: {id: string, taskIdPrev: string}[]) => void;
  handleDelete: (id: string) => void;
};

export function Sortable(props: SortableProps) {
  const {
     tasks = [],
     handleUpdateTask,
     handleUpdatePositionTasks,
     handleDelete,
     handleCreateTask
    } = props;

  const [items, setItems] = useState(tasks);
  const [sortableIds, setSortableIds] = useState(
    items.map(item => item.id as UniqueIdentifier),
  );

  const [activeItem, setActiveItem] = useState<TasksQuery['tasks'][number]>();


  useEffect(() => {
    setItems(tasks);
    setSortableIds(tasks.map(item => item.id as UniqueIdentifier));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);

      // Reorder items
      const newItems = arrayMove(items, activeIndex, overIndex)

      newItems[activeIndex] = {
        ...newItems[activeIndex],
        taskIdPrev: activeIndex === 0 ? null : newItems[activeIndex - 1].id
      }

      newItems[overIndex] = {
        ...newItems[overIndex],
        taskIdPrev: overIndex === 0 ? null : newItems[overIndex - 1].id
      }

      if(newItems[overIndex + 1]) {
        newItems[overIndex + 1] = {
          ...newItems[overIndex + 1],
          taskIdPrev: newItems[overIndex].id
        }
      }

      if(newItems[activeIndex + 1]) {
        newItems[activeIndex + 1] = {
          ...newItems[activeIndex + 1],
          taskIdPrev: newItems[activeIndex].id
        }
      }

      // Check which items have been updated
      const activeItem = newItems[activeIndex];
      const overItem = newItems[overIndex];

      const itemsUpdated = [
        {id: activeItem.id, taskIdPrev: activeItem.taskIdPrev},
        {id: overItem.id, taskIdPrev: overItem.taskIdPrev}
      ].filter(Boolean);

      const nextOverItem = newItems[overIndex + 1];
      if(nextOverItem && !itemsUpdated.find(item => item.id === nextOverItem.id)) {
        itemsUpdated.push({id: nextOverItem.id, taskIdPrev: nextOverItem.taskIdPrev});
      }


      const nextActiveItem = newItems[activeIndex + 1];
      if(nextActiveItem && !itemsUpdated.find(item => item.id === nextActiveItem.id)) {
        itemsUpdated.push({id: nextActiveItem.id, taskIdPrev: nextActiveItem.taskIdPrev});
      }

      handleUpdatePositionTasks(itemsUpdated);

      setSortableIds(newItems.map(item => item.id as UniqueIdentifier));
      setItems(newItems);
      setActiveItem(undefined);
    }
  }

  function handleDragStart({ active: { id } }: DragStartEvent) {
    const item = items.find(item => item.id === id);

    setActiveItem(item);
  }

  const lastItem = items[items.length - 1];


  const scrollToBottom = () => {
    const element = document.querySelector('ul');
    if(element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
       <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
       >
         <ul className="flex flex-col gap-4 h-full p-3 overflow-auto scroll-smooth">
           {items.map((item) => (
             <SortableItem
              key={item.id}
              task={item}
              handleUpdateTask={handleUpdateTask}
              handleDelete={handleDelete}
             />
           ))}

           {items.length === 0 && (
               <div className='flex flex-col gap-2 items-center h-full justify-center text-emerald-500'>
               <CircleAlertIcon className='w-16 h-16' />
               <div className='font-black'>Nenhuma tarefa encontrada</div>
             </div>
          )}
         </ul>

         <button
          className="bg-primary text-card p-2 rounded-md font-black"
          onClick={() => {
            handleCreateTask({ title: '' , description: '', taskIdPrev: lastItem?.id || null })
            scrollToBottom();
          }}>
           Adicionar Tarefa
          </button>
       </SortableContext>

       {createPortal(
          <DragOverlay>
            {activeItem && (
               <SortableItem
                task={activeItem}
                handleUpdateTask={handleUpdateTask}
                handleDelete={handleDelete}
               />
            )}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  )
}
