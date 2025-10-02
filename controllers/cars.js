const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    const result = await mongodb.getDatabase().db().collection('cars').find();
    const cars = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    const carId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('cars').find({ _id: carId });
    const cars = await result.toArray();

    if (cars.length === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCar = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
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
      res.status(500).json({ error: 'Failed to create car' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCar = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
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
      res.status(404).json({ error: 'Car not found' });
    } else {
      res.status(500).json({ error: 'Failed to update car' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCar = async (req, res) => {
  //#swagger.tags=['Cars']
  try {
    const carId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('cars').deleteOne({ _id: carId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Car deleted successfully' });
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createCar,
  updateCar,
  deleteCar
};