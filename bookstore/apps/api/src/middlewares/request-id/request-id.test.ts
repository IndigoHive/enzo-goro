import request from 'supertest'
import { describe, expect, test } from 'vitest'
import { createApp } from '../../app'

describe('requestId', () => {
  test('sets the X-Request-Id header', async () => {
    const app = createApp()

    const response = await request(app).get('/')

    expect(response.headers['x-request-id']).toBeDefined()
  })
})