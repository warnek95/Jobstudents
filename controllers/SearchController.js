var Offer = require('../models/Offer.js');
var Test = require('../models/Test.js');
var User = require('../models/User.js');

module.exports = {
  search : function(req,res,next){
    console.log("bjij");
    if (req.body.type == "users") {
      User.find({$or:[ {firstName:new RegExp(req.body.query,'i')}, {lastName:new RegExp(req.body.query,'i')} ]},function(err, users){
        if(err) return console.log(err);
        if(users){
          res.locals.session = req.session;
          res.locals.users = users;
          res.render('search')
        }else {
          res.locals.session = req.session;
          res.locals.users = users;
          res.render('search')
        }
      });
    } else if (req.body.type == "offers") {
      Offer.find({$or:[ {title:new RegExp(req.body.query,'i')}, {body:new RegExp(req.body.query,'i')} ]},function(err, offers){
        if(err) return console.log(err);
        if(offers){
          res.locals.session = req.session;
          res.locals.offers = offers;
          res.render('search')
        }else {
          res.locals.session = req.session;
          res.locals.offers = offers;
          res.render('search')
        }
      });
    }
    // res.locals.session = req.session;
    // res.render("search");
  }
};
