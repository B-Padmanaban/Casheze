const express = require('express');
const router = express.Router();
const { getAllDevices, getDeviceById, createDevice, updateDevice, deleteDevice } = require('../controllers/device.controllers');

router.get('/', getAllDevices);
router.get('/:id', getDeviceById);
router.post('/', createDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

module.exports = router;