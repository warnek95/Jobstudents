var Test = require('./TestSchema.js');

module.exports = {
    create : function(test,next){
      test = new Test(test)
      test.save()
      next()
    }
}
