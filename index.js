var i = 0;
$(document).keydown(function (e) {
  var pressedKey = e.key;
  while (i === 0) {
    if (pressedKey === "a") {
      nextSequence();
      i = 1;
    }
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress($(this));
  checkAnswer(userClickPattern.length - 1);
});
/*-------- Arrays -------- */
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
/*-------- Variables -------- */
var level = 1;
/*  Functions  */
function print(value) {
  console.log(value);
}

function nextSequence() {
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var randomChosenButton = $("#" + randomChosenColour);
  randomChosenButton.fadeOut(100).fadeIn(100);
  var audio = new Audio("/sounds/" + randomChosenColour + ".mp3");
  audio.play();
  $("h1").text("Level " + level);
  level++;
}
function playSound(color) {
  var audio = new Audio("/sounds/" + color + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  currentColour.addClass("pressed");
  setTimeout(function () {
    currentColour.removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    print("True");
    if (userClickPattern.length === gamePattern.length) {
      print("right");
      setTimeout(nextSequence(), 2000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  i = 0;
  level = 1;
  gamePattern = [];
}
