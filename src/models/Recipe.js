import pool from '../config/db.js';

class Recipe {
  static async checkRecipe(titre, id = null) {
    try {
      let res = null;
      if (id) {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
          'select * from recettes where titre = ? and id != ?',
          [titre, id]
        );
        res = result;
      } else {
        const connection = await pool.getConnection();
        const [result] = await connection.execute(
          'select * from recettes where titre = ?',
          [titre]
        );
        res = result;
      }
      return res;
    } finally {
      pool.releaseConnection();
    }
  }

  static async getId(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select * from recettes where id = ?',
        [id]
      );
      return result.length;
    } finally {
      pool.releaseConnection();
    }
  }

  static async getRecipeByCategory(categorie_id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select titre, ingredients, type, categorie_id as categorie from recettes where categorie_id = ?',
        [categorie_id]
      );
      return result;
    } finally {
      pool.releaseConnection();
    }
  }

  static async getRecipeById(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.execute(
        'select r.titre, r.ingredients, r.type, c.id as id_cat, c.nom as nom from recettes as r, categories as c where r.categorie_id = c.id and r.id = ?',
        [id]
      );
      return result;
    } finally {
      pool.releaseConnection();
    }
  }

  static async recipes() {
    try {
      const connection = await pool.getConnection();
      const result = await connection.execute(
        'select r.id as id, r.titre, r.ingredients, r.type, c.id as id_cat, c.nom as nom from recettes as r, categories as c where r.categorie_id = c.id'
      );
      return result;
    } finally {
      pool.releaseConnection();
    }
  }

  static async store(titre, ingredients, type, categorie_id) {
    try {
      const connection = await pool.getConnection();
      await connection.execute(
        'INSERT INTO recettes(titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)',
        [titre, ingredients, type, categorie_id]
      );
      return true;
    } finally {
      pool.releaseConnection();
    }
  }

  static async destroy(id) {
    try {
      const connection = await pool.getConnection();
      await connection.execute('delete from recettes where id = ?', [id]);
      return true;
    } finally {
      pool.releaseConnection();
    }
  }

  static async update(id, titre, ingredients, type, categorie_id) {
    try {
      const connection = await pool.getConnection();
      await connection.execute(
        'update recettes set titre = ?, ingredients = ?, type = ?, categorie_id = ? where id = ?',
        [titre, ingredients, type, categorie_id, id]
      );
      return true;
    } finally {
      pool.releaseConnection();
    }
  }
}

export default Recipe;
