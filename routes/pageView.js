const express = require('express');
const router = express.Router();
const pageViewController = require('../controllers/pageViewController');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');

router.post('/',
  [
    body('article').isString().notEmpty().withMessage('Article ID is required'),
  ],
  pageViewController.track
);
router.get('/count', auth, pageViewController.count);
router.get('/aggregate-date', auth, pageViewController.aggregateDate);

module.exports = router;
