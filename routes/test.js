var express = require('express');
var router = express.Router();
var TestController = require('../controllers/TestController.js');

router.get('/new', function(req, res, next) {
  res.render('test/new');
});

module.exports = router;
