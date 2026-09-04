import type { ErrorRequestHandler } from 'express'
import { isHttpError } from 'http-errors'
import type { Logger } from 'pino'

export function httpErrorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }

    if (isHttpError(err) && err.expose) {
      res.status(404).json({
        status: 404,
        message: err.message,
        errors: err.errors
      })
      const logger: Logger = req.container.resolve('logger')
      logger.debug(err, 'HttpError handled')
    }
  }
}
