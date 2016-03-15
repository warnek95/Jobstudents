var User = require('../models/User.js');

module.exports = {
  signup : function(req,res,next){
    // console.log(req.session)
    verification(req.body,function (err) {
      console.log(err);
      if (err.errEmail || err.errPassword) {
        req.session.err = err;
        res.redirect('/');
      } else {
        encrypt(req.body.password, function (password) {
          req.body.password = password;
          create(req.body,function (err,user) {
            if (err) {
              console.log(err.toString());
              req.session.err = {
                errEmail : err.toString()
              };
              res.redirect('/');
            }
            else {
              req.session.User = user;
              req.session.authenticated = true;
              res.locals.session = req.session;
              res.locals.csrfToken = req.csrfToken();
              res.redirect('/');
            }
          })
        })
      }
    })
  },
  resSignup : function(req,res,next) {
    res.locals.csrfToken = req.csrfToken();
    res.render('user/signup');
  }
};

function encrypt(password,next) {
  var Passwords = require('machinepack-passwords');

  // Encrypt a string using the BCrypt algorithm.

  Passwords.encryptPassword({

    password: password,

  }).exec({

    // An unexpected error occurred.

    error: function (err){
      console.console.log(err);
      res.redirect('/');
    },

    // OK.

    success: function (result){
      next(result);
    },

  });
}

function verification(user,next){
  var err = {};
  err.errEmail = ( user.email != user.emailConfirmation ) ? "email" : false
  err.errPassword = ( user.password != user.passwordConfirmation ) ? "password" : false
  next(err);
}

function create(user,next){
  user = new User(user)
  user.save(function (err){
    next(err,user);
  })
}

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
