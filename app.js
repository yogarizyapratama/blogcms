require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { mongoUri } = require('./config');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');
const pageViewRoutes = require('./routes/pageView');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
}));


app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/article', articleRoutes);
app.use('/page-view', pageViewRoutes);
app.get('/', (req, res) => res.json({ message: 'API is running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
