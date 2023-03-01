let scoreBoard = {};

// this is the main functional loop that executes when button is pressed
function gameLoop(playerName) {
  if (typeof playerName != "string") {
    var playerName = prompt("what's your name?");
  }

  answer = Math.floor(Math.random() * 100);
  let guess = prompt("I'm thinking of a number between 1 and 100");
  let numGuess = 1;
  let oldGuess = [guess];

  while (guess != answer) {
    guess = parseInt(guess);
    if (!guess || typeof guess !== "number") {
      guess = prompt(`try again!`);
      continue;
    } else if (guess < answer) {
      guess = prompt(`sorry, ${playerName} ${guess} too low guess again`);
    } else if (guess > answer) {
      guess = prompt(`sorry, ${playerName} ${guess} too high guess again`);
    }
    numGuess++;
    oldGuess.push(guess);
  }

  scoreSorter(playerName, answer, numGuess, oldGuess);
  tableRead(scoreBoard);

  // this sends the play again to the webapi queue so the stack is empty long enough to render
  // from tableread, thanks for the video rane!
  setTimeout(() => {
    playAgain(playerName);
  }, 1);
}

// tanages the messages for correct answers and the scoreboard object
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

// checks to see if player wants to play again with the same name
function playAgain(playerName) {
  let ans = prompt("play again? (Y / N)");
  if (ans != "Y") {
    return;
  } else {
    gameLoop(playerName);
  }
}

// reads from object and appends table with values
function tableRead(obj) {
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
