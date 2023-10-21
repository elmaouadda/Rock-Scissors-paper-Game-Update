let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/* 
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/
let isAutoPlaying = false;
let intervalId;

  // const autoPlay = () => {};

 
 
document.querySelector('.js-autoplay').addEventListener('click', () => {
  if(!isAutoPlaying) {
    intervalId = setInterval( () => {
       const playerMove = pickComputerMove();
       playGame (playerMove);
     }, 1000 );
     isAutoPlaying = true ;
     document.querySelector('.js-autoplay').innerHTML ='Stop Playing';
   } else {
     clearInterval(intervalId);
     isAutoPlaying = false;
     document.querySelector('.js-autoplay').innerHTML ='Auto Play';
   } 
})


const autoplayButton = ()=> {
  if(!isAutoPlaying) {
    intervalId = setInterval( () => {
       const playerMove = pickComputerMove();
       playGame (playerMove);
     }, 1000 );
     isAutoPlaying = true ;
     document.querySelector('.js-autoplay').innerHTML ='Stop Playing';
   } else {
     clearInterval(intervalId);
     isAutoPlaying = false;
     document.querySelector('.js-autoplay').innerHTML ='Auto Play';
   }
} 


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock')
 });

 document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper')
 } )

 document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors')
 })

 document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  }  else if (event.key === 's') {
    playGame('scissors');
  } else if(event.key === 'a') {

    autoplayButton();
  } else if (event.key === 'h'){
    resetScore();
  }
 })

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  result = "";
  if (playerMove === "paper") {
    if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "scissors") {
      result = "Tie.";
    } else if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    }
    if (computerMove === "scissors") {
      result = "You win";
    }
    if (computerMove === "paper") {
      result = "You lose.";
    }
  }

  if (result === "You win") {
    score.wins = score.wins + 1;
  } else if (result === "You lose") {
    score.losses = score.losses + 1;
  } else if (result === "Tie.") {
    score.ties = score.ties + 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon" />
<img src="${computerMove}-emoji.png" class="move-icon" />
Computer`;
}


function resetScore(){
  score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    resetButton();  
    
}

document.querySelector('.js-reset-score-button').addEventListener('click', ()=> {
  showResetConfimation();
  
});

const showResetConfimation = () =>{
  document.querySelector('.js-message-button').innerHTML =` Are you sure you want to reset the score?  <button class="js-reset-score">Yes</button> <button class="js-reset-score-no">No</button>`;

  document.querySelector('.js-reset-score').addEventListener('click', ()=>{
  
    hiddenResetButton(); 
    resetScore();
    
  })
  
  document.querySelector('.js-reset-score-no').addEventListener('click', () => {
    hiddenResetButton(); 
  })
}







function hiddenResetButton(){

  document.querySelector('.js-message-button').innerHTML = '';
 
}











function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  
}

function updateResultElement() {
  document.querySelector(".js-result").innerHTML = `${result}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if ((randomNumber >= 1 / 3) & (randomNumber < 2 / 3)) {
    computerMove = "scissors";
  } else if ((randomNumber >= 2 / 3) & (randomNumber < 1)) {
    computerMove = "paper";
  }

  return computerMove;
}