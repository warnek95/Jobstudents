var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var csrf = require('csurf');
var IndexController = require('../controllers/IndexController.js');
var SessionController = require('../controllers/SessionController.js');
var SearchController = require('../controllers/SearchController.js');

var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/',csrfProtection,IndexController.index, function(req, res, next) {

});

router.post('/signin',parseForm,csrfProtection,SessionController.signin, function(req, res, next) {

});

router.get('/signout', SessionController.signout, function(req, res, next) {

});

router.post('/search',SearchController.search, function(req, res, next) {

});

router.get('/test',csrfProtection,IndexController.test, function(req, res, next) {

});

module.exports = router;
