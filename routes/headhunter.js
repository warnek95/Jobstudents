var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/IndexController.js');
var csrf = require('csurf');

var csrfProtection = csrf({ cookie: true })

/* GET Recruiters home page. */
router.get('/',csrfProtection,IndexController.headhunter, function(req, res, next) {

});

module.exports = router;
