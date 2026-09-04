import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IAuthorsRepository } from '../../../repositories'
import type { Author } from '../../../types'

const schema = yup.object({
  name: yup.string().required().max(100)
})

export type CreateAuthorServiceParams = {
  authorsRepository: IAuthorsRepository
  logger: Logger
}

export class CreateAuthorService {
  private _authorsRepository: IAuthorsRepository
  private _logger: Logger

  constructor(params: CreateAuthorServiceParams) {
    this._authorsRepository = params.authorsRepository
    this._logger = params.logger.child({ service: 'CreateAuthorService' })
  }

  async create(data: Omit<Author, 'id'>): Promise<Author> {
    const validateData = await schema.validate(data, { abortEarly: false })

    const author = await this._authorsRepository.create(validateData)

    this._logger.info({ author }, 'Author created')

    return author
  }
}
