import { asClass, createContainer as createAwilixContainer } from 'awilix'
import { type AuthorsServices, authorsServices } from '../src/services'
import {
  type IAuthorsRepository,
  type IBooksRepository,
  InMemoryAuthorsRepository,
  InMemoryBooksRepository
} from './repositories'
import {
  type BooksServices,
  booksServices
} from './services/books/books-service'

type CommonServices = {
  authorsRepository: IAuthorsRepository
  booksRepository: IBooksRepository
}

export type ContainerServices = CommonServices & AuthorsServices & BooksServices

export function createContainer() {
  const container = createAwilixContainer<ContainerServices>()

  container.register({
    authorsRepository: asClass(InMemoryAuthorsRepository).singleton(),
    booksRepository: asClass(InMemoryBooksRepository).singleton()
  })

  container.register(authorsServices)
  container.register(booksServices)

  return container
}
