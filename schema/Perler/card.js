const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const perlerSchema = new Schema({
    url: { type: String },
    owner: String
});

const Card = mongoose.model('Card', perlerSchema);

module.exports = Card;
