const express = require('express');

const { addService, getService, getServices, updateService, deleteService } = require("../controllers/ServiceController");


const router = express.Router();

router.post('/service', addService);
router.get('/service/:id', getService);
router.get('/services', getServices);
router.patch('/service/:id', updateService);
router.delete('/service/:id', deleteService);


module.exports = router;