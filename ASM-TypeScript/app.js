"use strict";
var _a, _b, _c;
(_a = document.getElementById("insert_user")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', async function (e) {
    e.preventDefault();
    const playerNameInput = document.getElementById("playerName");
    const playerName = playerNameInput.value;
    const error = document.querySelector(".error");
    let haserr = true;
    error.innerHTML = '';
    const regex = /[!/#/@/$/%/^/&/*/(/)/=/+/:/"/</>]/;
    if (playerName.trim() === '' || playerName.length < 4) {
        error.innerHTML = "Tên không được để trống và tên phải có ít nhất 4 ký tự";
        haserr = false;
    }
    else if (regex.test(playerName)) {
        error.innerHTML = "Tên không được chứa ký tự đặc biệt";
        haserr = false;
    }
    if (haserr) {
        const playerForm = document.getElementById('playerForm');
        const insertUserBtn = document.getElementById('insert_user');
        const userName = document.getElementById('user_name');
        playerForm.style.display = 'none';
        insertUserBtn.style.display = 'none';
        userName.innerHTML = 'Hello: ' + playerName;
        // Fetch Pokemon data and display
        const pokemonList = await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?limit=20');
        shuffleAndDisplay(pokemonList);
    }
});
async function fetchPokemonData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map((pokemon) => ({
        id: parseInt(pokemon.url.split('/')[6]),
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
        type: "Normal" // For simplicity, setting type as Normal
    }));
}
function shuffleAndDisplay(pokemonList) {
    const shuffledPokemon = shuffle([...pokemonList, ...pokemonList]); // Duplicate and shuffle
    displayPokemon(shuffledPokemon);
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function displayPokemon(pokemonList) {
    const pokemonContainer = document.getElementById('list');
    pokemonContainer.innerHTML = ''; // Clear existing content
    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('col-sm-3', 'mt-3');
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        const img = document.createElement('img');
        img.src = pokemon.image;
        img.alt = pokemon.name;
        img.className = 'img-thumbnail shadow color-change';
        img.addEventListener('click', function () {
            handleImageClick(this, pokemonList);
        });
        imgContainer.appendChild(img);
        pokemonCard.appendChild(imgContainer);
        pokemonContainer.appendChild(pokemonCard);
    });
}
let firstClicked = null;
function handleImageClick(clickedImage, pokemonList) {
    if (firstClicked === null) {
        firstClicked = clickedImage;
    }
    else {
        if (firstClicked === clickedImage) {
            firstClicked = null;
            return;
        }
        if (firstClicked.src === clickedImage.src) {
            firstClicked.parentNode.parentNode.classList.add('hidden');
            clickedImage.parentNode.parentNode.classList.add('hidden');
        }
        else {
            firstClicked.parentNode.parentNode.classList.add('incorrect');
            clickedImage.parentNode.parentNode.classList.add('incorrect');
            setTimeout(function () {
                firstClicked.parentNode.parentNode.classList.remove('incorrect');
                clickedImage.parentNode.parentNode.classList.remove('incorrect');
            }, 1000);
        }
        firstClicked = null;
    }
}
(_b = document.getElementById("cancel")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    window.location.href = "http://127.0.0.1:5500/index.html";
});
(_c = document.getElementById("reset")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    resetGame();
});
function resetGame() {
    // Xóa tất cả các thẻ Pokemon đã được chọn và hiển thị lại tất cả các thẻ Pokemon
    const pokemonCards = document.querySelectorAll('.img-container');
    pokemonCards.forEach(card => {
        card.classList.remove('hidden');
        card.classList.remove('incorrect');
    });
    // Đặt lại biến firstClicked
    firstClicked = null;
}
