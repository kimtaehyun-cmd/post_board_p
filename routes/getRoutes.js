const express = require('express');
const { getAllPosts, getPostById } = require('../controllers/postsController');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/', getPostById);

module.exports = router;
