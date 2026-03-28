const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Import routes
const userRoutes = require('./routes/user');       // register/login
const leadRoutes = require('./routes/leadroutes'); // leads

// ✅ Mount routes
app.use('/', userRoutes);
app.use('/leads', leadRoutes);

// ✅ Connect to MongoDB (with error handling)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Start server (always runs, even if DB fails)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
