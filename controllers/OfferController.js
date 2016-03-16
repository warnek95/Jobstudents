var Offer = require('../models/OfferSchema.js');

module.exports = {
  new : function(req,res,next){
    Offer.create(req.body,function(){
      res.redirect('/');
    })
  },
  resNew : function(req,res,next) {
    res.locals.session = req.session;
    res.locals.csrfToken = req.csrfToken();
    res.render('offer/new');
  },
  find : function(req,res,next) {
    Offer.findOne({title:new RegExp(req.params.q,'i')},function(err, offer){
      console.log(offer);
      if(err) return console.log(err);
      if(offer){
        next(offer);
        res.locals.session = req.session;
        res.locals.offer = offer;
        res.render('search')
      }else {
        res.locals.session = req.session;
        res.locals.offer = offer;
        res.render('search')
      }
    });
    console.log(req.params.q);
  }
};
