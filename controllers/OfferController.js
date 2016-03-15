var Offer = require('../models/Offer.js');

module.exports = {
  new : function(req,res,next){
    Offer.create(req.body,function(){
      res.redirect('/');
    })
  },
  resNew : function(req,res,next) {
    res.locals.csrfToken = req.csrfToken();
    res.render('offer/new');
  }
};
