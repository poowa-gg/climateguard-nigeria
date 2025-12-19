import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.js';
import alertRoutes from './routes/alerts.js';
import diseaseRoutes from './routes/disease.js';
import securityRoutes from './routes/security.js';
import authRoutes from './routes/auth.js';
import { initDatabase } from './database/init.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
await initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/disease', diseaseRoutes);
app.use('/api/security', securityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ClimateGuard API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 ClimateGuard API running on port ${PORT}`);
});
