const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const {
  validateMovieData,
  validateObjectId
} = require('../middleware/validation');

router.get('/', moviesController.getAll);

router.get('/:id', validateObjectId, moviesController.getSingle);

router.post('/', validateMovieData, moviesController.createMovie);

router.put('/:id', validateObjectId, validateMovieData, moviesController.updateMovie);

router.delete('/:id', validateObjectId, moviesController.deleteMovie);

module.exports = router;