import { Router } from 'express'

export function booksRouter(): Router {
  const router = Router()

  router.post('/books', async (req, res) => {
    const service = req.container.resolve('createBookService')

    const result = await service.create(req.body)

    res.status(201).json(result)
  })

  router.get('/books', async (req, res) => {
    const service = req.container.resolve('listBooksService')

    const result = await service.list()

    res.status(200).json(result)
  })

  router.get('/books/:bookId', async (req, res) => {
    const service = req.container.resolve('findBookService')

    const result = await service.find(req.params.bookId)

    res.status(200).json(result)
  })

  router.patch('/books/:bookId', async (req, res) => {
    const service = req.container.resolve('updateBookService')

    const result = await service.update(req.params.bookId, req.body)

    res.status(200).json(result)
  })

  router.delete('/books/:bookId', async (req, res) => {
    const service = req.container.resolve('deleteBookService')

    await service.delete(req.params.bookId)

    res.status(200)
  })

  return router
}
