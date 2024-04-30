import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
    task: {
      one:{
        data :{
          id: "2b15ecdf-4757-4437-b2df-60bba0973206",
          title: "teste",
          description: "teste",
          status: "PENDING",
          createdAt: "2024-04-26T13:49:15.880Z",
          updatedAt: "2024-04-26T13:49:15.880Z",
          taskIdPrev: null
        }
      },
      two: {
        data: {
          id: "2383037b-486f-449a-bd55-f0cffb91acae",
          title: "teste",
          description: "teste",
          status: "PENDING",
          createdAt: "2024-04-26T13:49:16.821Z",
          updatedAt: "2024-04-26T13:49:16.821Z",
          taskIdPrev: "2b15ecdf-4757-4437-b2df-60bba0973206",
        }
      },
      tree :{
        data :{
          id: "5a4c0a3e-925a-4872-957b-9bd8e3839bd5",
          title: "teste",
          description: "teste",
          status: "PENDING",
          createdAt: "2024-04-26T13:49:17.507Z",
          updatedAt: "2024-04-26T13:49:17.507Z",
          taskIdPrev: "2383037b-486f-449a-bd55-f0cffb91acae",
        }
      }
    },
})

export type StandardScenario = typeof standard
