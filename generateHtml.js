function generateCard(i) {
  return /*html*/ `
      <div id="pokemonCard${i}"class="hoverPointer pokemonCard">
      <div class="cardBackground" id="cardBackground${i}"><svg viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00512" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ff0f0fCCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"></path></g></svg></div>
          <div  onclick="openCard(${i})">
              <div class="pokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
                  <div class="pokemonCardHeader">
                      <h2 class="pokemonName">${capitalizeFirstLetter(
                        allRendertPokemon[i]["name"]
                      )}</h2>
                      <h2 class="pokemonName">#${i + 1}</h2>
                  </div>
                  <div class="pokemonIMG">
                      <img src="${
                        allRendertPokemon[i]["sprites"]["other"][
                          "official-artwork"
                        ]["front_default"]
                      }">
                  </div>
          <div>
      `;
}

function generateOpenCard(i) {
  let x = i + 1;
  return /*html*/ `
   <div class="openCardBackground" onclick="closeCard(${i})"></div>
<div
  data-aos="flip-left"
  data-aos-easing="ease-out-cubic"
  data-aos-duration="1000"
  id="openCard"
  class="pokemonCard openPokemonCard"
>
  <div>
    <div class="openPokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
      <div class="navigateButton openPokemonHeader">
        <div onclick="nextCard(${i}, '-')">
        ${addlastButton(`${i}`)}
      </div>
        <div onclick="nextCard(${i}, '+')">
        ${addNextButton(`${i}`)}
       </div>
      </div>

      <div class="cardBackground openCardBackgroundImg" id="cardBackground${i}">
        <svg
          viewBox="0 0 512 512"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
          stroke-width="0.00512"
          transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
        >
          <g id="SVGRepo_iconCarrier">
            <title></title>
            <path
              d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"
            ></path>
          </g>
        </svg>
      </div>
      <div class="pokemonCardHeader">
        <h2 class="pokemonName">
          ${capitalizeFirstLetter(allRendertPokemon[i]["name"])}
        </h2>
        <h2 class="pokemonName">#${x}</h2>
      </div>
      <div class="openCardImg">
        <img src="${
          allRendertPokemon[i]["sprites"]["other"]["official-artwork"][
            "front_default"
          ]
        }">
      </div>
    </div>

    <div class="infoContainer">
      <div class="infoContainerHeader">
        <a class="hoverPointer openButton">About</a>
        <a class="hoverPointer" onclick="openStats(${i})">Stats</a>
      </div>
      <div class="PokemonInfo" id="PokemonInfo">
        <table class="InfoTable">
          <tr>
            <td>Species</td>
            <td>${allRendertPokemon[i]["types"]["0"]["type"]["name"]}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>${allRendertPokemon[i]["height"]}0cm</td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>${gramToKilogram(`${allRendertPokemon[i]["weight"]}`)}kg</td>
          </tr>
          <tr>
            <td>Abilities</td>
            <td id="ability${i}">
              ${allRendertPokemon[i]["abilities"][0]["ability"]["name"]}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div></div>
  </div>
</div>
  `;
}

function generateOpenCardAgain(i) {
  let x = i + 1;
  return /*html*/ `
    <div class="openCardBackground" onclick="closeCard(${i})"></div>
    <div  
        id="openCard"
         class="pokemonCard openPokemonCard">
      <div>
          <div class="openPokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
          <div class="navigateButton openPokemonHeader">
        <div onclick="nextCard(${i}, '-')">
        ${addlastButton(`${i}`)}    
      </div>
        <div onclick="nextCard(${i}, '+')">
        ${addNextButton(`${i}`)}
       </div>
      </div>
          <div class="cardBackground openCardBackgroundImg" id="cardBackground${i}"><svg viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00512" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ff0f0fCCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"></path></g></svg></div>
              <div class="pokemonCardHeader">
                  <h2 class="pokemonName">${capitalizeFirstLetter(
                    allRendertPokemon[i]["name"]
                  )}</h2>
                  <h2 class="pokemonName">#${x}</h2>
              </div>
              <div class="openCardImg">
                  <img src="${
                    allRendertPokemon[i]["sprites"]["other"][
                      "official-artwork"
                    ]["front_default"]
                  }">
              </div>
          </div>
  
          <div class="infoContainer">
              <div class="infoContainerHeader">
                  <a class="hoverPointer openButton">About</a>
                  <a class="hoverPointer" onclick="openStats(${i})">Stats</a>
              </div>
              <div class="PokemonInfo" id="PokemonInfo">
  
                  <table class="InfoTable">
                      <tr>
                          <td>Species</td>
                          <td>${
                            allRendertPokemon[i]["types"]["0"]["type"]["name"]
                          }</td>
                      </tr>
                      <tr>
                          <td>Height</td>
                          <td>${allRendertPokemon[i]["height"]}0cm</td>
                      </tr>
                      <tr>
                          <td>Weight</td>
                          <td>${gramToKilogram(
                            `${allRendertPokemon[i]["weight"]}`
                          )}kg</td>
                        </tr>
                      <tr>
                          <td>Abilities</td>
                          <td id="ability${i}">${
    allRendertPokemon[i]["abilities"][0]["ability"]["name"]
  }</td>
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
      <div class="openCardBackground" onclick="closeCard()"></div>
        <div id="openCard" class="pokemonCard openPokemonCard">
      <div>
          <div class="openPokemonHeader pokemonHeader${i}" id="pokemonHeader${i}">
          <div class="navigateButton openPokemonHeader">
        <div onclick="nextCard(${i}, '-')">
        ${addlastButton(`${i}`)}    
      </div>
        <div onclick="nextCard(${i}, '+')">
        ${addNextButton(`${i}`)}
       </div>
      </div>
          <div class="cardBackground openCardBackgroundImg" id="cardBackground${i}"><svg viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00512" transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#ff0f0fCCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M450.46,256.09C449.35,175.17,399.81,102.71,324,73.79,247.59,44.67,157.49,69,105.82,132.13,54.4,195,46.61,285.58,88.49,355.68c41.8,69.95,123.74,106,203.55,91.63,91-16.37,156.14-98.12,158.35-189.14A20.16,20.16,0,0,0,450.46,256.09ZM119.05,174.38C152.76,118,220.23,87,285,99.43c69.4,13.29,120.43,70.47,128.83,139H318.41c-8.26-27.36-32-48-62.62-48-29.65,0-55.15,20.65-63.11,48H97.74A158,158,0,0,1,119.05,174.38ZM286.13,256.1c-2,38.75-60.67,39.4-60.67,0S284.17,217.33,286.13,256.1Zm24,149.79C246.85,428.58,175,408.74,132.3,356.82a157.53,157.53,0,0,1-34.57-83H192.6c7.91,27.39,33.7,48,63.19,48,30.67,0,54.36-20.68,62.62-48h95.45C406.61,333,367.54,385.32,310.14,405.89Z"></path></g></svg></div>
              <div class="pokemonCardHeader">
                  <h2 class="pokemonName">${capitalizeFirstLetter(
                    allRendertPokemon[i]["name"]
                  )}</h2>
                  <h2 class="pokemonName">#${x}</h2>
              </div>
              <div class="openCardImg">
                  <img src="${
                    allRendertPokemon[i]["sprites"]["other"][
                      "official-artwork"
                    ]["front_default"]
                  }">
              </div>
          </div>
  
          <div class="infoContainer">
              <div class="infoContainerHeader">
                  <a class="hoverPointer" onclick="openAbout(${i})">About</a>
                  <a class="hoverPointer openButton">Stats</a>
              </div>
              <canvas id="myChart">
          </div>
      <div>
  `;
}
