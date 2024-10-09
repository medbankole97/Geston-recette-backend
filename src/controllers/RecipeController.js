import Recipe from '../models/Recipe.js';
import { StatusCodes } from 'http-status-codes';

class RecipeController {
  static async recipes(_req, res, next) {
    try {
      const [result] = await Recipe.recipes();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async store(req, res, next) {
    try {
      const { titre, ingredients, type, categorie_id } = req.body;
      await Recipe.store(titre, ingredients, type, categorie_id);
      res.status(StatusCodes.OK).json('Added successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { titre, ingredients, type, categorie_id } = req.body;
      await Recipe.update(id, titre, ingredients, type, categorie_id);
      res.status(StatusCodes.OK).json('Updated successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async destroy(req, res, next) {
    try {
      const id = req.params.id;
      await Recipe.destroy(id);
      res.status(StatusCodes.OK).json('Deleted successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const [result] = await Recipe.getRecipeById(id);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
}

export default RecipeController;