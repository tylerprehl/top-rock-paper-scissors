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
    
    // if no choice-content elements exist yet
    if (choiceContainer.querySelector('.choice-content') === null) {
        // create them
        displayIndividualChoice(choiceContainer, "user", userChoice);
        displayIndividualChoice(choiceContainer, "cpu", cpuChoice);
    }
    else {
        // change them
        changeTextContent("#user-choice", userChoice);
        changeTextContent("#cpu-choice", cpuChoice);
    }
}

function displayIndividualChoice(parentNode, player, playerChoice) {
    const playerChoiceContent = document.createElement('div');
    playerChoiceContent.classList.add('choice-content');

    const playerChoiceTitle = document.createElement('div');
    playerChoiceTitle.classList.add(`${player}-choice-title`);
    playerChoiceTitle.textContent = `${player.toUpperCase()} Choice:`;
    playerChoiceContent.appendChild(playerChoiceTitle);

    const playerChoiceDiv = document.createElement('div');
    playerChoiceDiv.id = `${player}-choice`;
    playerChoiceDiv.textContent = playerChoice.toUpperCase();
    playerChoiceContent.appendChild(playerChoiceDiv);

    parentNode.appendChild(playerChoiceContent);
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
        // then create it and the user/cpu score elements
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
        changeTextContent("#user-score-count", userWins);
        changeTextContent("#cpu-score-count", cpuWins);
    }
}

function displayScore (parentNode, player, wins) {
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

    parentNode.appendChild(playerScoreContent);
}

function changeTextContent (query, text) {
    const playerScoreCount = document.querySelector(query);
    playerScoreCount.textContent = text;
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

