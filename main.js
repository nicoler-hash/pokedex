const POKEAPI_URL = "https://pokeapi.co/api/v2";
const pokemonList = document.getElementById("pokemons");

const loadPokemons = async () => {
  try {
    const res = await fetch(`${POKEAPI_URL}/pokemon?limit=151`);
    const data = await res.json();

    data.results.forEach((pokemon) => {
      const option = document.createElement("option");
      option.textContent = pokemon.name.toUpperCase();
      option.value = pokemon.url;
      pokemonList.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching pokemons:", error);
  }
};

loadPokemons();

pokemonList.addEventListener("change", (e) => {
  if (e.target.value) {
    pokemonSelected(e.target.value);
  }
});

const pokemonSelected = async (pokemonUrl) => {
  try {
    const res = await fetch(pokemonUrl);
    const pokemon = await res.json();

    const pokemonImage = document.getElementById("pokemon-image");
    const pokemonName = document.getElementById("pokemon-name");
    const pokemonStats = document.getElementById("pokemon-stats");
    const pokemonAbility = document.getElementById("pokemon-ability");

    pokemonImage.src =
      pokemon.sprites.other["official-artwork"].front_default ||
      pokemon.sprites.front_default;
    pokemonImage.alt = pokemon.name;
    pokemonName.textContent = pokemon.name.toUpperCase();

    if (pokemon.abilities && pokemon.abilities.length > 0) {
      const mainAbility = pokemon.abilities[0].ability.name;
      pokemonAbility.textContent = `Habilidad Especial: ${mainAbility.toUpperCase()}`;
    } else {
      pokemonAbility.textContent = "Habilidad: Ninguna";
    }

    pokemonStats.innerHTML = "";
    pokemon.stats.forEach((stat) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${stat.stat.name.toUpperCase()}:</strong> ${
        stat.base_stat
      }`;
      pokemonStats.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
  }
};
