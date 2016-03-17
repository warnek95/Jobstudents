const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    title : String,
    questions : [{
      id : String,
      body : String,
      options : [{label : String, id : String}]
    }],
    answers : [{id : String, value : String}]
}, { collection: 'Tests' });
module.exports = mongoose.model('Test', Schema);
