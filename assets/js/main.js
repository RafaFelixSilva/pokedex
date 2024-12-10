const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 6
let offset = 0  

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" data-pokemon='${JSON.stringify(pokemon)}'>
     <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        ` ).join('')
        pokemonList.innerHTML += newHtml

        document.querySelectorAll('.pokemon').forEach(item => {
            item.addEventListener('click', () => {
                const pokemon = JSON.parse(item.dataset.pokemon);
                showPokemonDetails(pokemon);
            })
        })
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

const pokemonDetail = document.getElementById('pokemonDetail');

function showPokemonDetails(pokemon) {
    const cardContainer = document.createElement("div");
    cardContainer.className = "pokemon-card";

    cardContainer.innerHTML = `
        <img src="${pokemon.photo}" alt="${pokemon.name}" class="pokemon-image">
        <h2 class="pokemon-name">${pokemon.name}</h2>
        <ul class="pokemon-stats">
            <li><strong>HP:</strong> ${pokemon.stats.hp}</li>
            <li><strong>Ataque:</strong> ${pokemon.stats.attack}</li>
            <li><strong>Defesa:</strong> ${pokemon.stats.defense}</li>
            <li><strong>Velocidade:</strong> ${pokemon.stats.speed}</li>
            <li><strong>Tipo:</strong> ${pokemon.types.join(", ")}</li>
        </ul>
        <button class="back-button" onclick="returnToMain()">Back</button>
    `;

    document.body.innerHTML = "";
    document.body.appendChild(cardContainer); 
}

function returnToMain() {
    document.body.innerHTML = ""; 
    
    document.body.appendChild(pokemonList);
    document.body.appendChild(loadMoreButton);
}

       

