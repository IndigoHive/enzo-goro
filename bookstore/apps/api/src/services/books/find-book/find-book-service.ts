import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IBooksRepository } from '../../../repositories'
import type { Book } from '../../../types'

const schema = yup.number().integer().required()

export type FindBookServiceParams = {
  booksRepository: IBooksRepository
  logger: Logger
}

export class FindBookService {
  private _booksRepository: IBooksRepository
  private _logger: Logger

  constructor(params: FindBookServiceParams) {
    this._booksRepository = params.booksRepository
    this._logger = params.logger.child({ service: 'FindBookService' })
  }

  async find(bookId: number | string): Promise<Book> {
    const validateBookId = await schema.validate(bookId)

    const book = await this._booksRepository.find(validateBookId)

    if (!book) {
      throw new createHttpError.NotFound(`Book with id '${bookId}' not found`)
    }

    this._logger.info('Book found!')

    return book
  }
}
