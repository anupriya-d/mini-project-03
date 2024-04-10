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
pokemonRoute.get('/pokemon/', (req, res) => {
    Controllers.pokemonController.getPokemons(res);
    })
    

pokemonRoute.get('/pokemon/:id', (req, res) => {
        Controllers.pokemonController.getPokemonById(req, res);
});

pokemonRoute.get('/pokemon&move/:id', (req, res) => {
    Controllers.pokemonController.getPokemonWithMoves(req, res);
});

pokemonRoute.get('/pokemon/page/:pageNumber', async (req, res) => {
    const pageNumber = parseInt(req.params.pageNumber);
    const pageSize = 3; // Number of Pokémon per page

    const result = await Controllers.pokemonController.getPokemonByPage(pageNumber, pageSize);
    res.status(result.result).send(result);
});

/**********************************************GET MOVE ROUTES**********************************************************************/
pokemonRoute.get('/move/', (req, res) => {
    Controllers.moveController.getMoves(res);
    });

pokemonRoute.get('/move/:id', (req, res) => {
        Controllers.moveController.getMoveById(req, res);
    });

pokemonRoute.post('/pokemon/create', (req, res) => {
    Controllers.pokemonController.createPokemon(req.body, res);
    });

// Adds a put route to update  a new user
pokemonRoute.put('/pokemon/:id', (req, res) => {
    Controllers.pokemonController.updatePokemon(req, res);
    });

// Adds a put delete to delete  a new user
pokemonRoute.delete('/pokemon/:id', (req, res) => {
    Controllers.pokemonController.deletePokemon(req, res)
    });

module.exports = pokemonRoute;
