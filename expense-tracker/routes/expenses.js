const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const jwt = require('jwt-simple');

const secret = 'your_jwt_secret';

// Middleware to authenticate
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('No token provided');
  try {
    const decoded = jwt.decode(token, secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
});

// Add Expense
router.post('/', async (req, res) => {
  const { amount, category, description } = req.body;
  const expense = new Expense({ user: req.userId, amount, category, description });
  await expense.save();
  res.sendStatus(201);
});

// Get Expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find({ user: req.userId });
  res.json(expenses);
});

// Delete Expense
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
