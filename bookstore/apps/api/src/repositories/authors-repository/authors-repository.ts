import type { Author } from '../../types'

export interface IAuthorsRepository {
  create(data: Omit<Author, 'id'>): Promise<Author>

  delete(authorId: number): Promise<void>

  find(authorId: number): Promise<Author | null>

  list(): Promise<Author[]>

  update(authorId: number, data: Omit<Author, 'id'>): Promise<Author | null>
}
