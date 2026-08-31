import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import app from './app.js'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3000

// Create Express app
const server = express()

// Middleware
server.use(helmet())
server.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Mount the app router
server.use('/', app)

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default server
