import pool from '../config/db.js';

class Recipe {
  static async checkRecipe(titre) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select * from recettes where titre = ?',
      [titre]
    );
    return result.length;
  }

  static async getId(id) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select * from recettes where id = ?',
      [id]
    );
    return result.length;
  }

  static async getRecipeByCategory(categorie_id) {
    const connection = await pool.getConnection();
    const result = await connection.execute(
      'select titre, ingredients, type, categorie_id as categorie from recettes where categorie_id = ?',
      [categorie_id]
    );
    return result;
  }

  static async getRecipeById(id) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'select r.titre, r.ingredients, r.type, c.id as id_cat, c.nom as nom from recettes as r, categories as c where r.categorie_id = c.id and r.id = ?',
      [id]
    );
    return result;
  }

  static async recipes() {
    const connection = await pool.getConnection();
    const result = await connection.execute(
      'select r.id as id, r.titre, r.ingredients, r.type, c.id as id_cat, c.nom as nom from recettes as r, categories as c where r.categorie_id = c.id'
    );
    return result;
  }

  static async store(titre, ingredients, type, categorie_id) {
    const connection = await pool.getConnection();
    await connection.execute(
      'INSERT INTO recettes(titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)',
      [titre, ingredients, type, categorie_id]
    );
    return true;
  }

  static async destroy(id) {
    const connection = await pool.getConnection();
    await connection.execute('delete from recettes where id = ?', [id]);
    return true;
  }

  static async update(id, titre, ingredients, type, categorie_id) {
    const connection = await pool.getConnection();
    await connection.execute(
      'update recettes set titre = ?, ingredients = ?, type = ?, categorie_id = ? where id = ?',
      [titre, ingredients, type, categorie_id, id]
    );
    return true;
  }
}

export default Recipe;
