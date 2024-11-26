const express = require('express');
const { createPost } = require('../controllers/postsController');

const router = express.Router();

router.post('/', createPost);

module.exports = router;
