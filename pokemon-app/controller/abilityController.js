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

const getAbilities = async (req, res) => {
    try {
        const ability = await Ability.find();
        res.json(ability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

  const getAbilityById = async (req, res) => {
    try {
        const ability = await Ability.findById(req.params.id);
        if (!ability) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.json(ability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };

module.exports =
 { populateAbilities,
    getAbilities,
    getAbilityById,
 };
