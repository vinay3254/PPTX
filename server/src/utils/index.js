// Utility functions

/**
 * Format a date string
 * @param {Date|string} date - Date object or ISO string
 * @param {string} format - Format option
 * @returns {string} Formatted date
 */
export function formatDate(date, format = 'ISO') {
  const d = new Date(date)
  
  switch (format) {
    case 'ISO':
      return d.toISOString()
    case 'human':
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'short':
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    default:
      return d.toISOString()
  }
}

/**
 * Generate a random string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
export function generateRandomString(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * Sleep for a specified time
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after the delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Sanitize user input
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  return input.trim().replace(/[<>]/g, '')
}

/**
 * Paginate an array
 * @param {Array} array - Array to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {Object} Paginated result
 */
export function paginate(array, page = 1, limit = 10) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: array.length,
      totalPages: Math.ceil(array.length / limit)
    }
  }
}
