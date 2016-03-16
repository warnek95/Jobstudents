var express = require('express');
var router = express.Router();
var SearchController = require('../controllers/SearchController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.session = req.session;
    res.render('search');
});

module.exports = router;
