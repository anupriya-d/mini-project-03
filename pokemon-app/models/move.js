const mongoose = require('mongoose');

//Define fields for move schema
const moveSchema = new mongoose.Schema({
    name: String,
    url:String,
    power:Number,
    accuracy:Number,
    contest_type:String,
    damage_class:String,
    generation:String,
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
},{ strictPopulate: false });

module.exports = mongoose.model('Move', moveSchema);
