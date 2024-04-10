const express = require('express');
const abilityRoute = express.Router();
let Controllers = require("../controller");

abilityRoute.get('/', (req, res) => {
    Controllers.abilityController.getAbilities(res);
    });

    abilityRoute.get('/:id', (req, res) => {
    Controllers.abilityController.getAbilityById(req, res);
    });


    

module.exports = abilityRoute;