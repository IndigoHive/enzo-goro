import type { AwilixContainer } from 'awilix'
import { asFunction } from 'awilix'
import type { RequestHandler } from 'express'
import type { ContainerServices } from '../../container'
import { logger } from '../../logger'

/**
 * Creates a scoped container and sets to req.container.
 */
export function awilixContainer(
  container: AwilixContainer<ContainerServices>
): RequestHandler {
  return (req, _res, next) => {
    req.container = container.createScope()
    req.container.register({
      logger: asFunction(() =>
        logger.child({
          requestId: req.id,
          method: req.method,
          url: req.originalUrl
        })
      ).scoped()
    })
    next()
  }
}
