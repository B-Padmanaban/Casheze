const express = require('express');
const router = express.Router();
const { createQuote, getUserQuotes } = require('../controllers/quote.controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createQuote);
router.get('/', authMiddleware, getUserQuotes);

module.exports = router;