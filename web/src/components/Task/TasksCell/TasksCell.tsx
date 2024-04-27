
import { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web';
import type { TasksQuery, TasksQueryVariables } from 'types/graphql';
import Tasks from '@components/Task/Tasks';

export const QUERY:TypedDocumentNode<
  TasksQuery,
  TasksQueryVariables
> = gql`
  query TasksQuery($status: TaskStatus!) {
    tasks(status: $status) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Tasks not found</div>;

export const Failure = ({ error }: CellFailureProps<TasksQueryVariables>) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ tasks }: CellSuccessProps<TasksQuery, TasksQueryVariables>) => {

  console.log("tasks", tasks);

  return (
    <div>
      <h2>TaskList</h2>

      <Tasks tasks={tasks} />
    </div>
  );
};

