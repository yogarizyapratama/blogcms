const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', auth, userController.create);
router.patch('/:id', auth, userController.update);
router.delete('/:id', auth, userController.delete);

module.exports = router;
