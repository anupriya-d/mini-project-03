const mongoose = require('mongoose');

//define fields for pokemon schema
const pokemonSchema = new mongoose.Schema({
    name: String,
    height: Number,
    weight: Number,
    types: [String],
    abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ability' }],
    moves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Move' }]
},{ strictPopulate: false }); //to populate move data with pokemon data by path


module.exports = mongoose.model('Pokemon', pokemonSchema);
