var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('headhunter', { title: 'Express' });
    console.log("hihi")
    res.render('headhunter');
});

module.exports = router;
