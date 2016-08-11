const EVOLVE_TIME = 30;
const TOTAL_EGG_TIME = 30 * 60;

module.exports = function(pokemons) {
  const totalEvolve = pokemons
    .reduce(function(count, pokemon) {
      return count + (pokemon.evolve || 0)
    }, 0);

  const xp = totalEvolve * 1000;
  const time = totalEvolve * EVOLVE_TIME;
  const eggfactor = Math.min(1, Math.round(((time / TOTAL_EGG_TIME)*10000)) / 10000);

  return { xp, time, eggfactor, totalEvolve };
}
