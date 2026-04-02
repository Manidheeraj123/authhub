const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const connectDB = require('./src/config/db');

connectDB();

const app = express();

app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // 100 requests per 10 mins
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('AuthHub API is running smoothly. Use Postman or your Frontend UI (Port 5173) to interact with the endpoints!'));
app.use('/api/auth', require('./src/routes/authRoutes'));

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
