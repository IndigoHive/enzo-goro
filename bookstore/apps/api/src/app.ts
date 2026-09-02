import express, { type Express } from 'express'
import { healthRouter } from './routers/health-router'

export function createApp(): Express {
  const app = express()
  app.disable('x-powered-by')
  app.disable('etag')

  app.use(healthRouter()) // Configura o Router no Express

  return app
}
