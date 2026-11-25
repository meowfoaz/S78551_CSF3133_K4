// Global state variables to track player name, scores, game status, and round results
let playerName = "";
let wins = 0;
let losses = 0;
let draws = 0;
let gameStarted = false;
let results = [];

// Starts the game after validating the player's name input
function startGame() {
    // Read and trim whitespace from the name text box
    const nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    // Save player name and enable gameplay
    playerName = nameInput;
    gameStarted = true;

    // Update player label, welcome message, and session start timestamp
    document.getElementById("playerLabel").innerHTML = playerName;
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = `Welcome, ${playerName}!`;
    resultEl.style.color = "";

    document.getElementById("startTime").innerHTML = "Started: " + new Date();
}

// Randomly selects and returns "rock", "paper", or "scissors" for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Executes a single round when the player clicks Rock, Paper, or Scissors
function playRound(playerChoice) {
    // Prevent playing before Start Game is clicked
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    // Generate computer move and update both player and computer images
    const computerChoice = getComputerChoice();
    document.getElementById("playerImg").src = playerChoice + ".png";
    document.getElementById("computerImg").src = computerChoice + ".png";

    const resultEl = document.getElementById("result");
    let outcome = "";
    let rowColor = "";

    // Determine round winner using standard Rock-Paper-Scissors rules
    if (playerChoice === computerChoice) {
        outcome = "Draw";
        rowColor = "white";
        draws++;
        resultEl.innerHTML = `Draw! Both chose ${playerChoice}.`;
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        outcome = "Win";
        rowColor = "#cce5ff";
        wins++;
        resultEl.innerHTML = `You Win! ${playerChoice} beats ${computerChoice}.`;
        resultEl.style.color = "green";
    } else {
        outcome = "Lose";
        rowColor = "#f8d7da";
        losses++;
        resultEl.innerHTML = `You Lose! ${computerChoice} beats ${playerChoice}.`;
        resultEl.style.color = "red";
    }

    // Record the outcome in the results array and refresh scoreboard counters
    results.push(outcome);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append a color-coded row to the match history table (Win = blue, Lose = red, Draw = white)
    const roundNumber = results.length;
    const historyTable = document.getElementById("history");
    historyTable.innerHTML += `
        <tr style="background-color: ${rowColor};">
            <td>${roundNumber}</td>
            <td>${playerChoice}</td>
            <td>${computerChoice}</td>
            <td>${outcome}</td>
        </tr>
    `;
}

// Calculates total rounds played and win percentage using a for loop over results
function showSummary() {
    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const totalRounds = results.length;
    const winPercentage = totalRounds > 0 ? Math.round((winCount / totalRounds) * 100) : 0;

    alert(`You played ${totalRounds} rounds and won ${winPercentage}%`);
}

// Resets all scores, arrays, images, messages, and history rows to their initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    results = [];
    gameStarted = false;

    // Reset scoreboard numbers
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear player name input, result message, images, and start time
    document.getElementById("playerName").value = "";
    document.getElementById("playerLabel").innerHTML = "You";
    const resultEl = document.getElementById("result");
    resultEl.innerHTML = "";
    resultEl.style.color = "";

    document.getElementById("playerImg").src = "";
    document.getElementById("computerImg").src = "";
    document.getElementById("startTime").innerHTML = "";

    // Restore the history table to contain only its header row
    const historyTable = document.getElementById("history");
    historyTable.innerHTML = `
        <tr>
            <th>Round</th>
            <th>You</th>
            <th>Computer</th>
            <th>Result</th>
        </tr>
    `;
}