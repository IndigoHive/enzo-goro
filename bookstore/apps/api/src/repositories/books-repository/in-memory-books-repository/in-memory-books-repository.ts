import type { Book } from '../../../types'
import type { IBooksRepository } from '../books-repository'

export class InMemoryBooksRepository implements IBooksRepository {
  private readonly _data: Book[]
  private _nextId: number

  constructor() {
    this._data = []
    this._nextId = 1
  }

  create(data: Omit<Book, 'id'>): Promise<Book> {
    const book: Book = {
      id: this._nextId++,
      authorId: data.authorId,
      title: data.title
    }

    this._data.push(book)

    const result: Book = structuredClone(book)

    return Promise.resolve(result)
  }

  delete(bookId: number): Promise<void> {
    const index = this._data.findIndex((book) => book.id === bookId)

    if (index > -1) {
      this._data.splice(index, 1)
    }

    return Promise.resolve()
  }

  find(bookId: number): Promise<Book | null> {
    const book = this._data.find((book) => book.id === bookId)

    if (book) {
      return Promise.resolve(book)
    } else {
      return Promise.resolve(null)
    }
  }

  list(): Promise<Book[]> {
    const books = this._data.map((book) => structuredClone(book))

    return Promise.resolve(books)
  }

  update(bookId: number, data: Omit<Book, 'id'>): Promise<Book | null> {
    const book = this._data.find((book) => book.id === bookId)

    if (!book) {
      return Promise.resolve(null)
    }
    book.authorId = data.authorId
    book.title = data.title

    return Promise.resolve(book)
  }
}
