// 🎮 Levels Configuration
const levels = [
    {
        level: 1,
        symbols: ['🍎', '🍌', '🍒', '🍇'],
        columns: 4
    },
    {
        level: 2,
        symbols: ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓'],
        columns: 4
    },
    {
        level: 3,
        symbols: ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍍', '🥭'],
        columns: 4
    }
];

let currentLevel = 0;
let cards = [];

// 🎯 DOM Elements
const gameBoard = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const timeDisplay = document.getElementById("time");
const restartBtn = document.getElementById("restartBtn");
const levelDisplay = document.getElementById("level");

// 🧠 Game State
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;
let time = 0;
let timerInterval = null;

// 🔀 Shuffle cards
function shuffleCards() {
    cards.sort(() => 0.5 - Math.random());
}

// ⏱ Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
    }, 1000);
}

// 🧱 Create a card
function createCard(symbol) {
    const card = document.createElement("div");
    card.classList.add("card", "hidden");
    card.dataset.symbol = symbol;
    card.textContent = symbol;
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
}

// 🔄 Flip card
function flipCard(card) {
    if (lockBoard || card === firstCard) return;

    if (moves === 0 && !timerInterval) startTimer();

    card.classList.remove("hidden");

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        moves++;
        movesDisplay.textContent = moves;
        lockBoard = true;
        checkMatch();
    }
}

// ✅ Check match
function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        matchedPairs++;
        resetTurn();

        if (matchedPairs === cards.length / 2) {
            clearInterval(timerInterval);

            setTimeout(() => {
                if (currentLevel < levels.length - 1) {
                    alert(`🎉 Level ${levels[currentLevel].level} completed!`);
                    currentLevel++;
                    initGame();
                } else {
                    alert("🏆 Congratulations! You completed ALL levels!");
                }
            }, 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            resetTurn();
        }, 1000);
    }
}

// 🔁 Reset card turn
function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// 🔄 Reset stats
function resetStats() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 0;
    moves = 0;
    matchedPairs = 0;
    timeDisplay.textContent = 0;
    movesDisplay.textContent = 0;
}

// 🔄 Restart game
restartBtn.addEventListener("click", () => {
    currentLevel = 0;
    initGame();
});

// 🚀 Initialize game
function initGame() {
    resetStats();

    const levelData = levels[currentLevel];
    levelDisplay.textContent = levelData.level;

    cards = [...levelData.symbols, ...levelData.symbols];
    shuffleCards();

    gameBoard.innerHTML = "";
    gameBoard.style.gridTemplateColumns =
        `repeat(${levelData.columns}, 100px)`;

    cards.forEach(createCard);
}

// ▶️ Start game
initGame();
