var User = require('../models/User.js');

module.exports = {
  signin : function(req,res,next){
    console.log(req.body)
    findByEmail(req.body.email,function (err,user) {
      if (user){
        var Passwords = require('machinepack-passwords');

        // Compare a plaintext password attempt against an already-encrypted version.
        Passwords.checkPassword({
          passwordAttempt: req.body.password,
          encryptedPassword: user.password,
        }).exec({
          // An unexpected error occurred.
          error: function (err){
           return console.log("err");
          },
          // Password attempt does not match already-encrypted version
          incorrect: function (){
            req.session.err = {
              errLogin : "Incorrect"
            };
            console.log("Incorrect");
            res.redirect('/');
          },
          // OK.
          success: function (){
            user.id = user._id;
            req.session.User = user;
            console.log(req.session.User)
            console.log(user)
            req.session.authenticated = true;
            res.redirect('/');
          }
        });
      }else{
        req.session.err = {
          errLogin : "Incorrect"
        };
        console.log("Incorrect");
        res.redirect('/');
      }
    })
  },
  signout : function (req,res,next) {
    req.session.destroy();
    res.redirect('/');
  }
};

function findByEmail(email,next){
  User.where({ email: email }).findOne(function (err, user) {
    if (err) return console.log(err);
    if (user) {
      next(false,user);
    }else{
      next(true,user);
    }
  });
}
