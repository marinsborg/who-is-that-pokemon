var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?';
var offset = 0;
var limit = 150;
var pokemonUrl = apiUrl + 'limit=' + limit + '&offset=' + offset;
var spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const spriteElement = document.getElementById("sprite");
const guess = document.getElementById("guess");
const streakElement = document.getElementById("streak");
const pokemonNameElement = document.getElementById("pokemon-name");
var streak = 0;
var pokemonName = "";
var pokemonData;

guess.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

const fetchPokemonData = async function getDataFromServer(url) {
  return fetch(url)
  .then(response => response.json());
}

var main = async function mainFunction() {
  let response = await fetchPokemonData(pokemonUrl);
  pokemonData = response.results;
  getPokemon();

}

main();

function checkGuess() {
  if (pokemonName.toLowerCase() === guess.value.toLowerCase()) {
    streak++;
  } else {
    streak = 0;
  }
  showPokemon();
}

function getPokemon() {
  pokemonNameElement.innerHTML = "";
  guess.value = "";
  let pokemonNumber = getRandomIntInclusive(offset, limit + offset);
  pokemonName = pokemonData[pokemonNumber].name;
  console.log(pokemonName);
  spriteElement.style.setProperty('transition', 'initial');
  spriteElement.src = "";
  spriteElement.style.setProperty('filter', 'brightness(0)');
  const sprite = spriteUrl + (pokemonNumber + 1).toString() + '.png';
  spriteElement.src = sprite;
}

function showPokemon() {
  streakElement.innerHTML = "Streak: " + streak;
  spriteElement.style.setProperty('transition', 'filter 1s ease-out');
  spriteElement.style.setProperty('filter', 'initial');
  pokemonNameElement.innerHTML = pokemonName;
  setTimeout(() => getPokemon(), 2000);  
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
