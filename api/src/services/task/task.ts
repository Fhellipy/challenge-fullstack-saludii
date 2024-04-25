
import type { Prisma } from '@prisma/client'
import { db } from 'src/lib'

export const tasks = () => {
  return db.tasks.findMany()
}

interface CreateTaskArgs {
  input: Prisma.CreateTaskInput
}


export const createTask = ({ input }: CreateTaskArgs) => {
  return db.tasks.create({ data: input })
}

export const findByStatus = ({ status }) => {
  return db.tasks.findMany({
    where: { status },
  })
}

interface UpdateTaskArgs extends Prisma.TaskWhereUniqueInput {
  input: Prisma.UpdateTaskInput
}


export const updateTask = ({ id, status }: UpdateTaskArgs) => {
  return db.tasks.update({
    where: { id },
    data: { status },
  })
}


export const deleteTask = ({ id }) => {
  return db.tasks.delete({
    where: { id },
  })
}

