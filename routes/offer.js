var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var OfferController = require('../controllers/OfferController.js');
var Policies = require('../policies/policies.js');
var csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

router.get('/new',csrfProtection,Policies.isRecruiter,OfferController.resNew, function(req, res, next) {

});
router.post('/new', parseForm, csrfProtection,OfferController.new, function(req, res, next) {

});
router.get('/search/:q', OfferController.find, function(req, res, next) {

});
module.exports = router;
