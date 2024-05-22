import express from 'express';
import User from '../models/userModels.mjs';

const router = express.Router();

router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    dob: req.body.dob,
    contact: req.body.contact,
    email: req.body.email,
    description: req.body.description,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});


export default router;
