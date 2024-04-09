const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
    name: String,
    url: String,
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

module.exports = mongoose.model('Ability', abilitySchema);
