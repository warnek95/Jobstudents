module.exports = {
  connect : function(){
    var mongoose = require('mongoose');
    var uri = 'mongodb://localhost:27017/jobstudents';
    var options = {
      // db: { native_parser: true },
      // server: { poolSize: 5 },
      // replset: { rs_name: 'myReplicaSetName' },
      user: 'wellHereIAm',
      pass: 'try To F1nd Me N0w'
    }
    mongoose.connect(uri, options);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // we're connected!
      // next();
    });
  }
};
