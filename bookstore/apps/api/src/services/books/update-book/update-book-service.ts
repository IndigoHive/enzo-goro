import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IBooksRepository } from '../../../repositories'
import type { Book } from '../../../types'

const schema = yup.object({
  authorId: yup.string().required(),
  title: yup.string().required()
})

const numberValidator = yup.number().required()

export type UpdateBookServiceParams = {
  booksRepository: IBooksRepository
  logger: Logger
}

export class UpdateBookService {
  private _booksRepository: IBooksRepository
  private _logger: Logger

  constructor(params: UpdateBookServiceParams) {
    this._booksRepository = params.booksRepository
    this._logger = params.logger.child({ service: 'UpdateBookService' })
  }

  async update(bookId: number | string, data: Omit<Book, 'id'>): Promise<Book> {
    const validateData = await schema.validate(data)

    const validateId = await numberValidator.validate(bookId)

    const book = await this._booksRepository.update(validateId, validateData)

    if (!book) {
      throw new createHttpError.NotFound(`Book with id '${bookId}' not found`)
    }

    this._logger.info(
      {
        id: book.id,
        authorId: book.authorId,
        title: book.title
      },
      'Book updated'
    )

    return book
  }
}
