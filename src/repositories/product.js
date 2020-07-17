const poolPromise = require('../createDatabase')

class Product {
  async findById(id) {
    try {
      const db = await poolPromise
      return await db.query('SELECT * FROM product WHERE id = ?', [id])
    } catch (error) {
      error.status = 503
      throw error
    }
  }

  async findAll() {
    try {
      const db = await poolPromise
      return await db.query('SELECT * FROM product')
    } catch (error) {
      error.status = 503
      throw error
    }
  }

  async removeById(id) {
    try {
      const db = await poolPromise
      await db.query('DELETE FROM product WHERE id = ?', [id])
    } catch (error) {
      error.status = 503
      throw error
    }
  }

  async findByName(name) {
    try {
      const db = await poolPromise
      return await db.query('SELECT * FROM product WHERE name = ?', [name])
    } catch (error) {
      error.status = 503
      throw error
    }
  }

  async create(name) {
    try {
      const db = await poolPromise
      const result = await db.query('INSERT INTO product(name) VALUES(?)', [
        name,
      ])
      return result.insertId
    } catch (error) {
      error.status = 503
      throw error
    }
  }

  async update(id, name) {
    try {
      const db = await poolPromise
      await db.query('UPDATE product SET name = ? WHERE id = ?', [name, id])
    } catch (error) {
      error.status = 503
      throw error
    }
  }
}

module.exports = Product
