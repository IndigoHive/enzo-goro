import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IAuthorsRepository } from '../../../repositories'

const schema = yup.number().required()

export type DeleteAuthorServiceParams = {
  authorsRepository: IAuthorsRepository
  logger: Logger
}

export class DeleteAuthorService {
  private _authorsRepository: IAuthorsRepository
  private _logger: Logger

  constructor(params: DeleteAuthorServiceParams) {
    this._authorsRepository = params.authorsRepository
    this._logger = params.logger
  }

  async delete(authorId: number | string) {
    const validateId = await schema.validate(authorId)

    const author = await this._authorsRepository.find(validateId)

    if (!author) {
      throw new createHttpError.NotFound(
        `Author with id '${authorId}' not found`
      )
    }

    this._authorsRepository.delete(validateId)

    this._logger.info({ author }, 'Author was deleted')
  }
}
