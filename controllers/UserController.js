var User = require('../models/User.js');


module.exports = {
  signup : function(req,res,next){
    // console.log(req.session)
    encrypt(req.body.password, function (password) {
      req.body.password = password;
      User.create(req.body,function () {
        next();
      })
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
