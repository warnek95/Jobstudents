var Offer = require('../models/Offer.js');

module.exports = {
  new : function(req,res,next){
    Offer.create(req.body,function(){
    next();
    })
  function getAllOffer(res,next){
    Offer.findOne(function(err, user){
      console.log(offer);
        if(offer) return console.log(err);
        if(offer){
          next(offer);
        }else {
          res.redirect('/')
        }
      });
    }
