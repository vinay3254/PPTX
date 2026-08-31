import { Router } from 'express'

const router = Router()

// Import route modules
import exampleRouter from './example.js'

// Mount routes
router.use('/examples', exampleRouter)

// Example endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    endpoints: {
      examples: '/api/examples'
    }
  })
})

export default router
