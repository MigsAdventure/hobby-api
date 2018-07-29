const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String },
    perler_cards: [{ type: Schema.Types.ObjectId, ref: 'perler' }],
});

const user = mongoose.model('user', userSchema);

module.exports = user;
