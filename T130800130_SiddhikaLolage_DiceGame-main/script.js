// Simple Dice Game Variables
let currentPlayer = 1;
let gameActive = true;
let playerRolls = [null, null, null];
let playerWins = [0, 0, 0];

// Dice symbols
const diceSymbols = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// Initialize game
function initGame() {
    updateCurrentPlayer();
}

// Roll dice for current player
function rollDice() {
    if (!gameActive) return;

    // Disable roll button temporarily
    document.getElementById('rollBtn').disabled = true;

    // Generate random number 1-6
    const roll = Math.floor(Math.random() * 6) + 1;

    // Store the roll
    playerRolls[currentPlayer - 1] = roll;

    // Update display
    document.getElementById(`dice${currentPlayer}`).textContent = diceSymbols[roll - 1];
    document.getElementById(`result${currentPlayer}`).textContent = roll;

    // Remove active class from current player
    document.getElementById(`player${currentPlayer}`).classList.remove('active');

    // Move to next player or end game
    if (currentPlayer < 3) {
        currentPlayer++;
        setTimeout(() => {
            updateCurrentPlayer();
            document.getElementById('rollBtn').disabled = false;
        }, 1000);
    } else {
        // All players have rolled - determine winner
        setTimeout(determineWinner, 1000);
    }
}

// Update current player display
function updateCurrentPlayer() {
    // Remove active class from all players
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`player${i}`).classList.remove('active');
    }

    // Add active class to current player
    if (gameActive && currentPlayer <= 3) {
        document.getElementById(`player${currentPlayer}`).classList.add('active');
        document.getElementById('currentPlayer').textContent = `Player ${currentPlayer}'s Turn`;
    }
}

// Determine winner
function determineWinner() {
    gameActive = false;

    // Find highest roll
    const maxRoll = Math.max(...playerRolls);
    const winners = [];

    // Find all players with highest roll
    for (let i = 0; i < 3; i++) {
        if (playerRolls[i] === maxRoll) {
            winners.push(i + 1);
            document.getElementById(`player${i + 1}`).classList.add('winner');
            playerWins[i]++;
            document.getElementById(`wins${i + 1}`).textContent = playerWins[i];
        }
    }

    // Display winner message
    const winnerDiv = document.getElementById('winner');
    if (winners.length === 1) {
        winnerDiv.textContent = `🎉 Player ${winners[0]} Wins with ${maxRoll}! 🎉`;
    } else {
        winnerDiv.textContent = `🤝 Tie! Players ${winners.join(' & ')} tied with ${maxRoll}! 🤝`;
    }
    winnerDiv.classList.add('show');

    // Hide roll button and show new game button
    document.getElementById('rollBtn').style.display = 'none';
    document.getElementById('newGameBtn').style.display = 'inline-block';
    document.getElementById('currentPlayer').textContent = 'Game Complete!';
}

// Start new game
function newGame() {
    // Reset variables
    currentPlayer = 1;
    gameActive = true;
    playerRolls = [null, null, null];

    // Reset displays
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`dice${i}`).textContent = '🎲';
        document.getElementById(`result${i}`).textContent = '-';
        document.getElementById(`player${i}`).classList.remove('active', 'winner');
    }

    // Reset winner display
    const winnerDiv = document.getElementById('winner');
    winnerDiv.textContent = '';
    winnerDiv.classList.remove('show');

    // Reset buttons
    document.getElementById('rollBtn').style.display = 'inline-block';
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('newGameBtn').style.display = 'none';

    // Start new game
    updateCurrentPlayer();
}

// Initialize when page loads
window.onload = initGame;