const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
