import { asClass } from 'awilix'
import { CreateAuthorService } from './create-author/create-author-service'
import { DeleteAuthorService } from './delete-author/delete-author-service'
import { FindAuthorService } from './find-author/find-author-service'
import { ListAuthorsService } from './list-authors/list-authors-service'
import { UpdateAuthorService } from './update-author/update-author-service'

export type AuthorsServices = {
  createAuthorService: CreateAuthorService
  deleteAuthorService: DeleteAuthorService
  findAuthorService: FindAuthorService
  listAuthorsService: ListAuthorsService
  updateAuthorService: UpdateAuthorService
}

export const authorsServices = {
  createAuthorService: asClass(CreateAuthorService).scoped(),
  deleteAuthorService: asClass(DeleteAuthorService).scoped(),
  findAuthorService: asClass(FindAuthorService).scoped(),
  listAuthorsService: asClass(ListAuthorsService).scoped(),
  updateAuthorService: asClass(UpdateAuthorService).scoped()
}
