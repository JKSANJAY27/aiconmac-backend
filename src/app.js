// backend-api/src/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import allRoutes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

dotenv.config(); // Load environment variables from .env

const app = express();

// CORS configuration
const allowedOrigins = [
  process.env.CLIENT_MAIN_URL,
  process.env.CLIENT_COMPANY_URL,
  // Add other allowed origins if necessary
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data

// API Routes
app.use('/api', allRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy!' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;