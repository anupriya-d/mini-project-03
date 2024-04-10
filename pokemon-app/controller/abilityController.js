const { Ability } = require('../models');
const fetchData = require('../libraries/fetchData');

const populateAbilities = async (pokemon, abilities) => {
    for (const ability of abilities) {
        let existingAbility = await Ability.findOne({ name: ability.ability.name });
        if (!existingAbility) {
            const abilityData = await fetchData(ability.ability.url);

            existingAbility = await Ability.create({
                name: ability.ability.name,
                url: ability.ability.url,
                generation: abilityData.generation.name,
                effect: abilityData.effect_entries[1].effect,
                short_effect: abilityData.effect_entries[1].short_effect,
                pokemons: []
            });
        }
        existingAbility.pokemons.push(pokemon);
        await existingAbility.save();
        pokemon.abilities.push(existingAbility);
    }
};

/**********************************************CRUD Operations**********************************************************************/
//1) GET All

let Models = require("../models"); // matches index.js
const getAbilities = (res) => {
    
  Models.Ability.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

//2) GET by id
const getAbilityById = (req, res) => {
 
    Models.Ability.findById(req.params.id)
        .then((data) => res.send({ result: 200, data: data }))
        .catch((err) => {
            console.log(err);
            res.send({ result: 500, error: err.message });
        });
};

module.exports =
 { populateAbilities,
    getAbilities,
    getAbilityById,
 };
