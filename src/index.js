// internal dependencies
const { get, allPokemonsIDS, countPokemons, availableCandies, countLuckyEggs } = require('./inventory');

const ProgressBar = require('node-progress-bars');

const pokemonFR = require('pokemon-french');
const pokemonDB = require('../pokemons.json');
const uniq = require('lodash/uniq');
const evolver = require('./evolver');
const xp = require('./xp');

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

function report(pokemons, inventory) {
  return Object.assign({  pokemons, luckyeggs: countLuckyEggs(inventory) }, xp(pokemons));
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

function printReport(report, pokemons) {
  console.log(chalk.red('Experience gained: ' + report.xp));
  console.log(chalk.red('Evolove count: ' + report.totalEvolve));

  const transfers = pokemons.filter(p => p.transfer );
  if (transfers.length) {
    console.log('Before hatching your egg:');
    transfers.forEach(function(p) { console.log(' - transfer ' + p.transfer + ' ' + p.nameEN); });
  }
  console.log('\n');
  console.log('Start hatching your egg 🕐');
  console.log('You now have 30 minutes to:');
  console.log('\n');

  const evolves = pokemons.filter(p => p.evolve );
  if (evolves.length) {
    evolves.forEach(function(p) { console.log(' - evolve ' + p.evolve + ' ' + p.nameEN); });
  }
}

console.log('Getting your pokemons... \n');
// main code
get()
  .then(inventory => {

      const userPokemonIds = allPokemonsIDS(inventory);
      const userPokemonCount = countPokemons(userPokemonIds);
      const userCandies = availableCandies(inventory);

      const pokemons = uniq(userPokemonIds)
        .map(id => {
          const pokemon = pokemonData(id);
          const count = userPokemonCount[id];
          const candiesAvailable = userCandies[id];
          const evolveData =  pokemon.evolvesTo ? evolver({
            evolveCandyCost: pokemon.evolveCost,
            availableCandies: candiesAvailable || 0,
            availablePokemons: count
          }) : {};
          return Object.assign(pokemon, evolveData, { count, candiesAvailable });
        })
        .filter(p => p.evolve > 0);

      const r = report(pokemons, inventory);

      const size =  Math.min(100, r.eggfactor * 100);

      var bar = new ProgressBar({
        schema: 'Lucky egg optimisation :percent \n:bar'
      });
      bar.tick();
      var iv = setInterval(function() {
        bar.tick();
        if (bar.current >= size ) {
          clearInterval(iv);
          printReport(r, pokemons);
        }
      }, 5);

  })
  .catch(function(error) {
    console.log('error', error.stack);
  });
