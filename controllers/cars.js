const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { asyncHandler } = require('../middleware/errorHandler');

const getAll = asyncHandler(async (req, res) => {
  //#swagger.tags=['Cars']
  const result = await mongodb.getDatabase().db().collection('cars').find();
  const cars = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(cars);
});

const getSingle = asyncHandler(async (req, res) => {
  //#swagger.tags=['Cars']
  const carId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
  const cars = await result.toArray();

  if (cars.length === 0) {
    const error = new Error('Car not found');
    error.status = 404;
    throw error;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(cars[0]);
});

const createCar = asyncHandler(async (req, res) => {
  //#swagger.tags=['Cars']
  const car = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    cylinders: req.body.cylinders,
    transmission: req.body.transmission,
    price: req.body.price
  };
  const response = await mongodb.getDatabase().db().collection('cars').insertOne(car);
  if (response.acknowledged) {
    res.status(201).json({
      message: 'Car created successfully',
      id: response.insertedId
    });
  } else {
    const error = new Error('Failed to create car');
    error.status = 500;
    throw error;
  }
});

const updateCar = asyncHandler(async (req, res) => {
  //#swagger.tags=['Cars']
  const carId = new ObjectId(req.params.id);
  const car = {
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    cylinders: req.body.cylinders,
    transmission: req.body.transmission,
    price: req.body.price
  };
  const response = await mongodb.getDatabase().db().collection('cars').replaceOne({ _id: carId }, car);
  if (response.modifiedCount > 0) {
    res.status(200).json({ message: 'Car updated successfully' });
  } else if (response.matchedCount === 0) {
    const error = new Error('Car not found');
    error.status = 404;
    throw error;
  } else {
    const error = new Error('Failed to update car');
    error.status = 500;
    throw error;
  }
});

const deleteCar = asyncHandler(async (req, res) => {
  //#swagger.tags=['Cars']
  const carId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
  if (response.deletedCount > 0) {
    res.status(200).json({ message: 'Car deleted successfully' });
  } else {
    const error = new Error('Car not found');
    error.status = 404;
    throw error;
  }
});

module.exports = {
  getAll,
  getSingle,
  createCar,
  updateCar,
  deleteCar
};