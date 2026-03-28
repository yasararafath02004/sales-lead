const Lead = require('../models/lead');

const addLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ message: 'Lead added successfully', lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addLead, getLeads };
