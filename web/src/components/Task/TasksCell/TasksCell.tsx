import { CellFailureProps, CellSuccessProps, TypedDocumentNode } from '@redwoodjs/web';
import { CircleAlertIcon } from 'lucide-react';
import { useState } from 'react';
import { socket } from 'src/lib';
import type { CreateTaskInput, TasksQuery, TasksQueryVariables, UpdateTaskInput } from 'types/graphql';
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

export const Loading = () => (
  <div className="z-50 flex h-full w-full flex-col items-center justify-center">
    <div  className='inline-block animate-spin rounded-full border-blue-600 border-b-transparent h-14 w-14 border-[5px]'/>
  </div>
)

export const Failure = ({ error }: CellFailureProps<TasksQueryVariables>) => (
  <div className='flex flex-col gap-2 items-center h-full justify-center text-destructive'>
    <CircleAlertIcon className='w-16 h-16' />
    <div className='font-black'>{error.message}</div>
  </div>
);

export const Success = ({ tasks }: CellSuccessProps<TasksQuery, TasksQueryVariables>) => {
  const [allTasks, setAllTasks] = useState(tasks)

  const handleCreateTask = (input: CreateTaskInput) => {
    socket.emit('createTask', { input })
  }

  const handleUpdateTask = (id: string, input: UpdateTaskInput, emitForMe?: boolean) => {
    socket.emit('updateTask', { id, input, emitForMe })
  }

  const handleUpdatePositionTasks = (tasks: { id: string, taskIdPrev: string | null }[]) => {
     socket.emit('updatePositionTasks', tasks)
  }

  const handleDelete = (id: string) => {
    socket.emit('deleteTask', id)
  }

  socket.on('allTask', allTasks => {
    setAllTasks(allTasks)
  })

  return (
    <Sortable
      tasks={allTasks}
      handleUpdateTask={handleUpdateTask}
      handleDelete={handleDelete}
      handleUpdatePositionTasks={handleUpdatePositionTasks}
      handleCreateTask={handleCreateTask}
    />)
};

