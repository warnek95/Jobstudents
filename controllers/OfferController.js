var Offer = require('../models/Offer.js');

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
    Offer.findOne({id:req.params.id},function(err, offer){
      console.log(offer);
      if(err) return console.log(err);
      if(offer){
        res.locals.session = req.session;
        res.locals.offer = offer;
        res.render('offer/show')
      }else {
        res.locals.session = req.session;
        res.locals.offer = offer;
        res.render('offer/show')
      }
    });
    console.log(req.params.q);
  }
};
