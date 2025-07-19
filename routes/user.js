const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/',
  auth,
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  userController.create
);
router.patch('/:id',
  auth,
  [
    body('name').optional().isString().notEmpty(),
    body('password').optional().isString().isLength({ min: 6 }),
  ],
  userController.update
);
router.delete('/:id', auth, userController.delete);

module.exports = router;
