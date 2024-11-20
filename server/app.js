require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
