const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        index: true
    },
    rarity: String,
    type: String,
    attribute: String,
    power: Number,
    color: String,
    card_type: String,
    effect: String,
    image_url: String,
    alternate_art: Boolean,
    series_id: Number
}, { timestamps: true});

cardSchema.index({ name: 'text', effect: 'text', card_type: 'text'});

module.exports = mongoose.model('Card', cardSchema);