const Quote = require('../models/Quote');

exports.createQuote = async (req, res) => {
  try {
    const { brand, model, condition, issues } = req.body;

    const quote = new Quote({
      user: req.user._id,
      brand,
      model,
      condition,
      issues
    });

    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create quote' });
  }
};

exports.getUserQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ user: req.user._id });
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};
