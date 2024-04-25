import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db, logger } from 'src/lib'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  sdls,
  services,
  onException: () => {
    db.$disconnect()
  },
})
