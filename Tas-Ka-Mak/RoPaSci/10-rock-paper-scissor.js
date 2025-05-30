let playerChoice;
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let point = (score.wins) + (-1 * score.losses) + (score.ties * 0);

let isAutoPlayin=false;
let intervalId;

let currentMode = 1;
const gameModes = {
  mode1: {
    images: {
      rock: './Images/rock-emoji.png',
      paper: './Images/paper-emoji.png',
      scissor: './Images/scissor-emoji.png'
    },
    audio: './Music/Ketsa - If You Waited.mp3',
    background: 'bg-custom'
  },
  mode2: {
    images: {
      rock: './Images/rock-alt.png',
      paper: './Images/paper-alt.png',
      scissor: './Images/scissor-alt.png'
    },
    audio: './Music/Ketsa - Suntax.mp3',
    background: 'bg-custom-alt'
  },
  mode3: {
    images:{
      rock:'./Images/rock-olt.png',
      paper:'./Images/paper-olt.png',
      scissor:'./Images/scissor-olt.png'
    },
    audio:'./Music/Ketsa - Mist.mp3',
    background:'bg-custom-ocean'
  },
  mode4: {
    images:{
      rock:'./Images/rock-frst.png',
      paper:'./Images/paper-frst.png',
      scissor:'./Images/scissor-frst.png'
    },
    audio:'./Music/Joint C Beat Laboratory - Blooming Poison.mp3',
    background:'bg-custom-forest'
  },
};

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


// Decision
function decide() {
  const decidEl = document.querySelector('.decisionBox');
  decidEl.style.display = (decidEl.style.display === 'none') ? 'flex' : 'none';
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

  //SCORE
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

  const decidEl = document.querySelector('.decisionBox');
  if (decidEl.style.display === 'flex') {
    const leftEl = document.getElementById('left');
    const rightEl = document.getElementById('right');
    let decision = '';
    
    if (result === 'You win') {
      decision = leftEl.value;
    } else if (result === 'You loose') {
      decision = rightEl.value;
    } else {
      decision = 'Tie-Try again!';
    }

    // Display the decision result
    document.querySelector('.js-result').innerHTML = `${result}<br>Decision: ${decision}`;
  } else {
    // Normal game result display
    document.querySelector('.js-result').innerHTML = result;
  }
  
  document.querySelector('.js-move').
  innerHTML=
  `Computer
  <img src="${gameModes[`mode${currentMode}`].images[computerChoice]}" alt="rock" class="move-icon">
  <img src="${gameModes[`mode${currentMode}`].images[playerChoice]}" alt="paper" class="move-icon">
  You`;

  

}


document.addEventListener('keydown', (event) => {
  // console.log(event.key)
  if (event.target.tagName === 'INPUT') {
    return;
  }
  let button;
  if (event.key === 'q') {
    button = document.querySelector('.move-btn:nth-child(1)');
    playGame('rock');
  } else if (event.key === 'w') {
    button = document.querySelector('.move-btn:nth-child(2)');
    playGame('paper');
  } else if (event.key === 'e') {
    button = document.querySelector('.move-btn:nth-child(3)');
    playGame('scissor');
  }

  if (button && currentMode === 2) {
    addKeyPressEffect(button);
  }
  else if(button&&currentMode==3 || button&&currentMode===4){
    addKeyPressEffect(button);
  }
});

// Add the effect when clicking the buttons
document.querySelectorAll('.move-btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    if (currentMode === 2 || currentMode===3||currentMode===4) {
      addKeyPressEffect(button);
    }
    const moves = ['rock', 'paper', 'scissor'];
    playGame(moves[index]);
  });
});



// Function to add the keypress effect
function addKeyPressEffect(button) {
  button.classList.add('key-press-active');
  button.addEventListener('animationend', () => {
    button.classList.remove('key-press-active');
  }, { once: true });
}


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



