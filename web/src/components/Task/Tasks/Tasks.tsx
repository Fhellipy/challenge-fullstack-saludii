import { TasksQuery } from "types/graphql";

export default function TasksList({ tasks }: TasksQuery) {
  return (
    <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
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
