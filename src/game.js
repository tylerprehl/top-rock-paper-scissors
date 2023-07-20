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

function game(e) {
    console.log(`User Choice: ${this.id}`);
    let userChoice = this.id;
    let result = playRound(userChoice, getComputerChoice());
    console.log(result);

    const resultDisplay = document.querySelector('#game-result');
    console.log(resultDisplay);
    // ERROR IS OCCURRING HERE!!!!

    if (result === 'player-win') {
        userWins++;
        resultDisplay.textContent = "Player wins!";
    }
    else if (result === 'player-loss') {
        cpuWins++;
        resultDisplay.textContent = "Player lost :(";
    }
    else {
        resultDisplay.textContent = "It was a draw";
    }

    console.log(`User Wins: ${userWins}`);
    console.log(`CPU Wins: ${cpuWins}`);
    console.log(' ');
}

let cpuWins = 0;
let userWins = 0;

const userChoices = document.querySelectorAll('button');
userChoices.forEach(choice => choice.addEventListener("click", game));




//game();