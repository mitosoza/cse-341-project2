const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const isAuthenticated = require('../middleware/authenticate');
const {
  validateMovieData,
  validateObjectId
} = require('../middleware/validation');

router.get('/', moviesController.getAll);
router.get('/:id', validateObjectId, moviesController.getSingle);
router.post('/', isAuthenticated, validateMovieData, moviesController.createMovie);
router.put('/:id', isAuthenticated, validateObjectId, validateMovieData, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, validateObjectId, moviesController.deleteMovie);

module.exports = router;