const User = require('../models/user');

module.exports.profile = function(req, res){
    if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (err){console.log("Error in Authunticating the user."); return;}
            
            if (user){
                return res.render('users', {
                    title: "Users",
                    user: user,
                }) 
            }else{
                return res.redirect('/users/sign-in');
            }
        })
    }else{
        return res.redirect('/users/sign-in');
    }
}




module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Codeial | Sign-up',
    });
}

module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title: 'Codeial | Sign-in',
    });
}

module.exports.create = function(req, res){
    //validate the password and confirm password
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    //find the user using email
    User.findOne({email: req.body.email}, function(err, user){
        if (err){console.log("There's an error in signing up the user!"); return;}
        //if user not found, create account
        if (!user){
            User.create(req.body, function(err, user){
                if (err){console.log("There's an error while signing up."); return;}
                return res.redirect('/users/sign-in');
            })
            //if user found, return back to signup page
        }else{
            return res.redirect('back');
        }
    })
}
module.exports.createSession = function(req, res){
    //locate the user using email id
    User.findOne({email: req.body.email}, function(err, user){
        if (err){console.log("Error in finding the email"); return;}
        //if user found then validate the password
        if (user){
            //if password incorrect, redirect back to the login page
            if (user.password != req.body.password){
                return res.redirect("back");
            }
            //if password matches, store user id in the cookie and render to user profile
            res.cookie("user_id", user.id);
            return res.redirect("/users/profile");
        }else{
            //if user not found, redirect back to sign-in page
            return res.redirect('back');
        }
    })
}

module.exports.signOut = function(req, res){
    let id = req.query.user_id;
    User.findByIdAndDelete(id, function(err){
        if (err){console.log("Error in Signing Out!"); return;}
        res.clearCookie("user_id");
        return res.redirect('/users/sign-in');
    })
}
