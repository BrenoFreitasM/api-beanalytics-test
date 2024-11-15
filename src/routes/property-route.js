const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property-controller');
const validateKey = require('../middleware/validadekey');

router.put('/register', validateKey, propertyController.register);

router.post('/update', validateKey, propertyController.update);

router.delete('/:code', validateKey, propertyController.delete)

module.exports = router;