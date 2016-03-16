module.exports = {
  index : function(req,res,next){
    res.locals.session = req.session;
    res.locals.err = req.session.err;
    res.locals.firstName = req.session.formUser ? req.session.formUser.firstName : false;
    res.locals.lastName = req.session.formUser ? req.session.formUser.lastName : false;
    req.session.err = undefined;
    req.session.formUser = undefined;
    res.locals.csrfToken = req.csrfToken();
    res.render('index');
  }
};
