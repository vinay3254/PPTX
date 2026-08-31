// Example model - This is a placeholder for Mongoose or Sequelize models
// Import mongoose if using MongoDB:
// import mongoose from 'mongoose'

/**
 * Example Schema (MongoDB/Mongoose example)
 * 
 * const exampleSchema = new mongoose.Schema({
 *   name: {
 *     type: String,
 *     required: true,
 *     trim: true
 *   },
 *   description: {
 *     type: String,
 *     trim: true
 *   },
 *   createdAt: {
 *     type: Date,
 *     default: Date.now
 *   }
 * })
 * 
 * export default mongoose.model('Example', exampleSchema)
 */

/**
 * Example Model (SQL/Sequelize example)
 * 
 * import { DataTypes } from 'sequelize'
 * import sequelize from '../config/database.js'
 * 
 * const Example = sequelize.define('Example', {
 *   id: {
 *     type: DataTypes.INTEGER,
 *     autoIncrement: true,
 *     primaryKey: true
 *   },
 *   name: {
 *     type: DataTypes.STRING,
 *     allowNull: false
 *   },
 *   description: {
 *     type: DataTypes.TEXT
 *   }
 * })
 * 
 * export default Example
 */

// Mock data access layer for demonstration
class ExampleModel {
  constructor() {
    this.examples = [
      { id: 1, name: 'Example 1', description: 'This is the first example' },
      { id: 2, name: 'Example 2', description: 'This is the second example' }
    ]
  }

  async findAll() {
    return this.examples
  }

  async findById(id) {
    return this.examples.find(ex => ex.id === id)
  }

  async create(data) {
    const newExample = {
      id: this.examples.length + 1,
      ...data,
      createdAt: new Date()
    }
    this.examples.push(newExample)
    return newExample
  }

  async update(id, data) {
    const index = this.examples.findIndex(ex => ex.id === id)
    if (index === -1) return null
    
    this.examples[index] = { ...this.examples[index], ...data }
    return this.examples[index]
  }

  async delete(id) {
    const index = this.examples.findIndex(ex => ex.id === id)
    if (index === -1) return false
    
    this.examples.splice(index, 1)
    return true
  }
}

export default new ExampleModel()
