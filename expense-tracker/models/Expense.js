const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
