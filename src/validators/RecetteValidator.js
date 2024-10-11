import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Recipe from '../models/Recipe.js';
import Category from '../models/Category.js';

const addRequestValidatorRecipe = [
  check('titre')
    .notEmpty()
    .withMessage('Titre ne peut pas être vide!')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Minimum 5 caractères requis!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Maximum 100 caractères limite!')
    .bail()
    .custom(async (value) => {
      const result = await Recipe.checkRecipe(value);
      if (result.length !== 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingredients ne peut pas être vide!')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Minimum 10 caractères requis!')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Maximum 500 caractères limite!')
    .bail(),
  check('type')
    .notEmpty()
    .withMessage('Type ne peut pas être vide!')
    .bail()
    .isIn(['Entrée', 'Dessert', 'Plat'])
    .withMessage("Type doit être 'Entrée', 'Dessert' ou 'Plat'"),
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
    .withMessage('Le nom est obligatoire!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Maximum 100 caractères limite!')
    .bail()
    .custom(async (value) => {
      const result = await Category.checkCategory(value);
      if (result.length !== 0) {
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
    })
    .custom(async (value) => {
      const result = await Recipe.getRecipeByCategory(value);
      const check = result.length;
      if (check !== 0) {
        throw new Error('Cette catégorie contient des recettes!');
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

const getRequestValidatorRecipe = [
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

const getRequestValidatorCategory = [
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
    .withMessage('Titre ne doit pas être vide')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Minimum 5 caractères requis!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Maximum 100 caractères limite!')
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await Recipe.checkRecipe(value, id);
      if (result.length !== 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('ingredients')
    .notEmpty()
    .withMessage('Ingredients ne peut pas être vide!')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Minimum 10 caractères requis!')
    .bail()
    .isLength({ max: 500 })
    .withMessage('Maximum 500 caractères limite!')
    .bail(),
  check('type')
    .notEmpty()
    .withMessage('Type ne peut pas être vide!')
    .bail()
    .isIn(['Entrée', 'Dessert', 'Plat'])
    .withMessage("Type doit être 'Entrée', 'Dessert' ou 'Plat'"),
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
    .withMessage('le nom est obligatoire!')
    .bail()
    .isLength({ max: 100 })
    .withMessage('Maximum 100 caractères limite!')
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await Category.checkCategory(value, id);
      if (result.length !== 0) {
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
  getRequestValidatorRecipe,
  getRequestValidatorCategory,
};
