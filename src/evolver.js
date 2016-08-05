module.exports = function({evolveCandyCost, availableCandies, availablePokemons}) {
  if (!evolveCandyCost || !availableCandies || !availablePokemons ) return {};
  const initialEvolve = Math.trunc(availableCandies / evolveCandyCost);
  const pokemonsLeft = availablePokemons - initialEvolve;
  const transfer = Math.trunc(pokemonsLeft / evolveCandyCost) * evolveCandyCost;
  const evolve = initialEvolve + transfer / evolveCandyCost;
  return { evolve, transfer };
};
