// Biến lưu trạng thái đăng nhập
let isLoggedIn = false;

// Biến lưu trạng thái đang chơi game
let isPlaying = false;

// Biến lưu trạng thái đang đếm ngược
let isCountingDown = false;

// Biến lưu thời gian bắt đầu đếm ngược
let countdownStartTime = 0;

// Biến lưu interval của đồng hồ đếm
let countdownInterval: NodeJS.Timeout | null = null;

// Hàm xử lý sự kiện khi nhấn nút "Login"
document.getElementById('loginButton')!.addEventListener('click', () => {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const username = usernameInput.value.trim();
    
    // Kiểm tra xem trường nhập tên người dùng có trống không
    if (!username) {
        alert('Tên người dùng không được để trống.');
        return;
    }

    // Kiểm tra xem tên người dùng có chứa ký tự đặc biệt không
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        alert('Tên người dùng chỉ được chứa các ký tự chữ cái, số hoặc dấu gạch dưới.');
        return;
    }

    // Kiểm tra xem tên người dùng có dài ít nhất là 2 ký tự không
    if (username.length < 2) {
        alert('Tên người dùng phải có ít nhất 2 ký tự.');
        return;
    }

    // Kiểm tra xem tên người dùng có dài ít nhất là 2 ký tự không
    if (username.length > 20) {
        alert('Tên người dùng không được vượt quá 20 ký tự.');
        return;
    }

    isLoggedIn = true;
    showGameUI();
});




// Hàm hiển thị giao diện game
function showGameUI() {
    // Ẩn form đăng nhập
    document.getElementById('loginContainer')!.style.display = 'none';
    // Hiển thị các nút và giao diện game
    document.getElementById('gameUI')!.style.display = 'block';
}

// Hàm bắt đầu trò chơi
document.getElementById('startButton')!.addEventListener('click', () => {
    if (!isPlaying) {
        startGame();
    }
});

// Hàm hủy trò chơi
document.getElementById('cancelButton')!.addEventListener('click', () => {
    if (isPlaying) {
        cancelGame();
    }
});

// Hàm reset trò chơi
document.getElementById('resetButton')!.addEventListener('click', () => {
    resetGame();
});

// Hàm bắt đầu trò chơi
function startGame() {
    isPlaying = true;
    // Hiển thị giao diện Pokémon
    const pokemonContainer = document.getElementById('pokemonContainer')!;
    pokemonContainer.innerHTML = '<h3>Loading Pokémon...</h3>';
    loadPokemon()
        .then(pokemonArray => {
            // Nhân đôi danh sách Pokémon
            const duplicatedPokemonArray = [...pokemonArray, ...pokemonArray];
            // Hiển thị danh sách Pokémon
            pokemonContainer.innerHTML = '';
            duplicatedPokemonArray.forEach(pokemon => {
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('card', 'm-1');
                pokemonCard.innerHTML =`
                <span class="position-absolute top-0">#S${pokemon.id}</span>
                <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}" style="width: 100px;">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.name}</h5>
                </div>
               
            `;
                pokemonContainer.appendChild(pokemonCard);
            });
        })
        .catch(error => {
            console.error('Error loading Pokémon:', error);
        });

    // Hiển thị đồng hồ đếm 10 phút
    const timerElement = document.getElementById('timer')!;
    timerElement.innerHTML = '<h3>10:00</h3>';
    countdownStartTime = new Date().getTime();
    startCountdown(timerElement);
}

// Hàm hủy trò chơi
function cancelGame() {
    isPlaying = false;
    stopCountdown();
    // Hiển thị lại form đăng nhập
    document.getElementById('loginContainer')!.style.display = 'block';
    document.getElementById('gameUI')!.style.display = 'none';
}

// Hàm reset trò chơi
function resetGame() {
    isPlaying = false;
    stopCountdown();
    // Ẩn giao diện Pokémon
    document.getElementById('pokemonContainer')!.innerHTML = '';
    // Bắt đầu lại trò chơi
    startGame();
}

// Hàm tải danh sách Pokémon
async function loadPokemon(): Promise<any[]> {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();
    // Lấy 24 con Pokémon ngẫu nhiên
    const randomPokemonIndices = getRandomIndices(100, 25);
    const randomPokemonArray = randomPokemonIndices.map((index: number) => {
        return fetch(data.results[index].url).then(response => response.json());
    });
    return Promise.all(randomPokemonArray);
}

// Hàm lấy một mảng các số nguyên ngẫu nhiên không trùng lặp từ 0 đến n-1
function getRandomIndices(n: number, count: number): number[] {
    const indices = Array.from({ length: n }, (_, i) => i);
    const shuffledIndices = shuffleArray(indices);
    return shuffledIndices.slice(0, count);
}

// Hàm xáo trộn một mảng
function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Hàm bắt đầu đếm ngược
function startCountdown(timerElement: HTMLElement) {
    isCountingDown = true;
    countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - countdownStartTime;
        const remainingTime = 10 * 60 * 1000 - elapsedTime;
        if (remainingTime <= 0) {
            stopCountdown();
            timerElement.innerHTML = '<h3>Time\'s up!</h3>';
        } else {
            const minutes = Math.floor(remainingTime / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            timerElement.innerHTML = `<h3>${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</h3>`;
        }
    }, 1000);
}

// Hàm dừng đếm ngược
function stopCountdown() {
    isCountingDown = false;
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
}

