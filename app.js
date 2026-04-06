const express = require('express');
const app = express();
require('dotenv').config(); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
const authRoutes = require('./src/routes/authroutes');
const userRoutes = require('./src/routes/userRoutes');
const recordRoutes = require('./src/routes/recordRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/records', recordRoutes);
app.use('/dashboard', dashboardRoutes);

module.exports = app;