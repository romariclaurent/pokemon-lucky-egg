const api = require('pokemon-go-api');
const credentials = require('./credentials');

module.exports.get = function() {
  return credentials().then(getInventory);
};


function getInventory({username, password, provider}) {
  return api.login(username, password, provider)
    .then(() => api.location.set('address', 'New York').then(api.getPlayerEndpoint))
    .then(api.getPlayerEndpoint)
    .then(api.inventory.get);
}

module.exports.allPokemonsIDS = function(inventory) {
  return inventory
    .filter(i => i.inventory_item_data.pokemon_data)
    .filter(i => i.inventory_item_data.pokemon_data.pokemon_id)
    .map(i => i.inventory_item_data.pokemon_data.pokemon_id);
};


module.exports.availableCandies = function(inventory) {
  return inventory
    .filter(i => i.inventory_item_data.pokemon_family)
    .reduce((candies, i) => {
      candies[i.inventory_item_data.pokemon_family.family_id] = i.inventory_item_data.pokemon_family.candy;
      return candies;
    }, {});
};

module.exports.countPokemons = function(pokemonIds, candies) {
    return pokemonIds.reduce((grouped, pokemonId) => {
      if (!grouped[pokemonId]) grouped[pokemonId] = 0;
      grouped[pokemonId]++;
      return grouped;
    }, {});
};


module.exports.countLuckyEggs = function(inventory) {
  return inventory.reduce((sum, i) => {
    const item = i.inventory_item_data.item;
    if ( item && item.item_id === 301) sum += item.count;
    return sum;
  }, 0);
};
