module.exports = {
  isRecruiter : function(req,res,next){
    if (req.session.authenticated) {
      if (req.session.User.status == 'recruiter') {
        next();
      } else {
        console.log("Applicant");
        res.redirect('/');
      }
    } else {
      console.log("Not logged");
      res.redirect('/');
    }
  }
};
