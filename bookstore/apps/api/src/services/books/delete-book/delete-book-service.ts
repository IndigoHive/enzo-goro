import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IBooksRepository } from '../../../repositories'

export type DeleteBookServiceParams = {
  booksRepository: IBooksRepository
  logger: Logger
}

const schema = yup.number().integer().required()

export class DeleteBookService {
  private _booksRepository: IBooksRepository
  private _logger: Logger

  constructor(params: DeleteBookServiceParams) {
    this._booksRepository = params.booksRepository
    this._logger = params.logger
  }

  async delete(bookId: number | string): Promise<void> {
    const validatedData = await schema.validate(bookId)

    const book = await this._booksRepository.find(validatedData)

    if (!book) {
      throw new createHttpError.NotFound(`Book with id '${bookId}' not found`)
    }

    this._booksRepository.delete(validatedData)

    this._logger.info({ book }, 'Author was deleted')

    return Promise.resolve()
  }
}
