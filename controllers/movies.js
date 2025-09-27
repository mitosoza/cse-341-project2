const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { asyncHandler } = require('../middleware/errorHandler');

const getAll = asyncHandler(async (req, res) => {
  //#swagger.tags=['Movies']
  const result = await mongodb.getDatabase().db().collection('movies').find();
  const movies = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movies);
});

const getSingle = asyncHandler(async (req, res) => {
  //#swagger.tags=['Movies']
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
  const movies = await result.toArray();

  if (movies.length === 0) {
    const error = new Error('Movie not found');
    error.status = 404;
    throw error;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(movies[0]);
});

const createMovie = asyncHandler(async (req, res) => {
  //#swagger.tags=['Movies']
  const movie = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    director: req.body.director,
    duration: req.body.duration,
    rating: req.body.rating
  };
  const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
  if (response.acknowledged) {
    res.status(201).json({
      message: 'Movie created successfully',
      id: response.insertedId
    });
  } else {
    const error = new Error('Failed to create movie');
    error.status = 500;
    throw error;
  }
});

const updateMovie = asyncHandler(async (req, res) => {
  //#swagger.tags=['Movies']
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    director: req.body.director,
    duration: req.body.duration,
    rating: req.body.rating
  };
  const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0) {
    res.status(200).json({ message: 'Movie updated successfully' });
  } else if (response.matchedCount === 0) {
    const error = new Error('Movie not found');
    error.status = 404;
    throw error;
  } else {
    const error = new Error('Failed to update movie');
    error.status = 500;
    throw error;
  }
});

const deleteMovie = asyncHandler(async (req, res) => {
  //#swagger.tags=['Movies']
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });

  if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Movie deleted successfully' });
  } else {
    const error = new Error('Movie not found');
    error.status = 404;
    throw error;
  }
});

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};