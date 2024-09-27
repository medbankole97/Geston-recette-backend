import pool from '../config/db.js';

class Category {
  static async getId(id) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select * from categories where id = ?',
      [id]
    );
    return result.length;
  }

  static async checkCategory(nom) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select * from categories where nom = ?',
      [nom]
    );
    return result.length;
  }

  static async getCategoryById(id) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select * from categories where id = ?',
      [id]
    );
    return result;
  }

  static async categories() {
    const connection = await pool.getConnection();
    const result = await connection.execute('select * from categories');
    return result;
  }

  static async store(nom) {
    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO categories(nom) VALUES (?)', [nom]);
    return true;
  }

  static async destroy(id) {
    const connection = await pool.getConnection();
    await connection.execute('delete from categories where id = ?', [id]);
    return true;
  }

  static async update(id, nom) {
    const connection = await pool.getConnection();
    await connection.execute('update categories set nom = ? where id = ?', [
      nom,
      id,
    ]);
    return true;
  }
}

export default Category;
