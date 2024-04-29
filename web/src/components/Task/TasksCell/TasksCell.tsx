import { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web';
import { CircleAlertIcon } from 'lucide-react';
import Tasks from 'src/components/Task/Tasks';
import type { TasksQuery, TasksQueryVariables } from 'types/graphql';


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

export const Loading = () => (
  <div className="z-50 flex h-full w-full flex-col items-center justify-center">
    <div  className='inline-block animate-spin rounded-full border-blue-600 border-b-transparent h-14 w-14 border-[5px]'/>
  </div>
)


export const Empty = () => (
  <div className='flex flex-col gap-2 items-center h-full justify-center text-orange-600'>
    <CircleAlertIcon className='w-16 h-16' />
    <div className='font-black'>Nenhuma tarefa encontrada</div>
  </div>
)

export const Failure = ({ error }: CellFailureProps<TasksQueryVariables>) => (
  <div className='flex flex-col gap-2 items-center h-full justify-center text-destructive'>
    <CircleAlertIcon className='w-16 h-16' />
    <div className='font-black'>{error.message}</div>
  </div>
);

export const Success = ({ tasks }: CellSuccessProps<TasksQuery, TasksQueryVariables>) => {

  console.log("tasks", tasks);

  return (
    <div className='h-full'>
      <h2>TaskList</h2>

      <Tasks tasks={tasks} />
    </div>
  );
};

