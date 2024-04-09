const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    height: Number,
    weight: Number,
    types: [String],
    abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }],
    moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }]
});

module.exports = mongoose.model('Pokemon', pokemonSchema);