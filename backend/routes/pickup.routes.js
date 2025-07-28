const express = require('express');
const router = express.Router();
const { schedulePickup, getUserPickups } = require('../controllers/pickup.controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, schedulePickup);
router.get('/', authMiddleware, getUserPickups);

module.exports = router;