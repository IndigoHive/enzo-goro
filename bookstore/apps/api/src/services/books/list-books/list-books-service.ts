import type { Logger } from 'pino'
import type { IBooksRepository } from '../../../repositories'
import type { Book } from '../../../types'

export type ListBooksServiceParams = {
  booksRepository: IBooksRepository
  logger: Logger
}

export class ListBooksService {
  private _booksRepository: IBooksRepository
  private _logger: Logger

  constructor(params: ListBooksServiceParams) {
    this._booksRepository = params.booksRepository
    this._logger = params.logger
  }

  async list(): Promise<Book[]> {
    const books = await this._booksRepository.list()

    this._logger.info(`Listed %d books`, books.length)

    return books
  }
}
