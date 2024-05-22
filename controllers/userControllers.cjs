const User = require('../models/userModels.cjs');

exports.createUser = async (req, res) => {
  try {
    const { name, dob, contact, email, description } = req.body;
    const newUser = new User({ name, dob, contact, email, description });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
