var express = require('express');
var router = express.Router();
var TestController = require('../controllers/TestController.js');

router.get('/new',TestController.resNew, function(req, res, next) {

});

router.post('/new', function(req, res, next) {

});

module.exports = router;
