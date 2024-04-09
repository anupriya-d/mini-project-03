const axios = require('axios');
const { Pokemon, Ability, Move } = require('../models');

const fetchData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// Populate MongoDB collections
const populateCollections = async () => {
    // Fetch 100 Pokemon
    const pokemonsData = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=100');

    for (const pokemonData of pokemonsData.results) {
        const pokemon = await fetchData(pokemonData.url);

        // Insert Pokemon data
        const newPokemon = await Pokemon.create({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types.map(type => type.type.name),
            abilities: [],
            moves: []
        });

        // Insert abilities data
        for (const ability of pokemon.abilities) {
            let existingAbility = await Ability.findOne({ name: ability.ability.name });
            if (!existingAbility) {
                existingAbility = await Ability.create({
                    name: ability.ability.name,
                    url:ability.ability.url,
                    pokemons: []
                });
            }
            existingAbility.pokemons.push(newPokemon);
            await existingAbility.save();
            newPokemon.abilities.push(existingAbility);
        }

        // Insert moves data
        for (const move of pokemon.moves) {
            let existingMove = await Move.findOne({ name: move.move.name });
            if (!existingMove) {
                existingMove = await Move.create({
                    name: move.move.name,
                    url:move.move.url,
                    pokemons: []
                });
            }
            existingMove.pokemons.push(newPokemon);
            await existingMove.save();
            newPokemon.moves.push(existingMove);
        }

        // Save the updated Pokemon document
        await newPokemon.save();
    }
};

populateCollections().then(() => {
    console.log('Collections populated successfully');
}).catch(error => {
    console.error('Error populating collections:', error);
});


//CRUD Operations 

const getPokemonById = async (req, res) => {
  try {
      const pokemon = await Pokemon.findById(req.params.id);
      if (!pokemon) {
          return res.status(404).json({ message: 'Pokemon not found' });
      }
      res.json(pokemon);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

module.exports = {
    populateCollections,
    getPokemonById
};
