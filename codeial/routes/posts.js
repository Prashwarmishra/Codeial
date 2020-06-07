const express = require("express");
const router = express.Router();

const postsController = require('../controllers/posts_controller');
router.post('/posts', postsController.posts);

module.exports = router;