const express = require('express');
const router = express.Router();
const { addLead, getLeads } = require('../controllers/leadController');

router.post('/', addLead);
router.get('/', getLeads);

module.exports = router;
