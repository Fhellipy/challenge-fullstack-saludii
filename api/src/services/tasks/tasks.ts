
import type { Prisma } from '@prisma/client';
import { db } from 'src/lib';

export const tasks =  async ({ status }) => {
  let tasks = [];

  if (status === 'ALL') {
    tasks = await db.task.findMany();
  } else {
    tasks = await db.task.findMany({
      where: { status },
    });
  }

  const sortedTasks = [];

  const sortTasksRecursive = (task) => {
    sortedTasks.push(task);
    const dependentTasks = tasks.filter((t) => t.taskIdPrev === task.id);
    dependentTasks.forEach((t) => sortTasksRecursive(t));
  };

  const tasksWithNullPrev = tasks.filter((task) => task.taskIdPrev === null);
  tasksWithNullPrev.forEach((task) => sortTasksRecursive(task));

  return sortedTasks;
}

export const task = ({ id }: Prisma.TaskWhereUniqueInput) => {
  return db.task.findUnique({
    where: { id },
  })
}

interface CreateTaskArgs {
  input: Prisma.TaskCreateInput
}


export const createTask = ({ input }: CreateTaskArgs) => {
  return db.task.create({ data: input })
}


interface UpdateTaskArgs extends Prisma.TaskUpdateInput {
  id: Prisma.TaskWhereUniqueInput['id']
  input: Prisma.TaskUpdateInput
}


export const updateTask = ({ id, input }: UpdateTaskArgs) => {
  const findTask = db.task.findUnique({
    where: { id },
  })

  if (!findTask) {
    throw new Error('Tarefa não encontrada')
  }

  return db.task.update({
    where: { id },
    data: { ...input, updatedAt: new Date()},
  })
}

type UpdatePositionTasksArgs = {
  input: {
    tasks: {
      id: string;
      taskIdPrev: string | null;
    }[];
  };
};

export const updatePositionTasks = ({ input }: UpdatePositionTasksArgs) => {
  if(!input.tasks) {
    throw new Error('Tarefas não encontradas')
  }

  return Promise.all(
    input.tasks?.map((task) => {
      return db.task.update({
        where: { id: task.id },
        data: { taskIdPrev: task.taskIdPrev },
      })
    })
  )
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

