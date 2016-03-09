var express = require('express');
var router = express.Router();
var OfferController = require('../controllers/OfferController.js');

router.get('/new', function(req, res, next) {
  res.render('offer/new');
});

module.exports = router;
