const mongoose = require('mongoose');
mongoose.set('debug', true);

const Schema = mongoose.Schema;
const cardSchema = new Schema({
    url: { type: String },
    user: { type: String },
});

const Card = mongoose.model('Card', cardSchema, 'cards');

module.exports = Card;
