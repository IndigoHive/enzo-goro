import express, { type Express } from 'express'
import { createContainer } from './container'
import {
  fallbackErrorHandler,
  httpErrorHandler,
  notFoundHandler,
  requestId,
  yupErrorHandler
} from './middlewares'
import { awilixContainer } from './middlewares/awilix/awilix-container'
import { authorsRouter, healthRouter } from './routers'

export function createApp(): Express {
  const container = createContainer()

  const app = express()
  app.disable('x-powered-by')
  app.disable('etag')

  app.use(express.json())

  app.use(requestId())

  app.use(awilixContainer(container))

  app.use(healthRouter())
  app.use(authorsRouter())

  app.use(notFoundHandler())
  app.use(yupErrorHandler())
  app.use(httpErrorHandler())
  app.use(fallbackErrorHandler())

  return app
}
