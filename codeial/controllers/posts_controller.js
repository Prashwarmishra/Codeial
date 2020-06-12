const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id,
    }, function(err, post){
        if (err){console.log("Error in posting the status."); return;}
        return res.redirect('back');
    })
}

module.exports.destory = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){console.log("There's an error while trying to delete the comment"); return;}
        if (post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post: req.params.id}, function(err){
                if (err){console.log("There was an error while trying to delete the post"); return;}
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}
