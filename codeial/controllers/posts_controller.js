// // const Post = require('../models/post');

// // module.exports.create = function(req, res){
// //     Post.create({
// //         content: req.body.content,
// //         user: req.user._id,
// //     }, function(err, post){
// //         if (err){console.log("Error in posting the status."); return;}
// //         return res.redirect('back');
// //     })
// // }


// const Post = require('../models/post');
// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if (err){console.log("Error in creating a post"); return;}
//         return res.redirect('back');
//     })
// }

const Post = require('../models/post')

module.exports.create = function(req, res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    }, function(err, post){
        if(err){console.log('error in creating a post'); return;}

        return res.redirect('back');
    });
}

// save and run  save n rundone done its working any thing else
// I didnt understand what was wrong? u dint pass user in post router passport.checkauthentication passes user InputDeviceInfo
// but this is arpan's sir code mine was working yesterday but not today so i used his code and even it wasn't working
// // bro what will i know ki what u made yesterday in this code u dint use passport auth for posts so error came 
// can you point out where in t