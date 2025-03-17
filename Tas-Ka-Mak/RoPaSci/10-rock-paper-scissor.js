let playerChoice;
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let point = (score.wins) + (-1 * score.losses) + (score.ties * 0);

let isAutoPlayin=false;
let intervalId;

function autoPlay(){
  if(!isAutoPlayin){
    document.querySelector('.auto-play-btn').style.backgroundColor = 'green';
    intervalId = setInterval(function(){
      const playerMove=pickComputerChoice();
      playGame(playerMove);
    },1000)
    isAutoPlayin=true;
  }
  else{
    document.querySelector('.auto-play-btn').style.backgroundColor = 'white';
    clearInterval(intervalId);
    isAutoPlayin=false;
  }
}

function playGame(playerChoice){
  
  let result='';
  computerChoice=pickComputerChoice();
  if (playerChoice === 'scissor'){
    if(computerChoice==='rock'){
      result='You loose';
    } 
    else if(computerChoice==='paper'){
      result='You win';
    }
    else{
      result='tie';
    }
    
  }else if(playerChoice==='paper'){
    computerChoice=pickComputerChoice();
    
    if(computerChoice==='rock'){
      result='You win';
    }
    else if (computerChoice==='paper'){
      result='tie';
    }
    else{
      result='You loose';
    }
    
  }
  else{
    computerChoice=pickComputerChoice();
        if(computerChoice==='rock'){
          result='Tie';
        }else if(computerChoice==='paper'){
          result='You loose';
        }else{
          result='You win';
        }
      
  }

  
  if(result==='You win'){
    score.wins+=1;
    point+=1;
  }
  else if(result==='You loose'){
    score.losses+=1;
    point-=1;
  }
  else{
    score.ties+=1;
  }
  localStorage.setItem('score',JSON.stringify(score));

  updateScore();
  document.querySelector('.js-result').
  innerHTML=result;
  document.querySelector('.js-move').
  innerHTML=`You
  <img src="${playerChoice}-emoji.png" alt="rock" class="move-icon">
  <img src="${computerChoice}-emoji.png" alt="paper" class="move-icon">
  Computer`;
  
}
// function keyStroke(event){
//   if(event.key==='q'){
//     playGame("rock")
//     // console.log(event.key)
// onkeydown="keyStroke(event);" Add this into html elements rock paper scissor.
//   }else if(event.key==='w'){
//     playGame("paper")
//     // console.log(event.key)
//   }else if(event.key==="e"){
//     playGame('scissor')
//     // console.log(event.key)
//   }
// }

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='q'){
    playGame('rock')
  }
  else if(event.key==='w'){
    playGame('paper')
  }
  else if(event.key==='e'){
    playGame('scissor')
  }
});

function updateScore(){
  document.querySelector('.js-score')
    .innerHTML=`Wins:${score.wins} Losses:${score.losses}
     Ties:${score.ties} \n <span id="point"> Point: ${point}</span>`

}

function pickComputerChoice(){
  let computerChoice='';
  const randomNumber=Math.random();


if (randomNumber>=0 && randomNumber<1/3){
  computerChoice='rock';
} 
else if (randomNumber>=1/3 && randomNumber<2/3){
  computerChoice='paper';
}
else{
  computerChoice='scissor';
}
return computerChoice;  
}

function reset(){
  score.wins=0;
  score.losses=0;
  score.ties=0;
  point=0;
  localStorage.removeItem('score');
  updateScore();
  localStorage.setItem('score',JSON.stringify(score));
}

//DropDown settings
function dropD() {
  let settingB = document.querySelectorAll('.bidown');
  settingB.forEach(btn => {
      btn.style.display = (btn.style.display === 'none') ? 'inline-block' : 'none';
  });
}
//Full screen
function fullS(divId){
  let fullScreen=document.getElementById(divId);
  if(!document.fullscreenElement){
    fullScreen.requestFullscreen().then(()=>{
      fullScreen.classList.add('fullscreen-active');
      
    });
  }
  else{
    document.exitFullscreen().then(()=>{
      fullScreen.classList.remove('fullscreen-active');
    })
  }
}

// Sound effects
const sound = document.getElementById("gameSound"); 

let isSoundOn=true;

function initializeAudio() {
  try {
    sound.play().catch(error => {
      console.log('Auto-play was prevented');
      isSoundOn = false;
      SoundOnico.style.display = 'none';
      SoundOffico.style.display = 'inline';
    });
  } catch(error) {
    console.log('Audio playback error:', error);
  }
}

function Sound(){
  SoundOnico=document.getElementById('sOn');
  SoundOffico=document.getElementById('sOff');
  if(isSoundOn){
    sound.muted=true;
    SoundOnico.style.display='none';
    SoundOffico.style.display='inline';
    isSoundOn=false;
  }
  else{
    sound.muted=false;
    sound.play();
    SoundOnico.style.display='inline';
    SoundOffico.style.display='none';
    isSoundOn=true;
  }
}

document.addEventListener('DOMContentLoaded', initializeAudio);

setTimeout(()=>{
  document.getElementById('tempro').style.display='none';
},15000)
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#temprora').style.display = 'none';
  });
});

document.querySelector('.volume-bar').addEventListener('input', function(e) {
  e.stopPropagation(); 
  sound.volume = e.target.value / 100;
});

document.querySelector('.volume-control').addEventListener('click', function(e) {
  e.stopPropagation(); 
});
