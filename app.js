let scoreBoard = {};
let guess;
let numGuess;
let oldGuess;
let answer;
function gameLoop(playerName) {
  if (typeof playerName != "string") {
    var playerName = prompt("what's your name?");
  }

  //   answer = Math.floor(Math.random() * 100);
  answer = 20;
  guess = prompt("I'm thinking of a number between 1 and 100");
  numGuess = 1;
  oldGuess = [guess];

  while (guess != answer) {
    if (guess < answer) {
      guess = prompt(`sorry, ${playerName} ${guess} too low guess again`);
      numGuess++;
      oldGuess.push(guess);
    } else if (guess > answer) {
      guess = prompt(`sorry, ${playerName} ${guess} too high guess again`);
      numGuess++;
      oldGuess.push(guess);
    } else {
      guess = prompt(`try again!`);
    }
  }
  scoreSorter(playerName, answer, numGuess, oldGuess);
  tableRead(scoreBoard);
  playAgain(playerName);
}

function scoreSorter(playerName, answer, numGuess, oldGuess) {
  if (scoreBoard[playerName] === undefined) {
    scoreBoard[playerName] = numGuess;
    alert(
      `Correct ${playerName}! answer was ${answer} you guessed ${numGuess} times and tried ${oldGuess}`
    );
  } else if (scoreBoard[playerName] > numGuess) {
    alert(
      `New high score ${playerName}! answer was ${answer} you guessed ${numGuess} times and tried ${oldGuess}, ${
        scoreBoard[playerName] - numGuess
      } less guesses`
    );
    scoreBoard[playerName] = numGuess;
  }
}

function playAgain(playerName) {
  let ans = prompt("play again? (Y / N)");
  if (ans != "Y") {
    return;
  } else {
    gameLoop(playerName);
  }
}

function tableRead(obj) {
  localStorage.clear();
  localStorage.setItem("myFile", JSON.stringify(obj));
  let table = document.getElementById("scores");
  table.innerHTML = `<tr>
  <th>Player Name</th>
  <th>Scores</th>
  </tr>`;
  for (elem in obj) {
    let row = document.createElement("tr");
    row.className = "scoreboardRow";
    table.appendChild(row);
    let playerName = document.createElement("td");
    let playerScore = document.createElement("td");
    playerName.innerText = elem;
    playerScore.innerText = obj[elem];
    row.appendChild(playerName);
    row.appendChild(playerScore);
  }
}
