import { Router } from 'express'

const router = Router()

// Import controller
import { getExamples, createExample } from '../controllers/exampleController.js'

// Routes
router.get('/', getExamples)
router.post('/', createExample)

export default router
