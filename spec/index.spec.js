import pool from '../src/config/db.js';
import Category from '../src/models/Category.js';
import Recipe from '../src/models/Recipe.js';

describe('Recipe tests', () => {
  it('can get all recipes', async () => {
    const connection = await pool.getConnection();
    try {
      const result = await Recipe.recipes();
      expect(result).not.toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can create recipe', async () => {
    const connection = await pool.getConnection();
    try {
      const recipe = {
        titre: 'crepes',
        type: 'dessert',
        ingredients: 'farine, oeuf, lait',
        categorie_id: 5,
      };
      const result = await Recipe.store(
        recipe.titre,
        recipe.ingredients,
        recipe.type,
        recipe.categorie_id
      );
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it("can't create recipe", async () => {
    const connection = await pool.getConnection();
    try {
      const recipe = {
        titre: null,
        type: 'dessert',
        ingredients: 'farine, oeuf, lait',
        categorie_id: 5,
      };
      const result = await Recipe.store(
        recipe.titre,
        recipe.ingredients,
        recipe.type,
        recipe.categorie_id
      );
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can update recipe', async () => {
    const connection = await pool.getConnection();
    try {
      const updatedRecipe = {
        titre: 'Gâteau',
        type: 'dessert',
        ingredients: 'farine, sucre, oeuf, lait',
        categorie_id: 2,
      };

      const create = await Recipe.store(
        updatedRecipe.titre,
        updatedRecipe.ingredients,
        updatedRecipe.type,
        updatedRecipe.categorie_id
      );
      const id = create.insertId;
      const result = await Recipe.update(
        id,
        updatedRecipe.titre,
        updatedRecipe.ingredients,
        updatedRecipe.type,
        updatedRecipe.categorie_id
      );

      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can delete recipe', async () => {
    const connection = await pool.getConnection();
    try {
      const deleteId = 7;
      const result = await Recipe.destroy(deleteId);
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can get recipe by Id', async () => {
    const connection = await pool.getConnection();
    try {
      const id = 6;
      const result = await Recipe.getRecipeById(id);
      expect(result).not.toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it("can't get recipe by Id", async () => {
    const connection = await pool.getConnection();
    try {
      const id = 100;
      const result = await Recipe.getRecipeById(id);
      expect(result).toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can verify existence of id recipe', async () => {
    const connection = await pool.getConnection();
    try {
      const id = 6;
      const result = await Recipe.getId(id);
      expect(result).not.toBe(0);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it("can't verify existence of id recipe", async () => {
    const connection = await pool.getConnection();
    try {
      const id = 260;
      const result = await Recipe.getId(id);
      expect(result).toBe(0);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  // it('can get recipe by title', async () => {
  //   const connection = await pool.getConnection();
  //   try {
  //     const title = 'crepes';
  //     const result = await Recipe.checkRecipe(title);
  //     expect(result).not.toEqual([]);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     connection.release();
  //   }
  // });

  // it("can't get recipe by title", async () => {
  //   const connection = await pool.getConnection();
  //   try {
  //     const title = 'Saucisse';
  //     const result = await Recipe.checkRecipe(title);
  //     expect(result).toBe(0);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     connection.release();
  //   }
  // });
});

describe('Categorie tests', () => {
  it('can get all categories', async () => {
    const connection = await pool.getConnection();
    try {
      const result = await Category.categories();
      expect(result).not.toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can create category', async () => {
    const connection = await pool.getConnection();
    try {
      const categorie = { nom: 'Menu Italien' };
      const result = await Category.store(categorie.nom);
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it("can't create category", async () => {
    const connection = await pool.getConnection();
    try {
      const categorie = { nom: null };
      const result = await Category.store(categorie.nom);
      expect(result).toBe(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can update category', async () => {
    const connection = await pool.getConnection();
    try {
      const updatedCategory = { nom: 'Apéro' };
      const result = await Category.update(6, updatedCategory.nom);
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can delete category', async () => {
    const connection = await pool.getConnection();
    try {
      const deleteId = 6;
      const result = await Category.destroy(deleteId);
      expect(result).toBe(true);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can get category by Id', async () => {
    const connection = await pool.getConnection();
    try {
      const id = 5;
      const result = await Category.getCategoryById(id);
      expect(result).not.toEqual([]);
    } catch (error) {
      console.error('Error getting category:', error);
    } finally {
      connection.release();
    }
  });

  it("can't get category by Id", async () => {
    const connection = await pool.getConnection();
    try {
      const id = 223;
      const result = await Category.getCategoryById(id);
      expect(result).toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can verify existence of id category', async () => {
    const connection = await pool.getConnection();
    try {
      const id = 5;
      const result = await Category.getId(id);
      expect(result).not.toBe(0);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it("can't verify existence of id category", async () => {
    const connection = await pool.getConnection();
    try {
      const id = 150;
      const result = await Category.getId(id);
      expect(result).toBe(0);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  it('can get recipe by category', async () => {
    const connection = await pool.getConnection();
    try {
      const id = 5;
      const result = await Recipe.getRecipeByCategory(id);
      expect(result).not.toEqual([]);
    } catch (error) {
      console.log(error.message);
    } finally {
      connection.release();
    }
  });

  // it('can get category by name', async () => {
  //   const connection = await pool.getConnection();
  //   try {
  //     const name = 'Dessert';
  //     const result = await Category.checkCategory(name);
  //     expect(result).not.toBe(0);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     connection.release();
  //   }
  // });

  // it("can't get category by name", async () => {
  //   const connection = await pool.getConnection();
  //   try {
  //     const name = 'Soupe';
  //     const result = await Category.checkCategory(name);
  //     expect(result).toBe(0);
  //   } catch (error) {
  //     console.log(error.message);
  //   } finally {
  //     connection.release();
  //   }
  // });
});
