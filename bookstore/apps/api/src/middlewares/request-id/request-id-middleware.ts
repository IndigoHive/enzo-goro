import { randomUUID } from 'node:crypto'
import type { RequestHandler } from 'express'

export function requestId(): RequestHandler {
  return (req, res, next) => {
    req.id = randomUUID()
    res.setHeader('X-Request-Id', req.id)
    next()
  }
}
