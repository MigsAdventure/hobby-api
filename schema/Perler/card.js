const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const perlerSchema = new Schema({
    url: { type: String },
    owner: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const card = mongoose.model('card', perlerSchema);

module.exports = card;
