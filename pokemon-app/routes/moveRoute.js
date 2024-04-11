const express = require('express');
const moveRoute = express.Router();
let Controllers = require("../controller");

moveRoute.get('/', (req, res) => {
    Controllers.moveController.getMoves(res);
    });

moveRoute.get('/:id', (req, res) => {
    Controllers.moveController.getMoveById(req, res);
    });


// to get pokemon data with move data 
moveRoute.get('/pokemon/:id', (req, res) => {
    Controllers.moveController.getMovesWithPokemon(req, res);
});



module.exports = moveRoute;