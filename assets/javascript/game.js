// game variables;
var wins = 0;
var losses = 0;
var guesses = 0;
var keyPress = null;
var word = null;
var hiddenWord = null;
var finished = null;
var newRound = true;
var guessedLetters = [];

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
	// starts game
  if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
    determineRound();
  }

	// updates win count
  function updateWins() {
  	var winsElement = document.getElementById("wins");
  	winsElement.innerHTML = wins;
		updateGuesses();
		correctWord();
  }

	// updates loss count
  function updateLosses() {
  	var lossesElement = document.getElementById("losses");
  	lossesElement.innerHTML = losses;
		updateGuesses();
		wrongWord();
  }

	// updates number of guesses
  function updateGuesses() {
  	var guessesElement = document.getElementById("guesses");
		guessesElement.innerHTML = guesses;
		updateHeader();
	}
	
	// update panel heading with appropriate directions
	function updateHeader() {
		var headerElement = document.getElementById("header");
		if (newRound === false) {
			headerElement.innerHTML = "Game in Progress";
		}
		else {
			headerElement.innerHTML = "Press Any Letter Key to Start New Round";
		}
	}

	// clears current word area and guessed letters, starts new round
  function clearBox() {
		document.getElementById("word").innerHTML = "";
		document.getElementById("letters").innerHTML = "";
		guessedLetters = [];
		newRound = false;
		createNewWord();
	}
	
	// generates a random word 
  function createNewWord() {
  	word = words[Math.floor(Math.random() * words.length)];
		guesses = (word.length * 2) - 1;
		createBlankWord();
	}
	
	// congratulates user
	function correctWord() {
		var wordElement = document.getElementById("word");
		var newDiv = document.createElement("p");
		var wordDiv = document.createElement("p");
		wordDiv.innerHTML = "<strong>YOU WIN!</strong>";
		wordElement.appendChild(newDiv);
		wordElement.appendChild(wordDiv);
		showSheep();
	}

	// shows correct word and picture of sheep breed
  function wrongWord() {
		var wordElement = document.getElementById("word");
		var newDiv = document.createElement("p");
		var wordDiv = document.createElement("text");
		var loseDiv = document.createElement("p");
		loseDiv.innerHTML = "<strong>YOU LOSE!</strong>";
		wordDiv.innerHTML = "The correct word is: <i>" + word + "</i>";
		wordElement.appendChild(newDiv);
		wordElement.appendChild(loseDiv);
		wordElement.appendChild(wordDiv);
		showSheep();
	}

	// displays sheep breed at end of round
	function showSheep() {
		var lettersElement = document.getElementById("letters");
		var newDiv = document.createElement("p");
		var sheepDiv = document.createElement("img");
		sheepDiv.id = "word-pic";
		sheepDiv.src = "./assets/images/" + word + ".jpg";
		lettersElement.appendChild(newDiv);
  	lettersElement.appendChild(sheepDiv);
	}

	// creates blank spaces in current word area
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
		validateLetter();
  }
	
	// validates keypress; rejects previously typed letters
	function validateLetter() {
		if (!guessedLetters.includes(keyPress.toLowerCase())) {
			guessedLetters.push(keyPress.toLowerCase());
			determineLetter();
		}
		else {
			alert("You have already guessed that letter!");
		}
	}
	// determines if guessed letter matches or not
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
  	determineIfFinished();
  }

	// determines if round is finished
  function determineIfFinished() {
  	var spaces = 0;
  	for (var i = 0; i < word.length; i++) {
  		if (hiddenWord[i] === "_") {
  			spaces++;
  		}
  	}
  	if (guesses === 0) {
			losses++;
			newRound = true;
  		updateLosses();
  	}
  	else if (spaces === 0) {
			wins++;
			newRound = true;
  		updateWins();
  	}
  	else {
			newRound = false;
  	}
  }

	// control function that calls other functions based on whether or not it is a new round
  function determineRound() {
  	if (newRound === true) {
  		clearBox();
  	}
  	else {
  		validateLetter();
  	}
  }
};
