var express = require('express');
var router = express.Router();
var path = require('path');
var log = require(path.join(__dirname, '../controllers/test.js')).log;

/* GET home page. */
router.get('/',log, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
