// Example controller

// Mock data store
let examples = [
  { id: 1, name: 'Example 1', description: 'This is the first example' },
  { id: 2, name: 'Example 2', description: 'This is the second example' }
]

/**
 * Get all examples
 */
export const getExamples = (req, res) => {
  res.json({
    success: true,
    data: examples,
    count: examples.length
  })
}

/**
 * Create a new example
 */
export const createExample = (req, res) => {
  const { name, description } = req.body

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Name is required'
    })
  }

  const newExample = {
    id: examples.length + 1,
    name,
    description: description || ''
  }

  examples.push(newExample)

  res.status(201).json({
    success: true,
    data: newExample,
    message: 'Example created successfully'
  })
}
