// pokemonRoute.js
const express = require('express');
const pokemonRoute = express.Router();
const { populateCollections } = require('../controller/pokemonController');
let Controllers = require("../controller");

// Define route for populating Pokemon collection
pokemonRoute.get('/populate', async (req, res) => {
    try {
        await populateCollections();
        res.status(200).send('Pokemon collection populated successfully');
    } catch (error) {
        console.error('Error populating Pokemon collection:', error);
        res.status(500).send('Error populating Pokemon collection');
    }
});

/**********************************************GET POKEMON ROUTES**********************************************************************/

// to get all pokemons data
pokemonRoute.get('/', (req, res) => {
    Controllers.pokemonController.getPokemons(res);
    })
// to get pokemon data by id  
pokemonRoute.get('/:id', (req, res) => {
        Controllers.pokemonController.getPokemonById(req, res);
});

// to get pokemon data with move data 
pokemonRoute.get('/move/:id', (req, res) => {
    Controllers.pokemonController.getPokemonWithMoves(req, res);
});

// to get pokemon data by page(each page includes 3 pokemons)
pokemonRoute.get('/page/:pageNumber', async (req, res) => {
    const pageNumber = parseInt(req.params.pageNumber);
    const pageSize = 3; 

    const result = await Controllers.pokemonController.getPokemonByPage(pageNumber, pageSize);
    res.status(result.result).send(result);
});

// to create pokemon 
pokemonRoute.post('/create', (req, res) => {
    Controllers.pokemonController.createPokemon(req.body, res);
    });

// to update a pokemon
pokemonRoute.put('/:id', (req, res) => {
    Controllers.pokemonController.updatePokemon(req, res);
    });

// to delete a pokemon
pokemonRoute.delete('/:id', (req, res) => {
    Controllers.pokemonController.deletePokemon(req, res)
    });

module.exports = pokemonRoute;
