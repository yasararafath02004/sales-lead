const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  source: String,
  industry: String,
  leadScore: { type: Number, default: 0 },
  status: { type: String, enum: ['New','Contacted','Qualified','Proposal','Negotiation','Won','Lost'], default: 'New' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
