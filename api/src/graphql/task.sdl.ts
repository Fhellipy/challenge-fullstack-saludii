export const schema = gql`
  type Task {
    id: String!
    title: String!
    description: String!
    status: TaskStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum TaskStatus {
    PENDING
    COMPLETED
  }

  type Query {
    tasks: [Task!]!
    tasksByStatus(status: TaskStatus!): [Task!]!
  }

  input CreateTaskInput {
    title: String!
    description: String!
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: String!, input: UpdateTaskInput!): Task!
    deleteTask(id: String!): Task!
  }
`;
