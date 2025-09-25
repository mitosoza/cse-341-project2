const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello, World!');
});

router.use('/cars', require('./cars'));
router.use('/movies', require('./movies'));

module.exports = router;