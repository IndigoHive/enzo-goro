import type { ErrorRequestHandler } from 'express'
import type { Logger } from 'pino'

export function fallbackErrorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }

    const logger: Logger = req.container.resolve('logger')
    logger.error(err, 'Internal server error')

    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}
