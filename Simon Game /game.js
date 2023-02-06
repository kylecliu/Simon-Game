var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false; 

//this function generates a random color and add to the gamePattern array
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = whichColor(randomNumber);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + (level + 1));
    gamePattern.push(randomChosenColor);
}

//this function takes a number as an argument and returns its corresponding color 
function whichColor(randomNumber) {
    if (randomNumber === 0) {
        randomChosenColor = buttonColors[0];
    }
    else if (randomNumber === 1) {
        randomChosenColor = buttonColors[1];
    }
    else if (randomNumber === 2) {
        randomChosenColor = buttonColors[2];
    }
    else if (randomNumber === 3) {
        randomChosenColor = buttonColors[3];
    }
    return randomChosenColor;
}

//this function plays sounds that correspond to the colors 
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    $("#" + name).fadeOut(250).fadeIn(250);
    sound.play();
}

//adding a keyboard event listener to start the game
$(document).on("keypress", function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});


//adding a mouse click event listner to verfify the user's response
$("div[type='button']").on("click", function() {
    handler(this);
    checkAnswer(userClickedPattern.length-1);

})


//this function delivers the visual effect and the sound and adds user choices to the userClickedPattern array
function handler(target) {
    var userChosenColor = target.id;
    playSound(target.id);
    animatePress(target.id)
    userClickedPattern.push(userChosenColor);
}


//this function delivers the visual effects when a button is clicked 
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {$("#" + currentColor).removeClass("pressed");}, 100);
}

//this function verifies the user's response
function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            level++;
            setTimeout(nextSequence, 1000);
        }
        }
    else {
            playSound("wrong");
            $(document.body).addClass("game-over");
            setTimeout(function () {$(document.body).removeClass("game-over")}, 200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }     
    
}

//this function delivers the sound and visual effects when the user loses
function loss() {
    $(document.body).addClass("game-over");
    var soundOfLoss = new Audio("sounds/wrong.mp3");
    soundOfLoss.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {$(document.body).removeClass("game-over")}, 200);
}

//this function resets variables when the user loses
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}








