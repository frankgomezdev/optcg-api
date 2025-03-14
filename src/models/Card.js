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
    image_url: {
        type: String,
        unique: true
    },
    alternate_art: Boolean,
    series_id: Number,
    card_identifier: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true});

cardSchema.index({ name: 'text', effect: 'text', card_type: 'text'});

module.exports = mongoose.model('Card', cardSchema);