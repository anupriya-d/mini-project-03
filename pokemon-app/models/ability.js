const mongoose = require('mongoose');

//Define fields for abilityschema
const abilitySchema = new mongoose.Schema({
    name: String,
    url: String,
    generation:String,
    effect:String,
    short_effect:String,
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

module.exports = mongoose.model('Ability', abilitySchema);
