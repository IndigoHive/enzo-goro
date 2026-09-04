import type { RequestHandler } from 'express'
import type { Logger } from 'pino'

export function notFoundHandler(): RequestHandler {
  return (req, res, next) => {
    if (res.headersSent) {
      return next()
    }

    const logger: Logger = req.container.resolve('logger')
    logger.debug('Route not found')

    res.status(404).json({
      status: 404,
      message: 'Not Found'
    })
  }
}
