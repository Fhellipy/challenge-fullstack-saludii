import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { createServer } from 'http'
import { Server } from 'socket.io'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db, logger } from 'src/lib'
import { createTask, deleteTask, tasks, updatePositionTasks, updateTask } from 'src/services'

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)

  socket.on('getTasks', async (status) => {
    const allTasks = await tasks({ status })
    socket.emit('allTask', allTasks)
  })

  socket.on('createTask', async (task) => {
    await createTask({ input: task.input })

    const allTasks = await tasks({ status: 'ALL' })
    socket.emit('allTask', allTasks)
    socket.broadcast.emit('allTask', allTasks)
  })

  socket.on('updateTask', async (task) => {
    await updateTask({ id: task.id, input: task.input })

    const allTasks = await tasks({ status: 'ALL' })
    socket.emit('allTask', allTasks)
    socket.broadcast.emit('allTask', allTasks)
  })

  socket.on('updatePositionTasks', async (input) => {
    await updatePositionTasks({ input })

    const allTasks = await tasks({ status: 'ALL' })
    socket.emit('allTask', allTasks)
    socket.broadcast.emit('allTask', allTasks)
  })

  socket.on('deleteTask', async (id) => {
    await deleteTask({ id })

    const allTasks = await tasks({ status: 'ALL' })
    socket.emit('allTask', allTasks)
    socket.broadcast.emit('allTask', allTasks)
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })
})

server.listen(3000, () => {
  console.log('Socket server running on port 3000');
});


export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  cors: {
    origin: '*',
    credentials: true,

  },
  onException: () => {
    db.$disconnect()
  },
})

export default server
