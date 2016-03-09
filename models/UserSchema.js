const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    firstName : String,
    lastName  : String,
    password  : String,
    birthday  : { type: Date },
    email     : String,
    sectorsInterested    : [{ label: String}],
    diplomes   : [{title : String,date : { type: Date },done : String}],
    cv        : String,
    motivationletter : String,
    interview : String,
    links     : [{value : String}],
    phone     : String,
    company   : String,
    position  : String
}, { collection: 'Users' });
module.exports = mongoose.model('User', Schema);
