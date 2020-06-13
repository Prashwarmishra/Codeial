const User = require('../models/user');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err){console.log("There's an error while trying to load friemds list"); return;}
        return res.render('users', {
            title: 'Profile',
            profile_user: user,
        });
    })
    
}

module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_up', {
        title: 'Codeial | Sign-up',
    });
}

module.exports.signIn = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign_in', {
        title: 'Codeial | Sign-in',
    });
}

module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if (err){console.log("Error in finding user while signing up"); return;}

        if (!user){
            User.create(req.body, function(err, user){
                if (err){console.log("Error in signing up the user"); return;}
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect("back");
        }
    })
     
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect("/");
}