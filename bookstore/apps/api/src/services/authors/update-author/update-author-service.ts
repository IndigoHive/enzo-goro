import createHttpError from 'http-errors'
import type { Logger } from 'pino'
import * as yup from 'yup'
import type { IAuthorsRepository } from '../../../repositories'
import type { Author } from '../../../types'

const schema = yup.object({
  name: yup.string().required()
})

const numberValidator = yup.number().required()

export type UpdateAuthorServiceParams = {
  authorsRepository: IAuthorsRepository
  logger: Logger
}

export class UpdateAuthorService {
  private _authorsRepository: IAuthorsRepository
  private _logger: Logger

  constructor(params: UpdateAuthorServiceParams) {
    this._authorsRepository = params.authorsRepository
    this._logger = params.logger.child({ service: 'UpdateAuthorService' })
  }

  async update(
    authorId: number | string,
    data: Omit<Author, 'id'>
  ): Promise<Author> {
    const validateData = await schema.validate(data)

    const validateId = await numberValidator.validate(authorId)

    const author = await this._authorsRepository.update(
      validateId,
      validateData
    )

    if (!author) {
      throw new createHttpError.NotFound(
        `Author with id '${authorId}' not found`
      )
    }

    this._logger.info(
      { id: author.id, authorName: author.name },
      'Author updated'
    )

    return author
  }
}
