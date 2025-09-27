const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');
const {
  validateCarData,
  validateObjectId
} = require('../middleware/validation');

router.get('/', carsController.getAll);

router.get('/:id', validateObjectId, carsController.getSingle);

router.post('/', validateCarData, carsController.createCar);

router.put('/:id', validateObjectId, validateCarData, carsController.updateCar);

router.delete('/:id', validateObjectId, carsController.deleteCar);

module.exports = router;