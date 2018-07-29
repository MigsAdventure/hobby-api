const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String },
    familyName: { type: String },
    givenName: { type: String },
    name: { type: String },
    imageUrl: { type: String },
    googleId: { type: String },
    perler_cards: [{ type: Schema.Types.ObjectId, ref: 'perler' }],
});

const user = mongoose.model('user', userSchema);

module.exports = user;
