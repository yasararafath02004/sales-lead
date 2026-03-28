const express = require('express');
const Lead = require('../models/lead');
const auth = require('../middleware/auth');
const roleAuth = require('../middleware/role');
const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Create lead
router.post('/', auth, roleAuth(['SalesRep', 'Admin']), async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json({ message: "Lead added successfully", lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all leads
router.get('/', auth, roleAuth(['SalesRep', 'Admin']), async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update lead
router.put('/:id', auth, roleAuth(['Admin']), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete lead
router.delete('/:id', auth, roleAuth(['Admin']), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper: check duplicates by email or phone
async function filterDuplicates(leads) {
  const uniqueLeads = [];
  for (const lead of leads) {
    const exists = await Lead.findOne({
      $or: [{ email: lead.email }, { phone: lead.phone }]
    });
    if (!exists) {
      uniqueLeads.push(lead);
    }
  }
  return uniqueLeads;
}

// ✅ Bulk import via CSV
router.post('/import/csv', auth, roleAuth(['Admin']), upload.single('file'), async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        const uniqueLeads = await filterDuplicates(results);
        await Lead.insertMany(uniqueLeads);
        res.json({ 
          message: "CSV imported successfully", 
          imported: uniqueLeads.length, 
          skipped: results.length - uniqueLeads.length 
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
});

// ✅ Bulk import via Excel
router.post('/import/excel', auth, roleAuth(['Admin']), upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const uniqueLeads = await filterDuplicates(data);
    await Lead.insertMany(uniqueLeads);
    res.json({ 
      message: "Excel imported successfully", 
      imported: uniqueLeads.length, 
      skipped: data.length - uniqueLeads.length 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
