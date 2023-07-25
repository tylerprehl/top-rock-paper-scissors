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
    
    // remove old players' choices
    if (choiceContainer.childNodes.length !== 0) {
        const choiceDisplays = document.querySelectorAll('.choice-content');
        choiceContainer.removeChild(choiceDisplays[0]);
        choiceContainer.removeChild(choiceDisplays[1]);
    }

    // create new user's choice
    const userChoiceContent = document.createElement('div');
    userChoiceContent.classList.add('choice-content');

    const userChoiceTitle = document.createElement('div');
    userChoiceTitle.classList.add('user-choice-title');
    userChoiceTitle.textContent = "User Choice:";
    userChoiceContent.appendChild(userChoiceTitle);

    const userChoiceDiv = document.createElement('div');
    userChoiceDiv.id = 'user-choice';
    userChoiceDiv.textContent = userChoice.toUpperCase();
    userChoiceContent.appendChild(userChoiceDiv);

    choiceContainer.appendChild(userChoiceContent);

    // create new cpu's choice
    const cpuChoiceContent = document.createElement('div');
    cpuChoiceContent.classList.add('choice-content');

    const cpuChoiceTitle = document.createElement('div');
    cpuChoiceTitle.classList.add('cpu-choice-title');
    cpuChoiceTitle.textContent = "CPU Choice:";
    cpuChoiceContent.appendChild(cpuChoiceTitle);

    const cpuChoiceDiv = document.createElement('div');
    cpuChoiceDiv.classList.add('choice');
    cpuChoiceDiv.id = 'cpu-choice';
    cpuChoiceDiv.textContent = cpuChoice.toUpperCase();
    cpuChoiceContent.appendChild(cpuChoiceDiv);

    choiceContainer.appendChild(cpuChoiceContent);
}

function displayResults(gameResult) {
    const resultsContainer = document.querySelector('.result-container');
    
    // get rid of old results
    // I considered the option of just editing the current nodes (if they 
    // already exist), but decided that for simplicity I would do a full 
    // overwrite
    if (resultsContainer.childNodes.length !== 0) {
        const oldGameResultTitle = document.querySelector('.result-title');
        const oldGameResultContent = document.querySelector('.result-content');
        resultsContainer.removeChild(oldGameResultTitle);
        resultsContainer.removeChild(oldGameResultContent);
    }
    
    // start creation of new results
    const gameResultTitleDiv = document.createElement('div');
    gameResultTitleDiv.classList.add('result-title')
    gameResultTitleDiv.textContent = "Game Results:";
    resultsContainer.appendChild(gameResultTitleDiv);

    const gameResultContentDiv = document.createElement('div');
    gameResultContentDiv.classList.add('result-content');
    
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

    resultsContainer.appendChild(gameResultContentDiv);
}

function displayWins() {
    console.log(`User Wins: ${userWins}`);
    console.log(`CPU Wins: ${cpuWins}`);
    console.log(' ');
}

function game(e) {
    
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

    displayResults(result);

    displayWins();
}

let cpuWins = 0;
let userWins = 0;

const userChoices = document.querySelectorAll('button');
userChoices.forEach(choice => choice.addEventListener("click", game));

