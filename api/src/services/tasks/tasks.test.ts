import { createTask, deleteTask, task, tasks, updateTask } from './tasks'
import { StandardScenario } from './tasks.scenarios'


describe('tasks', () => {
  scenario('returns all tasks', async (scenario: StandardScenario) => {
    const result = await tasks({ status: 'ALL' })

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario: StandardScenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('creates a task', async () => {
    const result = await createTask({
      input: {
        title: "teste",
        description: "teste",
      },
    })

    expect(result.title).toEqual('teste')
    expect(result.description).toEqual('teste')
    expect(result.status).toEqual('PENDING')
    expect(result.createdAt).toEqual('2024-04-26T13:49:15.880Z')
    expect(result.updatedAt).toEqual('2024-04-26T13:49:15.880Z')
  })

  scenario('updates a task', async (scenario: StandardScenario) => {
    const result = await updateTask({
      id: scenario.task.one.id,
      input: {
        title: "New title here",
        description: "New description here",
        status: "COMPLETED"
       },
    })

    expect(result.title).toEqual('New title here')
    expect(result.description).toEqual('New description here')
    expect(result.status).toEqual('COMPLETED')
  })

  scenario('deletes a task', async (scenario: StandardScenario) => {
    const result = await deleteTask({ id: scenario.task.one.id })

    expect(result.id).toEqual("2b15ecdf-4757-4437-b2df-60bba0973206")
    expect(result.title).toEqual('teste')
    expect(result.description).toEqual('teste')
    expect(result.status).toEqual('PENDING')
    expect(result.createdAt).toEqual('2024-04-26T13:49:15.880Z')
    expect(result.updatedAt).toEqual('2024-04-26T13:49:15.880Z')
  })
})
