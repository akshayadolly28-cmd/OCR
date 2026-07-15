const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', routes);

app.get('/', (req, res) => res.send('API running'));

// Error handler
app.use(errorHandler);

module.exports = app;
