const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    name: String,
    url:String,
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }]
});

module.exports = mongoose.model('Move', moveSchema);
