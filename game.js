const buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

function nextSequence() {

    level++;

    userClickedPattern = [];

    $('#level-title').text('Level ' + level);
    
    let randomNumber = Math.floor(Math.random()*buttonColours.length);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
    let audio = new Audio('/sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed'); 
    
    setTimeout(() => {
       $('#'+currentColour).removeClass('pressed')
    }, 100);   
}

$(document).keypress(function(){
    if(!started){
       nextSequence()
       started = true;
       $('#level-title').text('Level ' + level);
    }
})

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        $('body').addClass('game-over')
        $('#level-title').text('Game Over, Press any Key to Restart')
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        startOver()
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}