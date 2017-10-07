var wins = 0;
var losses = 0;
var guesses = 0;
var keyPress = null;
var word = null;
var hiddenWord = null;
var finished = null;
var newRound = true;

var words =[
"columbia",
"falkland",
"icelandic",
"jacob",
"leicester",
"merino",
"romney",
"shetland",
"targhee"];

document.onkeyup = function(event) {
  keyPress = event.key;
  if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
    determineRound();
  }


  function updateWins() {
  	var winsElement = document.getElementById("wins");
  	winsElement.innerHTML = wins;
  	updateGuesses();
  }

  function updateLosses() {
  	var lossesElement = document.getElementById("losses");
  	lossesElement.innerHTML = losses;
  	updateGuesses();
  }

  function updateGuesses() {
  	var guessesElement = document.getElementById("guesses");
  	guessesElement.innerHTML = guesses;
  }

  function clearBox() {
		  document.getElementById("word").innerHTML = "";
		  document.getElementById("letters").innerHTML = "";
	}
  
  function createNewWord() {
  	word = words[Math.floor(Math.random() * words.length)];
  	guesses = (word.length * 2) - 1;
  }

  function changeArray(letter, i) {
  	console.log(letter);
  	console.log(hiddenWord[i]);
  	hiddenWord[i] = letter;
  }

  function createBlankWord() {
  	hiddenWord = [];
	  for (var i = 0; i < word.length; i++){
	    	hiddenWord[i] = "_";
	    	var newDiv = document.createElement("text");
	    	newDiv.id = "letter" + i;
	    	newDiv.innerHTML = hiddenWord[i] + " ";
	    	var wordElement = document.getElementById("word");
	    	wordElement.appendChild(newDiv);
	  }
  }

  function determineLetter() {
  	for (var i = 0; i < word.length; i++) {
  		if (word[i] === keyPress) {
  			var textDiv = document.getElementById("letter" + i);
  			textDiv.innerHTML = word[i];
 				hiddenWord[i] = word[i];
  		}
  	}
  	console.log("Hello!");
  	guesses--;
  	updateGuesses();
  	var letterDiv = document.createElement("text");
  	letterDiv.innerHTML = keyPress + " ";
  	var lettersElement = document.getElementById("letters");
  	lettersElement.appendChild(letterDiv);
  	newRound = false;
  }

  function determineIfFinished() {
  	var spaces = 0;
  	for (var i = 0; i < word.length; i++) {
  		if (hiddenWord[i] === "_") {
  			spaces++;
  		}
  	}
  	if (guesses === 0) {
  		losses++;
  		updateLosses();
  		newRound = true;
  	}
  	else if (spaces === 0) {
  		wins++;
  		updateWins();
  		newRound = true;
  		clearBox();
  	}
  	else {
  		newRound = false;
  	}
  }

  function determineRound() {
  	if (newRound === true) {
  		createNewWord();
  		createBlankWord();
  		determineLetter();
  		guesses = (word.length * 2) - 1;
  	}
  	else {
  		determineLetter();
  		determineIfFinished();
  	}
  }
};
