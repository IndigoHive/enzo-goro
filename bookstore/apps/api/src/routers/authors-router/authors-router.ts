import { Router } from 'express'

export function authorsRouter(): Router {
  const router = Router()

  router.post('/authors', async (req, res) => {
    const service = req.container.resolve('createAuthorService')

    const result = await service.create(req.body)

    res.status(201).json(result)
  })

  router.get('/authors', async (req, res) => {
    const service = req.container.resolve('listAuthorsService')

    const result = await service.list()

    res.status(200).json(result)
  })

  router.get('/authors/:authorId', async (req, res) => {
    const service = req.container.resolve('findAuthorService')

    const result = await service.find(req.params.authorId)

    res.status(200).json(result)
  })

  router.patch('/authors/:authorId', async (req, res) => {
    const service = req.container.resolve('updateAuthorService')

    const result = await service.update(req.params.authorId, req.body)

    res.status(200).json(result)
  })

  router.delete('/authors/:authorId', async (req, res) => {
    const service = req.container.resolve('deleteAuthorService')

    await service.delete(req.params.authorId)

    res.status(200)
  })

  return router
}
