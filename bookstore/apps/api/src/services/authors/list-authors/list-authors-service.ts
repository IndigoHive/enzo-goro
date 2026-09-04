import type { Logger } from 'pino'
import type { IAuthorsRepository } from '../../../repositories'
import type { Author } from '../../../types'

export type ListAuthorServiceParams = {
  authorsRepository: IAuthorsRepository
  logger: Logger
}

export class ListAuthorsService {
  private _authorsRepository: IAuthorsRepository
  private _logger: Logger

  constructor(params: ListAuthorServiceParams) {
    this._authorsRepository = params.authorsRepository
    this._logger = params.logger
  }

  async list(): Promise<Author[]> {
    const authors = await this._authorsRepository.list()

    this._logger.info(`Listed %d authors`, authors.length)

    return authors
  }
}
