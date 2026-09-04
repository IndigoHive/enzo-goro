import type { Book } from '../../types'

export interface IBooksRepository {
  create(data: Omit<Book, 'id'>): Promise<Book>

  delete(bookId: number): Promise<void>

  find(bookId: number): Promise<Book | null>

  list(): Promise<Book[]>

  update(bookId: number, data: Omit<Book, 'id'>): Promise<Book | null>
}
