let playerScore = localStorage.getItem('playerScore') ? parseInt(localStorage.getItem('playerScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

window.onload = function() {
    updateScoreboard();
};

function play(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let resultMessage = '';

    if (playerChoice === computerChoice) {
        resultMessage = `<h1>TIE</h1>`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        resultMessage = `<h1>YOU WIN</h1><h3>AGAINST PC</h3>`;
    } else {
        computerScore++;
        resultMessage = `<h1>YOU LOST</h1><h3>AGAINST PC</h3>`;
    }

    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);

    updateScoreboard();
    displayResult(resultMessage, playerChoice, computerChoice);
}

function updateScoreboard() {
    const scoreboard = document.querySelector('.scores');
    scoreboard.querySelector('.score-box p').textContent = computerScore;
    scoreboard.querySelector('.score-box-2 p').textContent = playerScore;
}

function displayResult(resultMessage, playerChoice, computerChoice) {
    const homeContainer = document.querySelector('.home');
    const playerImage = `images/${capitalizeFirstLetter(playerChoice).toUpperCase()}.png`;
    const computerImage = `images/${capitalizeFirstLetter(computerChoice).toUpperCase()}.png`;
    const isPlayerWin = resultMessage.includes('WIN');

    const resultContainer = `
        <div class="you-choose-${playerChoice}" style="padding:2vh; margin-left:-10vh">
            <div class="match-start">
                <div class="choose-${playerChoice}-${computerChoice}">
                    <div class="Rock-you-${resultMessage.includes('TIE') ? 'tie' : resultMessage.includes('WIN') ? 'win' : 'lost'}">
                        <span>
                            <h5 class="you-pick">YOU PICKED</h5>
                            <img src="${playerImage}" alt="${playerChoice}">
                            ${playerChoice === 'paper' && computerChoice !== 'paper' ? '<img src="images/Group 2.png" alt="Paper" class="paper">' : ''}
                        </span>
                        <div class="${resultMessage.includes('TIE') ? 'tie' : resultMessage.includes('WIN') ? 'win' : 'lost'}">
                            <span>
                                ${resultMessage}
                                <button class="playagain" onclick="playAgain()">PLAY AGAIN</button>
                            </span>
                        </div>
                        <span>
                            <h5 class="pc-pick">PC PICKED</h5>
                            <img src="${computerImage}" alt="${computerChoice}">
                            ${computerChoice === 'paper' ? '<img src="images/Group 2.png" alt="Paper" class="computer-paper">' : ''}
                        </span>
                    </div>
                </div>
            </div>
            <div class="rules-2" style="margin-top: 40vh; margin-right: 4vh; margin-left: -20vh">
                <button class="rules-button" onclick="toggleRules2()">RULES</button>
                ${isPlayerWin ? `<button class="next-button-2" onclick="displayVictoryScreen()" style="border: 4px solid white; font-size: 30px; padding-top: 1vh; padding-bottom: 1vh; padding-left: 2vh; padding-right: 2vh; border-radius: 10px; cursor: pointer; color: white; font-weight: bolder; margin-left: 2vh;">NEXT</button>` : ''}
            </div>
            <div class="rules-box-2" style="display: none; background-color: #174F32; color: white; width: 300px; position: relative; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); margin-left: 170vh; margin-top: -55vh; padding-left: 2vh; padding-right: 2vh; padding-top: 3vh; padding-bottom: 3vh; border: 10px solid white; border-radius: 10px;">
                <button class="close-btn" onclick="closeRules2()">X</button>
                <h2 style="margin-top: 0; background-color: #174F32; font-size: 40px; padding-left: 5vh; padding-bottom: 3vh;">Game Rules</h2>
                <ul style="list-style-type: none; padding-left: 0; background-color: #174F32;">
                    <li style="margin-bottom: 10px; display: flex; align-items: start; background-color: #174F32;">Rock beats scissors, scissors beat paper, and paper beats rock.</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: start; background-color: #174F32;">Agree ahead of time whether you'll count off "rock, paper, scissors, shoot" or just "rock, paper, scissors."</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: start; background-color: #174F32;">Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
                    <li style="margin-bottom: 10px; display: flex; align-items: start; background-color: #174F32;">If both players lay down the same hand, each player lays down another hand.</li>
                </ul>
            </div>
        </div>
    `;

    homeContainer.style.display = 'none';
    document.body.insertAdjacentHTML('beforeend', resultContainer);
}

function playAgain() {
    document.querySelector('.home').style.display = 'block';
    const resultContainer = document.querySelector('.you-choose-rock') || document.querySelector('.you-choose-paper') || document.querySelector('.you-choose-scissors');
    if (resultContainer) {
        resultContainer.remove();
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function toggleRules() {
    const rulesBox = document.querySelector('.rules-box');
    if (rulesBox.style.display === 'none' || rulesBox.style.display === '') {
        rulesBox.style.display = 'block';
    }
}

function closeRules() {
    const rulesBox = document.querySelector('.rules-box');
    rulesBox.style.display = 'none';
}

function toggleRules2() {
    const rulesBox = document.querySelector('.rules-box-2');
    if (rulesBox.style.display === 'none' || rulesBox.style.display === '') {
        rulesBox.style.display = 'block';
    }
}

function closeRules2() {
    const rulesBox = document.querySelector('.rules-box-2');
    rulesBox.style.display = 'none';
}

function resetGame() {
    location.reload();
}

document.querySelector('.next-button-2').addEventListener('click', function() {
    displayVictoryScreen();
});

function displayVictoryScreen() {
    const newPageContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Victory</title>
        <link rel="stylesheet" href="congo.css">
    </head>
    <body>
        <div class="container">
            <div class="stars"><img src="images/star.png" alt="Stars"></div>
            <div class="cup"><img src="images/cup.png" alt="Trophy"></div>
            <div class="cheer">
                <span><h1>HURRAY!!</h1><br><h2>YOU WON THE GAME</h2></span>
            </div>
            <button class="playagain" onclick="resetGame()">PLAY AGAIN</button>
            <div class="rules">
                <button class="rules-button" onclick="toggleRules()">RULES</button>
            </div>
            <div class="rules-box" style="display: none;">
                <button class="close-btn" onclick="closeRules()">X</button>
                <h2>Game Rules</h2>
                <ul>
                    <li>Rock beats scissors, scissors beat paper, and paper beats rock.</li>
                    <li>Agree ahead of time whether you'll count off "rock, paper, scissors, shoot" or just "rock, paper, scissors."</li>
                    <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
                    <li>If both players lay down the same hand, each player lays down another hand.</li>
                </ul>
            </div>
        </div>
    </body>
    </html>
    `;

    document.open();
    document.write(newPageContent);
    document.close();
}
