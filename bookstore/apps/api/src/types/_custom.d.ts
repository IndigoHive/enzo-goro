import type { AwilixContainer } from 'awilix'
import type { ContainerServices } from '../container'

declare global {
  namespace Express {
    interface Request {
      id?: string
      container: AwilixContainer<ContainerServices>
    }
  }
}
