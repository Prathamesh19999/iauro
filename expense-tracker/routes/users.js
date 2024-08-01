const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

const secret = 'your_jwt_secret'; // Use environment variables in production

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.sendStatus(201);
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.encode({ id: user._id }, secret);
  res.json({ token });
});

module.exports = router;
