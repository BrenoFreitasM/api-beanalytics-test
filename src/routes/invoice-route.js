const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice-controller');
const validateKey = require('../middleware/validadekey');

router.put('/register', validateKey, invoiceController.register);

router.post('/update', validateKey, invoiceController.update);


module.exports = router;