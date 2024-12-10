const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
     const pokemon = new Pokemon()
     pokemon.number = pokeDetail.id
     pokemon.name = pokeDetail.name
     pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default

     pokemon.stats = {
        hp: pokeDetail.stats[0].base_stat,
        attack: pokeDetail.stats[1].base_stat,
        defense: pokeDetail.stats[2].base_stat,
        speed: pokeDetail.stats[5].base_stat,
     };

     pokemon.types = pokeDetail.types.map((slot) => slot.type.name);

     const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

     
     pokemon.types = types
     pokemon.type = type

     pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

     return pokemon 
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url) 
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}