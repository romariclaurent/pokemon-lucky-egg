const { expect } = require('chai');
const evolver = require('../src/evolver');

describe('evolver', () => {
  it('should evolve 10 pokemons', () => {
    const actual = evolver({evolveCandyCost: 12, availableCandies: 120, availablePokemons: 10});
    const expected = { transfer: 0, evolve: 10 };
    expect(actual).to.eql(expected);
  });

  it('should transfer 12 pokemons and evolve 11', () => {
    const actual = evolver({evolveCandyCost: 12, availableCandies: 120, availablePokemons: 22});
    const expected = { transfer: 2, evolve: 11 };
    expect(actual).to.eql(expected);
  });


  it('should transfer 12 pokemons and evolve 11', () => {
    const actual = evolver({evolveCandyCost: 12, availableCandies: 125, availablePokemons: (10 + 12)});
    const expected = { transfer: 8, evolve: 12 };
    expect(actual).to.eql(expected);
  });


});
