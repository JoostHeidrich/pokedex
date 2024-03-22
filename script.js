let currentPokemon;
let rendertPokemon = 21;
let currentPokemonCount = 1;
let allRendertPokemon = [];

function init() {
  loadPokemon();
}

async function loadPokemon() {
  for (let i = currentPokemonCount; i < rendertPokemon; i++) {
    if (i < 1026) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      let response = await fetch(url);
      currentPokemon = await response.json();
      allRendertPokemon.push(currentPokemon);
      renderPokemonInfo(i);
      search();
    }
  }
}

function renderPokemonAgain(i) {
  let card = document.getElementById(`pokemonCard${i}`);
  card.innerHTML = generateCardAgain(i);
  addBackgroundColor(i);
}

function renderPokemonInfo(i) {
  i--;
  let container = document.getElementById("pokemonCards");
  container.innerHTML += generateCard(i);
  addBackgroundColor(i);
}

function addAbilities(i) {
  for (let x = 0; x < allRendertPokemon[i]["abilities"].length; x++) {
    let content = document.getElementById(`ability${i}`);
    content.innerHTML += `${allRendertPokemon[i]["abilities"][x]["ability"]["name"]}, `;
  }
}

async function openCard(i) {
  document.getElementById(`pokemonCard${i}`).innerHTML = generateOpenCard(i);
  let element = document.getElementById(`pokemonCard${i}`);
  addBackgroundColor(i);
  if (element.classList.contains("openCardStyle")) {
    element.classList.remove("openCardStyle");
    element.innerHTML = "";
    renderPokemonAgain(i);
    search();
  } else {
    addAbilities(i);
    element.classList.add("openCardStyle");
  }
}
function openStats(i) {
  let content = document.getElementById(`pokemonCard${i}`);
  content.innerHTML = "";
  content.innerHTML = generateOpenCardStats(i);
  addBackgroundColor(i);
  canvas(i);
}

function openAbout(i) {
  document.getElementById(`pokemonCard${i}`).innerHTML = generateOpenCard(i);
  addBackgroundColor(i);
  addAbilities(i);
}

function generateCard(i) {
  return /*html*/ `
    <div id="pokemonCard${i}"class="hoverPointer pokemonCard">
        <div  onclick="openCard(${i})">
            <div class="pokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
                <div class="pokemonCardHeader">
                    <h2 class="pokemonName">${allRendertPokemon[i]["name"]}</h2>
                    <h2 class="pokemonName">#${i + 1}</h2>
                </div>
                <div>
                    <img src="${
                      allRendertPokemon[i]["sprites"]["other"][
                        "official-artwork"
                      ]["front_default"]
                    }">
                </div>
        <div>
    `;
}

function generateCardAgain(i) {
  return /*html*/ `
        <div  onclick="openCard(${i})">
            <div class="pokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
                <div class="pokemonCardHeader">
                    <h2 class="pokemonName">${allRendertPokemon[i]["name"]}</h2>
                    <h2 class="pokemonName">#${i + 1}</h2>
                </div>
                <div>
                    <img src="${
                      allRendertPokemon[i]["sprites"]["other"][
                        "official-artwork"
                      ]["front_default"]
                    }">
                </div>
    `;
}

function generateOpenCard(i) {
  let x = i + 1;
  return /*html*/ `
  <div class="openCardBackground" onclick="openCard(${i})"></div>
<div id="openCard" class="hoverPointer pokemonCard">
    <div>
        <div class="pokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
            <div class="pokemonCardHeader">
                <h2 class="pokemonName">${allRendertPokemon[i]["name"]}</h2>
                <h2 class="pokemonName">#${x}</h2>
            </div>
            <div class="openCardImg">
                <img src="${allRendertPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
            </div>
        </div>

        <div class="infoContainer">
            <div class="infoContainerHeader">
                <a>About</a>
                <a onclick="openStats(${i})">Stats</a>
            </div>
            <div class="PokemonInfo" id="PokemonInfo">

                <table class="InfoTable">
                    <tr>
                        <td>Species</td>
                        <td>${allRendertPokemon[i]["types"]["0"]["type"]["name"]}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>${allRendertPokemon[i]["height"]}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${allRendertPokemon[i]["weight"]}</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td id="ability${i}"></td>
                    </tr>
                </table>
            </div>
        </div>
    <div>
`;
}

function generateOpenCardStats(i) {
  let x = i + 1;
  return /*html*/ `
    <div class="openCardBackground" onclick="openCard(${i})"></div>
<div id="openCard" class="hoverPointer pokemonCard">
    <div>
        <div class="pokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
            <div class="pokemonCardHeader">
                <h2 class="pokemonName">${allRendertPokemon[i]["name"]}</h2>
                <h2 class="pokemonName">#${x}</h2>
            </div>
            <div class="openCardImg">
                <img src="${allRendertPokemon[i]["sprites"]["other"]["official-artwork"]["front_default"]}">
            </div>
        </div>

        <div class="infoContainer">
            <div class="infoContainerHeader">
                <a  onclick="openAbout(${i})">About</a>
                <a>Stats</a>
            </div>
            <div class="PokemonInfo" id="PokemonInfo">
            <canvas id="myChart">
            </div>
        </div>
    <div>
`;
}

function addBackgroundColor(i) {
  let species = allRendertPokemon[i]["types"]["0"]["type"]["name"];
  for (let x = 0; x < backgroundColors.length; x++) {
    const element = backgroundColors[x]["name"].toLowerCase();
    if (species === element) {
      const color = backgroundColors[x]["rgb"]["0"];
      const color1 = backgroundColors[x]["rgb"]["1"];
      const color2 = backgroundColors[x]["rgb"]["2"];
      let elementx = document.getElementById(`pokemonHeader${i}`);
      elementx.style.backgroundColor = `rgb(${color}, ${color1}, ${color2})`;
    }
  }
}

function loadMorePokemon() {
  rendertPokemon += 20;
  currentPokemonCount += 20;
  loadPokemon();
}

function search() {
  let search = document.getElementById("search").value;
  for (let i = 0; i < allRendertPokemon.length; i++) {
    let name = allRendertPokemon[i]["name"];
    if (name.includes(search)) {
      document.getElementById(`pokemonCard${i}`).classList.remove("d-none");
    } else {
      document.getElementById(`pokemonCard${i}`).classList.add("d-none");
    }
  }
}

function canvas(i) {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Hp", "Attack", "Defense", "Special-attak", "speed"],
      datasets: [
        {
          axis: "y",
          label: "Status",
        },
      ],
      datasets: [
        {
          label: "",
          data: [
            allRendertPokemon[i]["stats"]["0"]["base_stat"],
            allRendertPokemon[i]["stats"]["1"]["base_stat"],
            allRendertPokemon[i]["stats"]["2"]["base_stat"],
            allRendertPokemon[i]["stats"]["3"]["base_stat"],
            allRendertPokemon[i]["stats"]["4"]["base_stat"],
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function openMenu() {
  let menu = document.getElementById("menu");
  if (menu.classList.contains("d-none")) {
    menu.classList.remove("d-none");
  } else {
    menu.classList.add("d-none");
  }
}

function test() {
  console.log("test");
}
