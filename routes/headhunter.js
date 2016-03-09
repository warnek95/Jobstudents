var express = require('express');
var router = express.Router();

/* GET Recruiters home page. */
router.get('/', function(req, res, next) {
    //res.render('headhunter', { title: 'Express' });
    res.render('headhunter');
});

module.exports = router;
