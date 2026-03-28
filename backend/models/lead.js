const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  source: { type: String, enum: ['Website', 'Referral', 'Cold Call', 'Email Campaign', 'Social Media', 'Other'], default: 'Other' },
  industry: { type: String },
  leadScore: { type: Number, default: 0 }, // auto-calculated later
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'], 
    default: 'New' 
  },
  notes: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
