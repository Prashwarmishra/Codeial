// const express = require("express");
// const router = express.Router();

// const postsController = require("../controllers/posts_controller");

// router.post('/create', postsController.create);

// module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication, postsController.create); //save and run


module.exports = router;

// bro u have used pass[ort no ]?dodou type again? I

// u have used passport no yes