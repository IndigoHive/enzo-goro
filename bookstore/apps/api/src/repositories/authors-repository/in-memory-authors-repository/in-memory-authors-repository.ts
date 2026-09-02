import type { Author } from '../../../types/author'
import type { IAuthorsRepository } from '../authors-repository'

export class InMemoryAuthorsRepository implements IAuthorsRepository {
  private readonly _data: Author[]
  private _nextId: number

  constructor() {
    this._data = []
    this._nextId = 1
  }

  // Implementação dos métodos create, delete, find, list e update

  create(data: Omit<Author, 'id'>): Promise<Author> {
    const author: Author = {
      id: this._nextId++,
      name: data.name
    }

    this._data.push(author)

    // Retornar um novo objeto, e não o original que foi salvo
    // Caso contrário, alguém poderia modificar o objeto retornado
    // Os dados armazenados só devem ser alterados pelo método update
    const result: Author = structuredClone(author)

    return Promise.resolve(result)
  }

  delete(authorId: number): Promise<void> {
    const index = this._data.findIndex((author) => author.id === authorId)

    if (index > -1) {
      this._data.splice(index, 1)
    }

    return Promise.resolve()
  }

  find(authorId: number): Promise<Author | null> {
    const author = this._data.find((author) => author.id === authorId)

    if (author) {
      return Promise.resolve(structuredClone(author))
    } else {
      return Promise.resolve(null)
    }
  }

  list(): Promise<Author[]> {
    const authors = this._data.map((author) => structuredClone(author))

    return Promise.resolve(authors)
  }

  update(authorId: number, data: Omit<Author, 'id'>): Promise<Author | null> {
    const author = this._data.find((author) => author.id === authorId)

    if (!author) {
      return Promise.resolve(null)
    }

    author.name = data.name

    return Promise.resolve(structuredClone(author))
  }
}
