const { Move } = require('../models');
const fetchData = require('../libraries/fetchData');

const populateMoves = async (pokemon, moves) => {
    for (const move of moves) { 
        //iterate through moves and try to find if exiting available 
        let existingMove = await Move.findOne({ name: move.move.name }); 
        if (!existingMove) {
            const moveData = await fetchData(move.move.url);
            //proceed to create new if not exiting one found and exatract additional data using url provided
            let contestType = null;
            if (moveData && moveData.contest_type) {
                contestType = moveData.contest_type.name;
            } //condition to Handle contest_type null values 

            existingMove = await Move.create({
                name: moveData.name,
                url: move.move.url,
                power: moveData.power,
                accuracy: moveData.accuracy,
                contest_type: contestType,
                damage_class: moveData.damage_class.name,
                generation: moveData.generation.name,
                pokemons: []
            }); //create new move 
        }
        existingMove.pokemons.push(pokemon); //updating existing moves , savings changes 
        await existingMove.save();
        pokemon.moves.push(existingMove); //updating pokemon's moves 
    }
};

/**********************************************CRUD Operations**********************************************************************/
//1) GET All

let Models = require("../models"); // matches index.js
const getMoves = (res) => {
  // finds all moves
  Models.Move.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//2) GET by id
const getMoveById = (req, res) => {
 
    Models.Move.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};


//3) GET move data with pokemons data
const getMovesWithPokemon = (req, res) => {
 
    Models.Move.findById(req.params.id)
    .populate({ path: 'pokemons',select:'name height weight types'})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
        console.log(err);
        res.status(500).send({ result: 500, error: err.message });
    });

};



module.exports = {
     populateMoves,
     getMoves,
     getMoveById,
     getMovesWithPokemon 
    };
