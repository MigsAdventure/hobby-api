const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const perlerSchema = new Schema({
    url: { type: String },
    owner: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const perler = mongoose.model('perler', perlerSchema);

module.exports = perler;
