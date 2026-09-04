import request from 'supertest'
import { describe, expect, test } from 'vitest'
import { createApp } from '../../app'

describe('healthRouter', () => {
  describe('GET /health', () => {
    test('responds 200 OK', async () => {
      const app = createApp()

      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
    })
  })
})
