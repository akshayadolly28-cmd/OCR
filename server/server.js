require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ocr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} [MongoDB connected]`));
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB connection failed. Using mock in-memory database for testing.');
    console.warn('Error:', err.message);
    global.mockDB = require('./services/mockDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} [Mock DB - Testing mode]`));
  });
