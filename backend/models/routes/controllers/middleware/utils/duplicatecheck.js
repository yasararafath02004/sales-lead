const Lead = require('../models/Lead');

async function isDuplicate(email, phone) {
  const existing = await Lead.findOne({ $or: [{ email }, { phone }] });
  return !!existing;
}

module.exports = isDuplicate;
