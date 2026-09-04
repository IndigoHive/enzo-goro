import { Router } from 'express'

export function healthRouter() {
  const router = Router()

  router.get('/health', (_req, res) => {
    res.status(200).send('Healthy')
  })

  return router
}
