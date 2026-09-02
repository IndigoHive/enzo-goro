import { describe, expect, test } from 'vitest'
import { InMemoryAuthorsRepository } from './in-memory-authors-repository'

describe(InMemoryAuthorsRepository, () => {
  describe('create', () => {
    test('creates an author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'

      const result = await repository.create({ name })

      const created = await repository.find(result.id)
      expect(created).toMatchObject({
        id: result.id,
        name
      })
    })

    test('returns the created author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'

      const result = await repository.create({ name })

      expect(result).toMatchObject({
        id: expect.any(Number),
        name
      })
    })
  })

  describe('delete', () => {
    test('deletes an author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'
      const newAuthor = await repository.create({ name })

      if (newAuthor === null) {
        throw new Error('Could not create author for testing')
      }

      repository.delete(newAuthor.id)

      const result = await repository.find(newAuthor.id)

      expect(result).toBe(null)
    })
  })

  describe('find', () => {
    test('searches for an author that exists', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'
      const newAuthor = await repository.create({ name })

      if (newAuthor === null) {
        throw new Error('Could not create author for testing')
      }

      const result = await repository.find(newAuthor.id)

      expect(result).toMatchObject(newAuthor)
    })

    test('searches for a nonexistent author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const result = await repository.find(67)

      expect(result).toBe(null)
    })
  })

  describe('list', () => {
    test('returns the list of authors', async () => {
      const repository = new InMemoryAuthorsRepository()
      const authorList = []
      for (let i = 1; i < 5; i++) {
        const newAuthor = { name: `foo'+${i}` }
        authorList.push(newAuthor)
        repository.create(newAuthor)
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
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'
      const newAuthor = await repository.create({ name })

      const newName = 'fee'
      repository.update(newAuthor.id, { name: newName })

      const result = await repository.find(newAuthor.id)
      expect(result).toMatchObject({
        id: newAuthor.id,
        name: newName
      })
    })
    test('returns the updated author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'
      const newAuthor = await repository.create({ name })

      const newName = 'fee'
      const result = await repository.update(newAuthor.id, { name: newName })
      expect(result).toMatchObject({
        id: newAuthor.id,
        name: newName
      })
    })
    test('updates a nonexisting author', async () => {
      const repository = new InMemoryAuthorsRepository()
      const name = 'foo'

      const result = await repository.update(67, { name: name })

      expect(result).toBe(null)
    })
  })
})
