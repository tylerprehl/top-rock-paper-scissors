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
        return "It was a draw!"
    }
    let choiceMapping = new Map();
    choiceMapping.set("rock", 0);
    choiceMapping.set("paper", 1);
    choiceMapping.set("scissors", 2);
    let playerNum = choiceMapping.get(playerChoice);
    let cpuNum = choiceMapping.get(computerChoice);
    if ((playerNum+1) % 3 === cpuNum % 3) {
        return `You lost :/ ${playerChoice} loses to ${computerChoice}`;
    }
    else {
        return `You won! ${playerChoice} beats ${computerChoice}`;
    }
}

function game() {
    for (let i=0; i<5; i++) {
        let userChoice = prompt("Please enter rock, paper, or scissors: ");
        console.log(playRound(userChoice, getComputerChoice()));
    }
}

game();