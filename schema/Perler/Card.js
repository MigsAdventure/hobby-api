const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cardSchema = new Schema({
    url: { type: String },
    owner: String,
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
