var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];

var isStarted=false;
var level=0;
 $(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);


});

$(document).on("keydown",function(){
  if(!isStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    isStarted=true;
  }
})


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);
 
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function  animatePress(currentColour){
   $("#"+currentColour).addClass("pressed");
   setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
   },100);

}


function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){

    setTimeout(function(){
      nextSequence();
    },1000);
  }

}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");

  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  
  startOver();
}
}

function startOver(){
  level=0;
  isStarted=false;
  userClickedPattern=[];
  gamePattern=[];

}




