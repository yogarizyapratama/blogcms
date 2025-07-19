const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');
const authOptional = require('../middlewares/authOptional');

router.get('/', authOptional, articleController.getAll);
router.get('/:id', authOptional, articleController.getOne);
router.post('/',
  auth,
  [
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('content').isString().notEmpty().withMessage('Content is required'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Status must be draft or published'),
  ],
  articleController.create
);
router.patch('/:id',
  auth,
  [
    body('title').optional().isString().notEmpty(),
    body('content').optional().isString().notEmpty(),
    body('status').optional().isIn(['draft', 'published']),
  ],
  articleController.update
);
router.delete('/:id', auth, articleController.delete);

module.exports = router;
