var User = require('./UserSchema.js');


module.exports = {
    create : function(user,next){
      user = new User(user)
      user.save()
      next()
    }
}
