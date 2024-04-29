import { Prisma } from '@prisma/client'
import { db } from 'api/src/lib'



export default async () => {
    try {
      const data: Prisma.TaskCreateArgs['data'][] = []
      console.log(
        "\nUsing the default './scripts/seed.ts' template\nEdit the file to add seed data\n"
      )

      if ((await db.task.count()) === 0) {
        await Promise.all(
          data.map(async (data: Prisma.TaskCreateArgs['data']) => {
            const record = await db.task.create({ data })
            console.log(record)
          })
        )
      } else {
        console.log('Tasks already seeded')
      }
  }  catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
