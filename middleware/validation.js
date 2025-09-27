const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

const isValidObjectId = (value) => {
  return ObjectId.isValid(value);
};

const validateCarData = [
  body('make')
    .trim()
    .notEmpty()
    .withMessage('Make is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Make must be between 2 and 50 characters'),

  body('model')
    .trim()
    .notEmpty()
    .withMessage('Model is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Model must be between 1 and 50 characters'),

  body('year')
    .isInt({ min: 1900 })
    .withMessage(`Year must be above 1900`),

  body('color')
    .trim()
    .notEmpty()
    .withMessage('Color is required')
    .isLength({ min: 2, max: 30 })
    .withMessage('Color must be between 2 and 30 characters'),

  body('cylinders')
    .isInt({ min: 1, max: 16 })
    .withMessage('Cylinders must be between 1 and 16'),

  body('transmission')
    .trim()
    .notEmpty()
    .withMessage('Transmission is required')
    .isIn(['Manual', 'Automatic'])
    .withMessage('Transmission must be Manual or Automatic'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  handleValidationErrors
];

const validateMovieData = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),

  body('releaseYear')
    .isInt({ min: 1900, max: new Date().getFullYear() + 5 })
    .withMessage(`Release year must be between 1900 and ${new Date().getFullYear() + 5}`),

  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Genre must be between 2 and 50 characters'),

  body('director')
    .trim()
    .notEmpty()
    .withMessage('Director is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Director must be between 2 and 50 characters'),

  body('duration')
    .isInt({ min: 1, max: 300 })
    .withMessage('Duration must be between 1 and 300 minutes'),

  body('rating')
    .trim()
    .notEmpty()
    .withMessage('Rating is required')
    .isIn(['G', 'PG', 'PG-13', 'R'])
    .withMessage('Rating must be G, PG, PG-13, or R'),

  handleValidationErrors
];

const validateObjectId = [
  param('id')
    .custom(isValidObjectId)
    .withMessage('Invalid ID format'),

  handleValidationErrors
];

module.exports = {
  validateCarData,
  validateMovieData,
  validateObjectId,
  handleValidationErrors
};