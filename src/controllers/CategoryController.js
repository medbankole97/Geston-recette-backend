import Category from '../models/Category.js';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/Recipe.js';

class CategoryController {
  static async categories(_req, res, next) {
    try {
      const [result] = await Category.categories();
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async store(req, res, next) {
    try {
      const { nom } = req.body;
      await Category.store(nom);
      res.status(StatusCodes.OK).json('Added successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const { nom } = req.body;
      await Category.update(id, nom);
      res.status(StatusCodes.OK).json('Updated successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async destroy(req, res, next) {
    try {
      const id = req.params.id;
      await Category.destroy(id);
      res.status(StatusCodes.OK).json('Deleted successfully');
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const [result] = await Category.getCategoryById(id);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      console.log(error.message);
    }
    next();
  }

  static async getRecipeInCategory(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Recipe.getRecipeByCategory(id);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      console.log(error.message);
    }
    next();
  }
}

export default CategoryController;
