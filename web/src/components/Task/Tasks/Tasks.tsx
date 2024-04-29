import { TasksQuery } from "types/graphql";

export default function TasksList({ tasks }: TasksQuery) {
  return (
    <ul className="flex flex-col gap-1 prose">
        {tasks?.map((task) => (
          <li key={task.id} className="border p-2">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.createdAt}</p>
            <p>{task.updatedAt}</p>
          </li>
        ))}
      </ul>
  )
};
