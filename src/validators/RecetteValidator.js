import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/Recipe.js';
import Category from '../models/Category.js';

const addRequestValidatorRecipe = [
  check('titre')
    .notEmpty()
    .withMessage('Titre est obligatoire!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Minimum 4 caractères requis!')
    .bail()
    .custom(async (value) => {
      const result = await Recipe.checkRecipe(value);
      if (result !== 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingredients est obligatoire!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Entre 10 et 50 caractères!')
    .bail(),
  check('type')
    .notEmpty()
    .withMessage('Type est obligatoire!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Minimum 4 caractères requis!')
    .bail(),
  check('categorie_id')
    .notEmpty()
    .withMessage('Catégorie est obligatoire!')
    .bail()
    .custom(async (value) => {
      const result = await Category.getId(value);
      if (result === 0) {
        throw new Error("Cette categorie n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const addRequestValidatorCategory = [
  check('nom')
    .notEmpty()
    .withMessage('Nom est obligatoire!')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Maximum 50 caractères!')
    .bail()
    .custom(async (value) => {
      const result = await Category.checkCategory(value);
      if (result !== 0) {
        throw new Error('Cette catégorie existe déjà!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteRequestValidatorRecipe = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Id est obligatoire!')
    .bail()
    .custom(async (value) => {
      const result = await Recipe.getId(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteRequestValidatorCategory = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Id est obligatoire!')
    .bail()
    .custom(async (value) => {
      const result = await Category.getId(value);
      if (result === 0) {
        throw new Error("Cette catégorie n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateRequestValidatorRecipe = [
  param('id')
    .notEmpty()
    .withMessage('Id est requis!')
    .bail()
    .custom(async (value) => {
      const result = await Recipe.getId(value);
      if (result === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  check('titre')
    .notEmpty()
    .withMessage('Titre est obligatoire')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Minimum 4 caractères requis!')
    .bail()
    .custom(async (value) => {
      const result = await Recipe.checkRecipe(value);
      if (result !== 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingredients est obligatoire!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Entre 10 et 50 caractères!')
    .bail(),
  check('type')
    .notEmpty()
    .withMessage('Type est obligatoire!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Minimum 4 caractères requis!')
    .bail(),
  check('categorie_id')
    .notEmpty()
    .withMessage('Catégorie est obligatoire!')
    .bail()
    .custom(async (value) => {
      const result = await Category.getId(value);
      if (result === 0) {
        throw new Error("Cette categorie n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateRequestValidatorCategory = [
  param('id')
    .notEmpty()
    .withMessage('Id est requis!')
    .bail()
    .custom(async (value) => {
      const result = await Category.getId(value);
      if (result === 0) {
        throw new Error("Cette catégorie n'existe pas!");
      }
      return true;
    }),
  check('nom')
    .notEmpty()
    .withMessage('Nom est obligatoire!')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Maximum 50 caractères!')
    .bail()
    .custom(async (value) => {
      const result = await Category.checkCategory(value);
      if (result !== 0) {
        throw new Error('Cette catégorie existe déjà!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export {
  addRequestValidatorRecipe,
  addRequestValidatorCategory,
  deleteRequestValidatorRecipe,
  deleteRequestValidatorCategory,
  updateRequestValidatorRecipe,
  updateRequestValidatorCategory,
};
