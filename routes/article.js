const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const auth = require('../middlewares/auth');

const authOptional = require('../middlewares/authOptional');

router.get('/', authOptional, articleController.getAll);
router.get('/:id', authOptional, articleController.getOne);
router.post('/', auth, articleController.create);
router.patch('/:id', auth, articleController.update);
router.delete('/:id', auth, articleController.delete);

module.exports = router;
