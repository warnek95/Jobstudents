module.exports = {
  index : function(req,res,next){
    console.log(req.session)
    res.locals.session = req.session;
    res.locals.csrfToken = req.csrfToken();
    res.render('index');
  }
};
