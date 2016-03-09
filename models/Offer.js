var Offer = require('./OfferSchema.js');

module.exports = {
    create : function(offer,next){
      offer = new Offer(offer)
      offer.save()
      next()
    }
}
