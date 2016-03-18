var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var UserController = require('../controllers/UserController.js');
var csrf = require('csurf');
var multer  = require('multer')
var upload = multer({ dest: 'public/images/' })

// setup route middlewares for csrf
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/signup',csrfProtection, UserController.resSignup, function(req, res, next) {

});

router.post('/signup', parseForm, csrfProtection,UserController.signup, function(req, res, next) {

});

router.get('/show/:id', csrfProtection,UserController.show, function(req, res, next) {

});

router.post('/edit',upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'motivationLetter', maxCount: 1 }]), parseForm, csrfProtection,UserController.edit, function(req, res, next) {

});

router.post('/editRecruiter',csrfProtection,UserController.edit, function(req, res, next) {

});

module.exports = router;
