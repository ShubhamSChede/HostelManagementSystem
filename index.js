const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const hostelRoutes = require('./src/routes/hostelRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes with exact paths from problem statement
app.use('/api/auth', authRoutes);
app.use('/api/hostel', hostelRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});