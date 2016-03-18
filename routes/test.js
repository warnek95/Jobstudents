var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var TestController = require('../controllers/TestController.js');

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

router.get('/new',csrfProtection,TestController.resNew, function(req, res, next) {

});

router.post('/new', parseForm, csrfProtection, function(req, res, next) {

});

module.exports = router;
