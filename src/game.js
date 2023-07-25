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

function displayResult(gameResult) {
    const resultContainer = document.querySelector('.result-container');

    // if the result-container does not have the result (title) elements yet
    if (resultContainer.querySelector('.result-title') === null) {
        // then create them
        const gameResultTitleDiv = document.createElement('div');
        gameResultTitleDiv.classList.add('result-title')
        gameResultTitleDiv.textContent = "Game Result:";
        resultContainer.appendChild(gameResultTitleDiv);

        const gameResultContentDivNew = document.createElement('div');
        gameResultContentDivNew.classList.add('result-content');
        resultContainer.appendChild(gameResultContentDivNew);
    }

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
}

function displayScorecard() {
    console.log(`User Wins: ${userWins}`);
    console.log(`CPU Wins: ${cpuWins}`);
    console.log(' ');

    let scorecardContainer = document.querySelector('.scorecard-container');
    console.log(scorecardContainer);

    // if the scorecard-container does not exist
    if (!scorecardContainer) {
        // then create it and its children
        const body = document.querySelector('body');
        const footerContainer = document.querySelector('.footer-container');
        
        scorecardContainer = document.createElement('div');
        scorecardContainer.classList.add('scorecard-container');
        // apply cool border (see style.css for credit)
        scorecardContainer.style.cssText = "border: solid 5px white;" +
                                           "width: 350px;" + 
                                           "border-width: 3px 3px 5px 5px;" +
                                           "border-radius: 4% 95% 6% 95%/95% 4% 92% 5%;" +
                                           "transform: rotate(-2deg);"
        body.insertBefore(scorecardContainer, footerContainer);

        const scorecardTitle = document.createElement('div');
        scorecardTitle.classList.add('scorecard-title')
        scorecardTitle.textContent = "Scorecard:";
        scorecardContainer.appendChild(scorecardTitle);

        const scorecardContent = document.createElement('div');
        scorecardContent.classList.add('scorecard-content');
        scorecardContainer.appendChild(scorecardContent);

        // user score
        displayScore(scorecardContent, "user", userWins);

        // cpu score
        displayScore(scorecardContent, "cpu", cpuWins);
    }
    else {
        changeScore("user", userWins);
        changeScore("cpu", cpuWins);
    }
}

function displayScore (parentContent, player, wins) {
    const playerScoreContent = document.createElement('div');
    playerScoreContent.classList.add('individual-score-content');

    const playerScoreTitle = document.createElement('div');
    playerScoreTitle.classList.add('individual-score-title');
    playerScoreTitle.textContent = `${player.toUpperCase()} Score`;
    playerScoreContent.appendChild(playerScoreTitle);

    const playerScoreCount = document.createElement('div');
    playerScoreCount.classList.add('individual-score-count');
    playerScoreCount.id = `${player}-score-count`;
    playerScoreCount.textContent = wins;
    playerScoreContent.appendChild(playerScoreCount);

    parentContent.appendChild(playerScoreContent);
}

function changeScore (player, wins) {
    const playerScoreCount = document.querySelector(`#${player}-score-count`);
    playerScoreCount.textContent = wins;
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

    displayResult(result);

    displayScorecard();
}

function removeChildNodes(headNode) {
    if (headNode.childNodes.length !== 0) {
        Array.from(headNode.childNodes).forEach(function (childNode) {
            headNode.removeChild(childNode);
        })
    }
}

let cpuWins = 0;
let userWins = 0;

const userChoices = document.querySelectorAll('button');
userChoices.forEach(choice => choice.addEventListener("click", game));

