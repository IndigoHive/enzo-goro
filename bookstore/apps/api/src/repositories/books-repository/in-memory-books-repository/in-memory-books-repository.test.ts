import { describe, expect, test } from 'vitest'
import { InMemoryBooksRepository } from './in-memory-books-repository'

describe(InMemoryBooksRepository, () => {
  describe('create', () => {
    test('creates an author', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'

      const result = await repository.create({ authorId, title })

      const created = await repository.find(result.id)
      expect(created).toMatchObject({
        id: result.id,
        authorId,
        title
      })
    })

    test('returns the created author', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'

      const result = await repository.create({ authorId, title })

      expect(result).toMatchObject({
        id: expect.any(Number),
        authorId,
        title
      })
    })
  })

  describe('delete', () => {
    test('deletes an author', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'
      const newBook = await repository.create({ authorId, title })

      if (newBook === null) {
        throw new Error('Could not create author for testing')
      }

      repository.delete(newBook.id)

      const result = await repository.find(newBook.id)

      expect(result).toBe(null)
    })
  })

  describe('find', () => {
    test('searches for an author that exists', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'
      const newBook = await repository.create({ authorId, title })

      if (newBook === null) {
        throw new Error('Could not create author for testing')
      }

      const result = await repository.find(newBook.id)

      expect(result).toMatchObject(newBook)
    })

    test('searches for a nonexistent author', async () => {
      const repository = new InMemoryBooksRepository()
      const result = await repository.find(67)

      expect(result).toBe(null)
    })
  })

  describe('list', () => {
    test('returns the list of authors', async () => {
      const repository = new InMemoryBooksRepository()
      const authorList = []
      for (let i = 1; i < 5; i++) {
        const newBook = { authorId: `${2 * i}`, title: `narnia${i}` }
        authorList.push(newBook)
        repository.create(newBook)
      }
      const result = await repository.list()

      expect(result).toHaveLength(authorList.length)
      authorList.forEach((author) => {
        expect(result).toContainEqual(expect.objectContaining(author))
      })
    })
  })

  describe('update', () => {
    test('updates an author', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'
      const book = await repository.create({ authorId, title })

      const newAuthorId = '2'
      const newTitle = 'Odisseia'

      await repository.update(book.id, {
        authorId: newAuthorId,
        title: newTitle
      })

      const result = await repository.find(book.id)
      expect(result).toMatchObject({
        id: book.id,
        authorId: newAuthorId,
        title: newTitle
      })
    })
    test('returns the updated author', async () => {
      const repository = new InMemoryBooksRepository()
      const authorId: string = '1'
      const title: string = 'narnia'
      const book = await repository.create({ authorId, title })

      const newAuthorId = '2'
      const newTitle = 'Odisseia'
      const result = await repository.update(book.id, {
        authorId: newAuthorId,
        title: newTitle
      })
      expect(result).toMatchObject({
        id: book.id,
        authorId: newAuthorId,
        title: newTitle
      })
    })
    test('updates a nonexisting author', async () => {
      const repository = new InMemoryBooksRepository()
      const newAuthorId = '2'
      const newTitle = 'Odisseia'

      const result = await repository.update(67, {
        authorId: newAuthorId,
        title: newTitle
      })

      expect(result).toBe(null)
    })
  })
})
