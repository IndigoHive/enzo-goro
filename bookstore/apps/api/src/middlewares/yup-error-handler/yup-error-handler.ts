import type { ErrorRequestHandler } from 'express'
import type { Logger } from 'pino'
import { ValidationError } from 'yup'

export function yupErrorHandler(): ErrorRequestHandler {
  return (err, req, res, next) => {
    // Caso os headers já tenham sido enviados, provavelmente o status code
    // já foi respondido, e nada podemos fazer
    if (res.headersSent) {
      return next(err)
    }

    // Caso o erro não seja um erro de validação do yup,
    // passamos ao próximo middleware
    if (!(err instanceof ValidationError)) {
      return next(err)
    }

    // Aqui, temos um erro de validação do yup.
    // Respondemos com 400 Bad Request e adicionamos detalhes dos erros
    res.status(400).json({
      status: 400,
      message: err.message,
      errors: err.errors
    })
    const logger: Logger = req.container.resolve('logger')
    logger.debug(err, 'Yup ValidationError handled')
  }
}
