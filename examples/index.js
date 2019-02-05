const { populate } = require('../');

let movies = "https://swapi.co/api/films"

let characters = [
  "https://swapi.co/api/people/1",
  "https://swapi.co/api/people/2",
  "https://swapi.co/api/people/3",
  "https://swapi.co/api/people/4",
  "https://swapi.co/api/people/5",
  [
    "https://swapi.co/api/people/6",
    "https://swapi.co/api/people/7",
    "https://swapi.co/api/people/8",
  ]
];

let planets = {
  "Tatooine": "https://swapi.co/api/planets/1",
  "Alderaan": "https://swapi.co/api/planets/2"
}

async function loadStarWarsData() {
  movies = await populate(movies);
  characters = await populate(characters);
  planets = await populate(planets);

  console.log("Movies: ");
  console.log(movies);

  console.log("Characters");
  console.log(characters);

  console.log("Planets: ");
  console.log(planets);
}

loadStarWarsData();
