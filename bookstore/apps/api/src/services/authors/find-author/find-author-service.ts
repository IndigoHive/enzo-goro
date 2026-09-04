import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IAuthorsRepository } from '../../../repositories'
import type { Author } from '../../../types'

const schema = yup.number().integer().required()

export type FindAuthorServiceParams = {
  authorsRepository: IAuthorsRepository
  logger: Logger
}

export class FindAuthorService {
  private _authorsRepository: IAuthorsRepository
  private _logger: Logger

  constructor(params: FindAuthorServiceParams) {
    this._authorsRepository = params.authorsRepository
    this._logger = params.logger.child({ service: 'FindAuthorService' })
  }

  async find(authorId: number | string): Promise<Author> {
    const validateAuthorId = await schema.validate(authorId)

    const author = await this._authorsRepository.find(validateAuthorId)

    if (!author) {
      throw new createHttpError.NotFound(
        `Author with id '${authorId}' not found`
      )
    }

    return author
  }
}
