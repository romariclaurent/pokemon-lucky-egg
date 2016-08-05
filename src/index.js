// internal dependencies
const { get, allPokemonsIDS, countPokemons, availableCandies, countLuckyEggs } = require('./inventory');

const pokemonFR = require('pokemon-french');
const pokemonDB = require('../pokemons.json');
const uniq = require('lodash/uniq');
const evolver = require('./evolver');

const chalk = require('chalk');

function pokemonData(id) {
  return {
    id,
    nameFR: pokemonFR[id],
    nameEN: pokemonDB[id].label,
    evolveCost: pokemonDB[id].candies,
    evolvesTo: pokemonDB[id].evolves,
  };
}


function printTip(pokemon) {
  var count = pokemon.count.toString();
  var transfer = pokemon.transfer.toString();
  var evolve = pokemon.evolve.toString();
  var candiesAvailable = pokemon.candiesAvailable.toString();
  var name = pokemon.nameEN;
  var tip = `${ chalk.red(count + ' ' + name) } ${chalk.gray(candiesAvailable + ' candies')}${ pokemon.transfer ? `
${ '  - ' + 'transfer' } ${chalk.red(transfer) }` : '' }
  - ${ 'evolve' } ${ chalk.red(evolve) }
  `;
  console.log(tip);
}

// main code
get()
  .then(inventory => {

      const luckyEggCount = countLuckyEggs(inventory);

      console.log(`\nyou have ${chalk.red(luckyEggCount + ' lucky eggs')} \n`);

      const userPokemonIds = allPokemonsIDS(inventory);
      const userPokemonCount = countPokemons(userPokemonIds);
      const userCandies = availableCandies(inventory);

      return uniq(userPokemonIds)
        .map(id => {
          const pokemon = pokemonData(id);
          const count = userPokemonCount[id];
          const candiesAvailable = userCandies[id];
          const evolveData = evolver({
            evolveCandyCost: pokemon.evolveCost,
            availableCandies: candiesAvailable || 0,
            availablePokemons: count
          });
          return Object.assign(pokemon, evolveData, { count, candiesAvailable });
        })
        .filter(p => p.evolve > 0)
        .forEach(printTip);

  })
  .catch(function(error) {
    console.log('error', error.stack);
  });
