const Post = require("../models/post");
module.exports.home = function(req, res){
    Post.find({}).populate('user').exec(function(err, posts){
        if (err){console.log("There's an error in displaying the status"); return;}
        return res.render('home', {
            title: 'Home',
            posts: posts
        })
    })
}

