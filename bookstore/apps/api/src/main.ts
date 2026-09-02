import { createApp } from './app'
import { PORT } from './constants'
import { logger } from './logger'

// Criar app Express.js
const app = createApp()

// Inicia servidor
app.listen(PORT, (err) => {
  if (err) {
    logger.fatal(err, 'Error starting server')
  } else {
    logger.info('Started server at %s', PORT)
  }
})
