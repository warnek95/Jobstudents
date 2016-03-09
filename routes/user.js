var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var csrf = require('csurf')

// setup route middlewares for csrf
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/signup',csrfProtection, function(req, res, next) {
  res.render('user/signup', { csrfToken: req.csrfToken() });
});

router.post('/signup', parseForm, csrfProtection,UserController.signup, function(req, res, next) {
  res.redirect('/user/signup');
});

module.exports = router;
