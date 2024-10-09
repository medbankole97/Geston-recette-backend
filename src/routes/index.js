import express from 'express';
import RecipeController from '../controllers/RecipeController.js';
import CategoryController from '../controllers/CategoryController.js';

import {
  addRequestValidatorRecipe,
  addRequestValidatorCategory,
  updateRequestValidatorRecipe,
  updateRequestValidatorCategory,
  deleteRequestValidatorRecipe,
  deleteRequestValidatorCategory,
  getRequestValidatorCategory,
  getRequestValidatorRecipe,
} from '../validators/RecetteValidator.js';

const router = express.Router();

//recipes routes
router.get('/recipes', RecipeController.recipes);

router.post('/recipes', addRequestValidatorRecipe, RecipeController.store);

router.delete(
  '/recipes/:id',
  deleteRequestValidatorRecipe,
  RecipeController.destroy
);

router.put(
  '/recipes/:id',
  updateRequestValidatorRecipe,
  RecipeController.update
);

router.get('/recipes/:id', getRequestValidatorRecipe, RecipeController.getById);

//categories route
router.get('/categories', CategoryController.categories);

router.post(
  '/categories',
  addRequestValidatorCategory,
  CategoryController.store
);

router.delete(
  '/categories/:id',
  deleteRequestValidatorCategory,
  CategoryController.destroy
);

router.put(
  '/categories/:id',
  updateRequestValidatorCategory,
  CategoryController.update
);

router.get(
  '/categories/:id',
  getRequestValidatorCategory,
  CategoryController.getById
);

router.get(
  '/categories/recipes/:id',
  getRequestValidatorCategory,
  CategoryController.getRecipeInCategory
);

export default router;
