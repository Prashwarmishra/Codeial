//  const passport = require("passport");

//  const LocalStrategy = require("passport-local").Strategy;

//  const User = require("../models/user");
// //authentication using passport
//  passport.use(new LocalStrategy({
//      usernameField: 'email'
//     },
//     function(email, password, done){
//          //find a user and establish an identity
//          User.findOne({email: email}, function(err, user){
//              if (err){
//                  console.log("There's an error in finding the user");
//                  return done(err);
//              }
//              if (!user || user.password != password){
//                  console.log("Invalid username or password");
//                  return (null, false);
//              }
//              if (user){
//                  return done(null, user);
//              }
//          })
//     }
//  ));
// //serialize the user to decide which key is to be kept in the cookies
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// })

// //deserializing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if (err){
//             console.log("There's an error in signing in the user.");
//             return done(err);
//         }
//         return done(null, user);
//     });
// })


// module.exports = passport;


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy({
    usernameField: 'email'
    }, function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if (err){
                console.log("There's an error in finding the user.");
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid username/password");
                return done(null, false);
            }
            if(user){
                return done(null, user);
            }
        })
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err){
            console.log("Error in finding the user");
            return done(err);
        }
        return done(null, user);
    })
});
 
passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');

}
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


// passport.checkAuthentication = function(req, res, next){
//     if (req.isAuthenticated()){
//         return next();
//     }
//     return res.redirect('/users/sign-in');
// }

// passport.setAuthenticatedUser = function(req, res, next){
//     if (req.isAuthenticated()){
//         res.locals.user = req.user; 
//     }
//     next();
// }

module.exports = passport;