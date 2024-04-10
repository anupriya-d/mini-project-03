const { Move } = require('../models');
const fetchData = require('../libraries/fetchData');

const populateMoves = async (pokemon, moves) => {
    for (const move of moves) {
        let existingMove = await Move.findOne({ name: move.move.name });
        if (!existingMove) {
            const moveData = await fetchData(move.move.url);

            let contestType = null;
            if (moveData && moveData.contest_type) {
                contestType = moveData.contest_type.name;
            }

            existingMove = await Move.create({
                name: moveData.name,
                url: move.move.url,
                power: moveData.power,
                accuracy: moveData.accuracy,
                contest_type: contestType,
                damage_class: moveData.damage_class.name,
                generation: moveData.generation.name,
                pokemons: []
            });
        }
        existingMove.pokemons.push(pokemon);
        await existingMove.save();
        pokemon.moves.push(existingMove);
    }
};

/**********************************************GET MOVE ROUTES**********************************************************************/
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


module.exports = { populateMoves ,getMoves,getMoveById};
