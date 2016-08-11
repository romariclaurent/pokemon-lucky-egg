module.exports = function calculatePokemon({evolveCandyCost, availableCandies, availablePokemons}) {
    var shouldTransfer = false;

    // availablePokemons, candies, evolveCandyCost, shouldTransfer
    var candiesGainedOnEvolve = 1;
    if (shouldTransfer) {
        candiesGainedOnEvolve = 2;
    }

    // Counters
    var evolveCount = 0;
    var transferCount = 0;

    // Evolutions without transferring
    while (true) {
        // Not enough Pokemon or candies
        if (parseInt(availableCandies / evolveCandyCost) === 0 || availablePokemons === 0) {
            break;
        } else {
            // Evolve a Pokemon
            availablePokemons--;
            availableCandies -= evolveCandyCost;
            availableCandies += candiesGainedOnEvolve;
            evolveCount++;
            // Break if out of Pokemon
            if (availablePokemons === 0) {
                break;
            }
        }
    }

    // Evolutions after transferring
    while (true) {
        // Not enough Pokemon or candies
        if ((availableCandies + availablePokemons) < (evolveCandyCost + 1) || availablePokemons === 0) {
            break;
        }

        // Keep transferring until enough candies for an evolve
        while (availableCandies < evolveCandyCost) {
            transferCount++;
            availablePokemons--;
            availableCandies++;
        }

        // Evolve a Pokemon
        availablePokemons--;
        availableCandies -= evolveCandyCost;
        availableCandies += candiesGainedOnEvolve;
        evolveCount++;
    }

    return {
        transfer: transferCount,
        evolve: evolveCount
    };
};
