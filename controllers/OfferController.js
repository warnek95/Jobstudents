var Offer = require('../models/Offer.js');

module.exports = {
  new : function(req,res,next){
    Offer.create(req.body,function(){
    next();
    })
  }
};
