# populate-urls

A simple package for populating data of any kind of value if it matches a URL

## Installation

npm install --save populate-urls

## Examples

Require it by doing:

```
const { populate } = require('populate-urls');
```

You can pass any kind of value that matches an Object, String or Array to the populate function


```
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
```

And it's gonna return the populated data for you

```
async function loadStarWarsData() {
  movies = await populate(movies);
  characters = await populate(characters);
  planets = await populate(planets);

  console.log("Movies: ");
  console.log(movies);

  console.log("Characters: ");
  console.log(characters);

  console.log("Planets: ");
  console.log(planets);
}

loadStarWarsData();

```

If you need to, you can specify the request type and a config object in the arguments

```
populate("https://api.example/food/add", "POST", {
  headers: {
    "Authorization": "{{token}}"
  },
  data: {
    food: {
      name: "Potato"
    }
  }
})
```
