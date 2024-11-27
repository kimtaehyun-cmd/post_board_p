const express = require('express');
const { updatePost } = require('../controllers/postsController');

const router = express.Router();

router.patch('/', updatePost);

module.exports = router;
