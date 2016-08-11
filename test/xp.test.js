const { expect } = require('chai');
const xp = require('../src/xp');

describe('evolver', () => {
  it('should give 10000xp', () => {
    const actual = xp([{ evolve: 10 }]).xp;
    const expected = 10000;
    expect(actual).to.eql(expected);
  });

  it('should give 10000xp', () => {
    const actual = xp([{ evolve: 10 }, { evolve: 5}]).xp;
    const expected = 15000;
    expect(actual).to.eql(expected);
  });

  it('should take 300 secs', () => {
    const actual = xp([{ evolve: 10 }]).time;
    const expected = 300;
    expect(actual).to.eql(expected);
  });

  it('should take 16.67%', () => {
    const actual = xp([{ evolve: 10 }]).eggfactor;
    const expected = 0.1667;
    expect(actual).to.eql(expected);
  });

  it('should take 100%', () => {
    const actual = xp([{ evolve: 1000 }]).eggfactor;
    const expected = 1;
    expect(actual).to.eql(expected);
  });
});
