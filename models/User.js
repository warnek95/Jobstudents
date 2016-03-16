const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    password  : String,
    birthday  : { type: Date }, //job searcher
    email     : {
      type: String,
      unique: true,
      index: true,
      dropDups: true,
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: '{VALUE} is not a valid email!'
      }
    },
    sectorsInterested    : [{ label: String}], //job searcher
    diplomes   : [{title : String,date : { type: Date },done : String}], //job searcher
    cv        : String, //job searcher
    motivationletter : String, //job searcher
    interview : String, //job searcher
    links     : [{value : String}], //job searcher
    phone     : String,
    company   : String, //recruiter
    position  : String, //recruiter
    status    : String
}, { collection: 'Users' });
module.exports = mongoose.model('User', Schema);
