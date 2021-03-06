const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    title   : String,
    degree  : String,
    created : { type: Date, default: Date.now},
    company : String,
    body    : String,
    duration : String,
    contract : String
}, { collection: 'Offers' });
module.exports = mongoose.model('Offer', Schema);
