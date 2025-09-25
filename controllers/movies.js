const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Movies']
    const result = await mongodb.getDatabase().db().collection('movies').find();
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
    result.toArray().then((movies) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(movies[0]);
    });
};

const createMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movie ={
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        director: req.body.director,
        duration: req.body.duration,
        rating: req.body.rating
    };
    const response = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
};

const updateMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const movie ={
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        director: req.body.director,
        duration: req.body.duration,
        rating: req.body.rating
    };
    const response = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
};

const deleteMovie = async (req, res) => {
    //#swagger.tags=['Movies']
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};