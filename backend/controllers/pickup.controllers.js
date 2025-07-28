const Pickup = require('../models/Pickup');

exports.schedulePickup = async (req, res) => {
  try {
    const newPickup = await Pickup.create(req.body);
    res.status(201).json(newPickup);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ userId: req.params.userId });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePickupStatus = async (req, res) => {
  try {
    const updated = await Pickup.findByIdAndUpdate(req.params.pickupId, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
