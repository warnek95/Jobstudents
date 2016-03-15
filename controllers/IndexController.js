module.exports = {
  index : function(req,res,next){
    res.locals.session = req.session;
    res.locals.csrfToken = req.csrfToken();
    res.render('index');
  }
};
