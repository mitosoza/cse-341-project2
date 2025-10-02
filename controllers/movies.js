const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const result = await mongodb.getDatabase().db().collection('movies').find();
    const movies = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
    const movies = await result.toArray();

    if (movies.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
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
      res.status(500).json({ error: 'Failed to create movie' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
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
      res.status(404).json({ error: 'Movie not found' });
    } else {
      res.status(500).json({ error: 'Failed to update movie' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  //#swagger.tags=['Movies']
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Movie deleted successfully' });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};