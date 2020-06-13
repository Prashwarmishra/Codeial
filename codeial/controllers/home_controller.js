const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if (err){console.log("There's an error in displaying the status"); return;}
        User.find({}, function(err, users){
            if (err){console.log("There's an error in displaying the status"); return;}
            return res.render('home', {
            title: 'Home',
            posts: posts,
            all_users: users,
            });
        });  
    })
}

