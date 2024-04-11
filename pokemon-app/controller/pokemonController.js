"use strict";
const { populateAbilities} = require('../controller/abilityController');
const {populateMoves} = require('../controller/moveController')
const { Pokemon } = require('../models');
const fetchData = require('../libraries/fetchData');
        // Define an asynchronous function named populateCollections responsible for populating a collection of Pokemon data.
const populateCollections = async () => {
    try {
        const pokemonsData = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=100');
        // Fetch Pokémon data from the provided API endpoint.
        for (const pokemonData of pokemonsData.results) {  // Iterate over each Pokemon to extract data
            const pokemon = await fetchData(pokemonData.url);
            // Fetch aditional  data for each Pokemon using its specific url
            const newPokemon = await Pokemon.create({
                name: pokemon.name,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types.map(type => type.type.name),// Extract and assign types.
                abilities: [],
                moves: []
            });
            // Populate Pokemon abilities and moves  
            await populateAbilities(newPokemon, pokemon.abilities);
            await populateMoves(newPokemon, pokemon.moves);

            await newPokemon.save(); //save created new pokemon object in database 
        }
        console.log("Pokemon Collection Populated Successfully");
    } catch (error) {
        console.error('Error populating Pokemon collection:', error);
    }
};




/*------------------------------------CRUD Operations Pokemons-------------------------------------------------*/
//1) GET All
let Models = require("../models"); // matches index.js
const getPokemons = (res) => {
  // finds all users
  Models.Pokemon.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//2) GET by id
const getPokemonById = (req, res) => {
 
    Models.Pokemon.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


//3) GET pokemon data with moves data
const getPokemonWithMoves = (req, res) => {
 
    Models.Pokemon.findById(req.params.id)
    .populate({ path: 'moves',select:'name url power accuracy contest_type damage_class generation'})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
        console.log(err);
        res.status(500).send({ result: 500, error: err.message });
    });

};

//4) GET pokemon data by page
const getPokemonByPage = async (pageNumber, pageSize) => {
    try {
        const skip = (pageNumber - 1) * pageSize; //find how many docs to skip from position
        const pokemonData = await Models.Pokemon.find()
            .skip(skip)
            .limit(pageSize)
        return { result: 200, data: pokemonData };
    } catch (err) {
        console.error(err);
        return { result: 500, error: 'Internal server error' };
    }
};

//5) create  a new pokemon 
const createPokemon = (data, res) => {
    console.log(data);
    new Models.Pokemon(data)
      .save()
      .then((data) => res.send({ result: 200, data: data }))
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  };


//6) update  a  pokemon by id 
const updatePokemon = (req, res) => {
    console.log(req.body);
    Models.Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then((data) => res.send({ result: 200, data: data }))
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  };


  const deletePokemon = (req, res) => {
    // deletes the user matching the ID from the param
    Models.Pokemon.findByIdAndDelete(req.params.id)
      .then((data) => res.send({ result: 200, data: data }))
      .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
      });
  };
   



module.exports = {   
    getPokemons,
    getPokemonById,
    getPokemonWithMoves,
    populateCollections,
    getPokemonByPage,
    createPokemon,
    updatePokemon,
    deletePokemon 
};
