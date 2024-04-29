export const schema = gql`
  type Task {
    id: String!
    title: String!
    description: String!
    status: TaskStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
    prevPosition: String
  }

  enum TaskStatus {
    PENDING
    COMPLETED
    ALL
  }

  type Query {
    tasks(status: TaskStatus!): [Task!] @skipAuth
    task(id: String!): Task @skipAuth
  }

  input CreateTaskInput {
    title: String!
    description: String!
    prevPosition: String
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: TaskStatus
    prevPosition: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: String!, input: UpdateTaskInput!): Task! @skipAuth
    deleteTask(id: String!): Task @skipAuth
  }
`;
