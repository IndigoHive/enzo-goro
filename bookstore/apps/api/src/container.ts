import { asClass, createContainer as createAwilixContainer } from 'awilix'
import { type AuthorsServices, authorsServices } from '../src/services'
import {
  type IAuthorsRepository,
  InMemoryAuthorsRepository
} from './repositories'

type CommonServices = {
  authorsRepository: IAuthorsRepository
}

export type ContainerServices = CommonServices & AuthorsServices

export function createContainer() {
  const container = createAwilixContainer<ContainerServices>()

  container.register({
    authorsRepository: asClass(InMemoryAuthorsRepository).singleton()
  })

  container.register(authorsServices)

  return container
}
