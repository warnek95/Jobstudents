module.exports = {
  index : function(req,res,next){
    res.locals.session = req.session;
    res.locals.errLogin = req.session.errLogin;
    res.locals.errSignup = req.session.errSignup;
    res.locals.firstName = req.session.formUser ? req.session.formUser.firstName : false;
    res.locals.lastName = req.session.formUser ? req.session.formUser.lastName : false;
    res.locals.email = req.session.formUser ? req.session.formUser.email : false;
    req.session.errLogin = undefined;
    req.session.errSignup = undefined;
    req.session.formUser = undefined;
    res.locals.csrfToken = req.csrfToken();
    res.render('index');
  },
  headhunter : function(req,res,next){
    res.locals.session = req.session;
    res.locals.errLogin = req.session.errLogin;
    res.locals.errSignup = req.session.errSignup;
    res.locals.firstName = req.session.formUser ? req.session.formUser.firstName : false;
    res.locals.lastName = req.session.formUser ? req.session.formUser.lastName : false;
    res.locals.email = req.session.formUser ? req.session.formUser.email : false;
    req.session.errLogin = undefined;
    req.session.errSignup = undefined;
    req.session.formUser = undefined;
    res.locals.csrfToken = req.csrfToken();
    res.render('headhunter');
  },
  test : function(req,res,next){
    res.locals.session = req.session;
    res.locals.errLogin = req.session.errLogin;
    res.locals.errSignup = req.session.errSignup;
    res.locals.firstName = req.session.formUser ? req.session.formUser.firstName : false;
    res.locals.lastName = req.session.formUser ? req.session.formUser.lastName : false;
    res.locals.email = req.session.formUser ? req.session.formUser.email : false;
    req.session.errLogin = undefined;
    req.session.errSignup = undefined;
    req.session.formUser = undefined;
    res.locals.csrfToken = req.csrfToken();
    res.render('test');
  }
};
