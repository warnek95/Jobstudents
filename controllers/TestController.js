var Test = require('../models/Test.js');

module.exports = {
  new : function(req,res,next){

  },
  resNew : function(req,res,next){
    res.locals.session = req.session;
    res.render('test/new');
  }
};
