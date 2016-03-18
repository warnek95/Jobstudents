var User = require('../models/User.js');

module.exports = {
  signup : function(req,res,next){
    req.session.errSignup = undefined;
    req.session.formUser = undefined;
    User.findOne({ email: req.body.email }, function (err, user){
      if (!user) {
        verification(req.body,function (err) {
          if (err.errEmail || err.errPassword) {
            req.session.errSignup = err;
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
                  req.session.formUser = {
                    firstName : req.body.firstName,
                    lastName : req.body.lastName
                  };
                  req.session.errSignup = {
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
      }else {
        req.session.formUser = {
          firstName : req.body.firstName,
          lastName : req.body.lastName
        };
        req.session.errSignup = {
          errEmail : "Email already in use"
        };
        res.redirect('/');
      }
    });
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
  },
  edit : function (req,res,next) {
    var fs = require("fs");
    if (req.files) {
      var cvPath = req.files.cv ? '/images/'+req.files.cv[0].filename+'.'+req.files.cv[0].originalname.split(/[\s.]+/)[req.files.cv[0].originalname.split(/[\s.]+/).length-1] : ""
      var motivationLetterPath = req.files.motivationLetter ? '/images/'+req.files.motivationLetter[0].filename+'.'+req.files.motivationLetter[0].originalname.split(/[\s.]+/)[req.files.motivationLetter[0].originalname.split(/[\s.]+/).length-1] : ""
      if(req.files.cv) {
        req.files.cv[0].path = req.files.cv[0].path+'.'+req.files.cv[0].originalname.split(/[\s.]+/)[req.files.cv[0].originalname.split(/[\s.]+/).length-1]
        fs.writeFile("",req.files.cv, function(err) {})
      }
      if(req.files.motivationLetter){
        req.files.motivationLetter[0].path = req.files.motivationLetter[0].path+'.'+req.files.motivationLetter[0].originalname.split(/[\s.]+/)[req.files.motivationLetter[0].originalname.split(/[\s.]+/).length-1]
        fs.writeFile(req.files.motivationLetter, function(err) {})
      }
    }
    if (req.session.User.status == 'recruiter') {
      var update = {
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email     : req.body.email,
        phone     : req.body.phone,
        company   : req.body.company,
        position  : req.body.position
      }
    } else {
      var update = {
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        birthday  : req.body.birthday,
        email     : req.body.email,
        sectorsInterested    : {label : req.body.sectorsInterested},
        diplomes   : {title : req.body.diplomes},
        cv        : cvPath,
        motivationletter : motivationLetterPath,
        interview : req.body.interview,
        links     : {value : req.body.links},
        phone     : req.body.phone
      }
    }
    User.update({_id : req.session.User._id}, update, function () {
      res.redirect('/user/show/'+req.session.User._id)
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
      console.log(err);
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
