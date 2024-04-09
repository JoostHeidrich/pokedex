let currentPokemon;
let rendertPokemon = 21;
let currentPokemonCount = 1;
let allRendertPokemon = [];
let waiting = false;

function init() {
  this.loadPokemon();
  AOS.init();
}

async function loadPokemon() {
  if (waiting == false) {
    waiting = true;
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
    waiting = false;
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
  for (let x = 1; x < allRendertPokemon[i]["abilities"].length; x++) {
    let content = document.getElementById(`ability${i}`);
    content.innerHTML += `, ${allRendertPokemon[i]["abilities"][x]["ability"]["name"]}`;
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
  document.getElementById(`pokemonCard${i}`).innerHTML =
    generateOpenCardAgain(i);
  addBackgroundColor(i);
  addAbilities(i);
}

function capitalizeFirstLetter(word) {
  if (typeof word !== "string" || word.length === 0) {
    return "Ungültige Eingabe";
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function gramToKilogram(gram) {
  var kilogram = gram / 10;
  return kilogram;
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
  let search = document.getElementById("search").value.toLowerCase();
  for (let i = 0; i < allRendertPokemon.length; i++) {
    let name = allRendertPokemon[i]["name"].toLowerCase();
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
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
          ],
          borderColor: [
            "rgb(75, 192, 192)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
          ],
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
