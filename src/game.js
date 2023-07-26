function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomNumber = Math.floor(Math.random()*3);
    //console.log(randomNumber)
    let choice = choices[randomNumber];
    console.log(`Computer Choice: ${choice}`);
    return choice;
}

function playRound(playerChoice, computerChoice) {
    playerChoice = playerChoice.toLowerCase();
    if (playerChoice === computerChoice) {
        return "draw"
    }
    let choiceMapping = new Map();
    choiceMapping.set("rock", 0);
    choiceMapping.set("paper", 1);
    choiceMapping.set("scissors", 2);
    let playerNum = choiceMapping.get(playerChoice);
    let cpuNum = choiceMapping.get(computerChoice);
    if ((playerNum+1) % 3 === cpuNum % 3) {
        return `player-loss`;
    }
    else {
        return `player-win`;
    }
}

function displayChoices(userChoice, cpuChoice) {
    const choiceContainer = document.querySelector('.choices-container');
    
    changeTextContent("#user-choice", userChoice);
    changeTextContent("#cpu-choice", cpuChoice);

    showNodes(choiceContainer);
    
}

function displayResult(gameResult) {
    const gameResultContentDiv = document.querySelector('.result-content');
    if (gameResult === 'player-win') {
        userWins++;
        gameResultContentDiv.textContent = "Player wins!";
    }
    else if (gameResult === 'player-loss') {
        cpuWins++;
        gameResultContentDiv.textContent = "Player lost :(";
    }
    else {
        gameResultContentDiv.textContent = "It was a draw";
    }

    const resultContainer = document.querySelector('.result-container');
    showNodes(resultContainer);
}

function displayScorecard() {
    console.log(`User Wins: ${userWins}`);
    console.log(`CPU Wins: ${cpuWins}`);
    console.log(' ');

    changeTextContent("#user-score-count", userWins);
    changeTextContent("#cpu-score-count", cpuWins);

    let scorecardContainer = document.querySelector('.scorecard-container');
    showNodes(scorecardContainer);
}

function decideWinner() {
    const winnerContent = document.querySelector('.winner-content');
    let winnerExists = false;

    if (userWins === winsNeeded) {
        winnerContent.textContent = "YOU WON!"
        winnerExists = true;
    }
    else if (cpuWins === winsNeeded) {
        winnerContent.textContent = "The CPU defeated you"
        winnerExists = true;
    }

    if (winnerExists) {
        const fighterOptionsContainer = document.querySelector('.fighter-options-container');
        const choicesContainer = document.querySelector('.choices-container');
        const resultContainer = document.querySelector('.result-container');
        
        hideNodes(fighterOptionsContainer, choicesContainer, resultContainer);
        
        const winnerContainer = document.querySelector('.winner-container');
        showNodes(winnerContainer);
        userWins = 0;
        cpuWins = 0;
    }
}

function setBestOf() {
    
    bestOfNumber = Number(this.textContent);
    console.log(`Best of ${bestOfNumber} chosen`);

    winsNeeded = Math.trunc(bestOfNumber/2)+1;
    console.log(`Wins needed to win: ${Math.trunc(bestOfNumber/2)+1}`)

    const bestOfContainer = document.querySelector('.game-options-container');
    hideNodes(bestOfContainer);
    
    const fighterOptionsContainer = document.querySelector('.fighter-options-container');
    showNodes(fighterOptionsContainer);
}

function game() {
    
    const awesomeMusic = document.querySelector('#awesome-audio');
    if (!awesomeMusic.classList.contains('playing')) {
        console.log(awesomeMusic);
        awesomeMusic.play();
        awesomeMusic.classList.add('playing');
    }
    
    console.log(`User Choice: ${this.id}`);
    let userChoice = this.id;
    let cpuChoice = getComputerChoice();
    let result = playRound(userChoice, cpuChoice);
    console.log(result);

    displayChoices(userChoice, cpuChoice)

    // LOADING DISPLAY JS??

    displayResult(result);

    displayScorecard();

    decideWinner();
}

function playAgain() {
    const scorecardContainer = document.querySelector('.scorecard-container');
    const winnerContainer = document.querySelector('.winner-container');
    hideNodes(scorecardContainer, winnerContainer);
    
    const bestOfContainer = document.querySelector('.game-options-container');
    showNodes(bestOfContainer);
}

function hideNodes(...headNodes) {
    headNodes.forEach(headNode => {
        headNode.style.cssText = "display: none";
    })
}

function showNodes(...headNodes) {
    // assumes that all containers are flex displays
    headNodes.forEach(headNode => {
        headNode.style.cssText = "display: flex";
    })
}

function changeTextContent (query, text) {
    const playerScoreCount = document.querySelector(query);
    playerScoreCount.textContent = text;
}


let cpuWins = 0;
let userWins = 0;
let bestOfNumber = 0;
let winsNeeded = 0;

const bestOfChoices = document.querySelectorAll('button.best-of-choice');
bestOfChoices.forEach(bestOfChoice => bestOfChoice.addEventListener("click", setBestOf))

const fighterChoices = document.querySelectorAll('button.fighter-choice');
fighterChoices.forEach(fighterChoice => fighterChoice.addEventListener("click", game));

const playAgainButton = document.querySelector('.play-again');
playAgainButton.addEventListener("click", playAgain);