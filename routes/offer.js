var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var OfferController = require('../controllers/OfferController.js');
var csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

router.get('/new',csrfProtection, function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  res.render('offer/new');
});
router.post('/new', parseForm, csrfProtection,OfferController.new, function(req, res, next) {
  res.redirect('/');
});
module.exports = router;
