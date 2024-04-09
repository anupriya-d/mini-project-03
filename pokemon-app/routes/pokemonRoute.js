const express = require('express');
const pokemonRoute = express.Router();
const { pokemonController } = require('../controller');
const pokemon = require('../models/pokemon');

pokemonRoute.get('/populate', pokemonController.populateCollections);

pokemonRoute.get('/pokemon/:id', pokemonController.getPokemonById);

module.exports = pokemonRoute;
