import { CellFailureProps, CellSuccessProps, TypedDocumentNode, useMutation } from '@redwoodjs/web';
import { CircleAlertIcon } from 'lucide-react';
import type { TasksQuery, TasksQueryVariables } from 'types/graphql';
import { Sortable } from '../Sortable/Sortable';


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
      taskIdPrev
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask(
    $id: String!
    $input: UpdateTaskInput!
  ) {
    updateTask(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_POSITION_TASKS = gql`
  mutation updatePositionTasks(
    $input: UpdatePositionTasksInput!
  ) {
    updatePositionTasks(input: $input) {
      id
      taskIdPrev
    }
  }
`

const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`


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
  const [updateTask] = useMutation(UPDATE_TASK)
  const [updatePositionTasks] = useMutation(UPDATE_POSITION_TASKS)

  const [deleteTask] = useMutation(DELETE_TASK)

  const handleCheckboxChange = (id: string, status: string) => {
    updateTask({
      variables: {
        id,
        input: { status }
      }
    })
  }

  const handleUpdatePositionTasks = (tasks: { id: string, taskIdPrev: string | null }[]) => {
    updatePositionTasks({
      variables: {
        input: {
          tasks
        }
      }
    })
  }

  const handleDelete = (id: string) => {
    deleteTask({ variables: { id } })
  }

  return (
    <Sortable
      tasks={tasks}
      handleCheckboxChange={handleCheckboxChange}
      handleDelete={handleDelete}
      handleUpdatePositionTasks={handleUpdatePositionTasks}
    />)
};

