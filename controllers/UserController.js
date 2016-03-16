var User = require('../models/User.js');

module.exports = {
  signup : function(req,res,next){
    req.session.err = undefined;
    req.session.formUser = undefined;
    // console.log(req.session)
    verification(req.body,function (err) {
      if (err.errEmail || err.errPassword) {
        req.session.err = err;
        req.session.formUser = {
          firstName : req.body.firstName,
          lastName : req.body.lastName
        };
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
              res.redirect('/user/show/'+user.id);
            }
          })
        })
      }
    })
  },
  resSignup : function(req,res,next) {
    res.locals.csrfToken = req.csrfToken();
    res.locals.session = req.session;
    res.render('user/signup');
  },
  show : function (req,res,next) {
    findById(req.params.id,function (err,user) {
      if (user){
        res.locals.session = req.session;
        res.locals.user = user;
        res.locals.csrfToken = req.csrfToken();
        res.render('user/show');
      }else{
        req.session.err = {
          errNotFound : "Not found"
        };
        res.locals.session = req.session;
        res.locals.errNotFound = "Not found";
        res.locals.csrfToken = req.csrfToken();
        res.render('user/show');
      }
    })
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

function findById(id,next){
  User.where({ _id: id }).findOne(function (err, user) {
    if (err) return console.log(err);
    if (user) {
      next(false,user);
    }else{
      next(true,user);
    }
  });
}