function dropI(){
  let imgEl=document.querySelectorAll('.idown');
  imgEl.forEach(btn=>{
    btn.style.display=(btn.style.display==='inline-block')?'none':'inline-block';
  })

}
//Full screen
function fullS(divId){
  const fullScreen=document.getElementById(divId);
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
let isSoundOn=true;
const sound = document.getElementById("gameSound"); 
let SoundOnico=document.getElementById('sOn');
let SoundOffico=document.getElementById('sOff');

document.addEventListener('DOMContentLoaded',()=>{
  initializeAudio();
})
function initializeAudio() {
  
  try {
    const defaultVolume=20;
    sound.volume=defaultVolume/100;
    
    const volumeBar=document.querySelector('.volume-bar');
    if(volumeBar){
      volumeBar.value=defaultVolume;
    }
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



document.querySelector('.volume-bar').addEventListener('input', function(e) {
  e.stopPropagation(); 
  sound.volume = e.target.value / 100;
});

document.querySelector('.volume-control').addEventListener('click', function(e) {
  e.stopPropagation(); 
});



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





document.getElementById('btnone').addEventListener('click', () => switchMode(1));
document.getElementById('btntwo').addEventListener('click', () => switchMode(2));
document.getElementById('btnthree').addEventListener('click', () => switchMode(3));
document.getElementById('btnfour').addEventListener('click',()=>switchMode(4));

function switchMode(mode) {
  currentMode = mode;
  const mainElement = document.getElementById('Main');
  const modeInputs = document.getElementById('modeInputs');
  const moveButtons = document.querySelectorAll('.move-btn img');
  
  const isFullScreen=document.fullscreenElement!==null;
  // Reset all modes first
  mainElement.className = 'bg-custom';
  modeInputs.classList.add('d-none');
  
  if (mode === 2) {
    
    mainElement.className = gameModes.mode2.background;
    moveButtons.forEach(btn => {
      const moveType = btn.src.split('/').pop().split('-')[0];
      // console.log(moveType);
      btn.src = gameModes.mode2.images[moveType];
      btn.className = 'move-icon mode2-image';
      btn.closest('.move-btn').classList.remove('mode1-btn');
      btn.closest('.move-btn').classList.remove('mode3-btn');
      btn.closest('.move-btn').classList.remove('mode4-btn');
      btn.closest('.move-btn').classList.add('mode2-btn');
    });
    sound.src = gameModes.mode2.audio;
    sound.play();
  } 
  
  else if(mode===3){
    mainElement.className=gameModes.mode3.background;
    moveButtons.forEach(btn=>{
      const moveType=btn.src.split('/').pop().split('-')[0];
      btn.src = gameModes.mode3.images[moveType];
      btn.className = 'move-icon mode3-image';
      btn.closest('.move-btn').classList.remove('mode1-btn');
      btn.closest('.move-btn').classList.remove('mode2-btn');
      btn.closest('.move-btn').classList.add('mode3-btn');
      btn.closest('.move-btn').classList.remove('mode4-btn');


    });
    sound.src=gameModes.mode3.audio;
    sound.play();
  }
  
  else if(mode===4){
    mainElement.className=gameModes.mode4.background;
    moveButtons.forEach(btn=>{
      const moveType=btn.src.split('/').pop().split('-')[0];
      btn.src = gameModes.mode4.images[moveType];
      btn.className = 'move-icon mode4-image';
      btn.closest('.move-btn').classList.remove('mode1-btn');
      btn.closest('.move-btn').classList.remove('mode2-btn');
      btn.closest('.move-btn').classList.remove('mode3-btn');
      btn.closest('.move-btn').classList.add('mode4-btn');

    });
    sound.src=gameModes.mode4.audio;
    sound.play();
  }
  
  
  else {
    moveButtons.forEach(btn => {
      const moveType = btn.src.split('/').pop().split('-')[0];
      btn.src = gameModes.mode1.images[moveType];
      btn.className = 'move-icon mode1-image';
      btn.closest('.move-btn').classList.remove('mode2-btn');
      btn.closest('.move-btn').classList.remove('mode3-btn');
      btn.closest('.move-btn').classList.remove('mode4-btn');
      btn.closest('.move-btn').classList.add('mode1-btn');
    });
    sound.src = gameModes.mode1.audio;
    sound.play();
  }
  if(isFullScreen){
    mainElement.classList.add('fullscreen-active');
  }
  
}





