import { DndContext, DragEndEvent, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { TasksQuery } from "types/graphql";
import { SortableItem } from "./SortableItem";

type SortableProps = {
  data: TasksQuery['tasks'];
};

export function Sortable({ data = []}: SortableProps) {
  const [items, setItems] = useState(data);
  const [sortableIds, setSortableIds] = useState(
    items.map(item => item.id as UniqueIdentifier),
  );

  useEffect(() => {
    setItems(data);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );


  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {}
  }

  function handleDragStart({ active: { id } }: DragStartEvent) {}


  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      // onDragMove={() => {
      //   setSortableIds(items.map(item => item.id as UniqueIdentifier));
      // }}
    >
       <SortableContext
          items={sortableIds}
          strategy={verticalListSortingStrategy}
       >
         <ul
            className="flex flex-col gap-1"
         >
           {items.map((item) => (
             <SortableItem key={item.id} task={item} />
           ))}
         </ul>
       </SortableContext>
    </DndContext>
  )
}
