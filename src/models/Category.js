import pool from '../config/db.js';

class Category {
  static async getId(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select * from categories where id = ?',
        [id]
      );
      return result.length;
    } finally {
      pool.releaseConnection();
    }
  }

  static async checkCategory(nom) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select * from categories where nom = ?',
        [nom]
      );
      return result.length;
    } finally {
      pool.releaseConnection();
    }
  }

  static async getCategoryById(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select * from categories where id = ?',
        [id]
      );
      return result;
    } finally {
      pool.releaseConnection();
    }
  }

  static async categories() {
    try {
      const connection = await pool.getConnection();
      const result = await connection.execute('select * from categories');
      return result;
    } finally {
      pool.releaseConnection();
    }
  }

  static async store(nom) {
    try {
      const connection = await pool.getConnection();
      await connection.execute('INSERT INTO categories(nom) VALUES (?)', [nom]);
      return true;
    } finally {
      pool.releaseConnection();
    }
  }

  static async destroy(id) {
    try {
      const connection = await pool.getConnection();
      await connection.execute('delete from categories where id = ?', [id]);
      return true;
    } finally {
      pool.releaseConnection();
    }
  }

  static async update(id, nom) {
    try {
      const connection = await pool.getConnection();
      await connection.execute('update categories set nom = ? where id = ?', [
        nom,
        id,
      ]);
      return true;
    } finally {
      pool.releaseConnection();
    }
  }
}

export default Category;
