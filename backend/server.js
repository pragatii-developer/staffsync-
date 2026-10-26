const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { performanceMonitor } = require('./middleware/performanceMiddleware');
const authRoutes = require('./routes/authRoutes');
const hrmRoutes = require('./routes/hrmRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(performanceMonitor);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'StaffSync HRM API', timestamp: new Date().toISOString() });
});
app.use('/api/auth', authRoutes);
app.use('/api/hrm', hrmRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`[StaffSync Server] Running on port ${PORT}`));
  });
}

module.exports = app;
