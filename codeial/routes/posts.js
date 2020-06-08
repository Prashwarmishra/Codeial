// const express = require("express");
// const router = express.Router();

// const postsController = require("../controllers/posts_controller");

// router.post('/create', postsController.create);

// module.exports = router;
const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication, postsController.create); //save and run here okay, but this wasn't taught as of now huh idk about that 
// but simpe how will the post controller know who is user u have to pass know so u used passport so pass it . Understood, thanks a lot! welcome:)


module.exports = router;

// bro u have used pass[ort no ]?dodou type again? I

// u have used passport no yes