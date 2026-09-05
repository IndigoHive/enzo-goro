import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IBooksRepository } from '../../../repositories'
import type { Book } from '../../../types'

const schema = yup.object({
  authorId: yup.string().required(),
  title: yup.string().required()
})

export type CreateBookServiceParams = {
  booksRepository: IBooksRepository
  logger: Logger
}

export class CreateBookService {
  private _booksRepository: IBooksRepository
  private _logger: Logger

  constructor(params: CreateBookServiceParams) {
    this._booksRepository = params.booksRepository
    this._logger = params.logger
  }

  async create(data: Omit<Book, 'id'>): Promise<Book> {
    const validateData = await schema.validate(data)

    const book = await this._booksRepository.create(validateData)

    this._logger.info({ book }, 'Book created')

    return book
  }
}
