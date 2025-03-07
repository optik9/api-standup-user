require('dotenv').config();
const express = require('express');
const cors = require('cors');
const standupRoutes = require('./routes/standupRoutes');

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET']
}));
app.use(express.json());

// Routes
//app.use('/api/v1/standups', standupRoutes);
//app.use('/api/v1/users', standupRoutes);

app.use('/v1/standups', standupRoutes);
app.use('/v1/users', standupRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//module.exports = app;

export default app;