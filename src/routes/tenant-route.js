const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant-controller');
const validateKey = require('../middleware/validadekey');

router.put('/register', validateKey, tenantController.register);

router.post('/update', validateKey, tenantController.update);

router.delete('/:cpf', validateKey, tenantController.delete)

module.exports = router;