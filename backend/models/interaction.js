const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  type: String, // call, email, meeting
  date: Date,
  notes: String
});

module.exports = mongoose.model('Interaction', interactionSchema);
