var User = require('../models/User.js');

module.exports = {
  signin : function(req,res,next){
    // console.log(req.session)
    findByEmail(req.body.email,res,function (user) {
      var Passwords = require('machinepack-passwords');

      // Compare a plaintext password attempt against an already-encrypted version.
      Passwords.checkPassword({
        passwordAttempt: req.body.password,
        encryptedPassword: user.password,
      }).exec({
        // An unexpected error occurred.
        error: function (err){
         return console.log(err);
        },
        // Password attempt does not match already-encrypted version
        incorrect: function (){
          console.log("Incorrect");
          res.redirect('/');
        },
        // OK.
        success: function (){
          req.session.User = user;
          req.session.authenticated = true;
          res.locals.session = req.session;
          res.locals.csrfToken = req.csrfToken();
          res.redirect('/');
        }
      });
    })
  },
  signout : function (req,res,next) {
    req.session.destroy();
    res.redirect('/');
  }
};

function findByEmail(email,res,next){
  User.where({ email: email }).findOne(function (err, user) {
    console.log(user)
    if (err) return console.log(err);
    if (user) {
      next(user);
    }else{
      res.redirect('/')
    }
  });
}
