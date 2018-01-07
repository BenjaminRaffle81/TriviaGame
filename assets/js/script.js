$(document).ready(function() {

function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Engage!</a></p>";
	$(".mainArea").html(startScreen);
}

initialScreen();

$("body").on("click", ".start-button", function(event){
	event.preventDefault(); 
	clickSound.play();
	generateHTML();

	timerWrapper();
});

$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theClock);
		generateWin();
	}
	else {
		clearInterval(theClock);
		generateLoss();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
	});
});

function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was - " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/facepalm.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>YES! The answer is - " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>NO! The right answer was - " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/img/facepalm.jpg'>";
	$(".mainArea").html(gameHTML);
	setTimeout(wait, 4000); 
}

function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A: " + answerArray[questionCounter][0] + "</p><p class='answer'>B: "+answerArray[questionCounter][1]+"</p><p class='answer'>C: "+answerArray[questionCounter][2]+"</p><p class='answer'>D: "+answerArray[questionCounter][3]+"</p>";
	$(".mainArea").html(gameHTML);
}

function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

function timerWrapper() {
	theClock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You made it to the end!" + "</p>" + "<p class='summary-correct'>Victories: " + correctTally + "</p>" + "<p>Screw-Ups: " + incorrectTally + "</p>" + "<p>Wasted Opportunities: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".mainArea").html(gameHTML);
}

function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is the name of the Chief Engineer/offensive European charicature of the original Enterprise crew?", "Who is the obnoxious and pointless son of the Chief Medical Officer on The Next Generation?", "Who is the guy who, when he sleeps, becomes a bucket full of snot, but when he's awake kicks ass on the Promenade of DS9?", "Who is the Captain who made an insane executive decision to damn her crew to a treacherous lifetime of traveling through space?", "What is the name of the race of pretentious douchebags who are technically the most important people in the Federation?", "Who is the lunatic who strapped himself and two time-travellers in a nuclear warhead to become the first human to go at warp speed?", "Who is the robot that is the most clutch member of the Enterprise, and whose creator was kind enouogh to give him a weiner?", "What is the name of the race of evil space Nazis that enslaved the planet Bajor for 50 years, yet the Federation somehow still trusts enough to constantly ally themselves with?"];
var answerArray = [["Sparky", "Skippy", "Scotty", "Scrappy"], ["Wesley Crusher", "Walter Cronkite", "Winston Churchhill", "Wile E. Coyote"], ["Bozo", "Odo", "Oboe", "Dodo"], ["Captain Morgan", "Captain Kangaroo", "Captain Ron", "Captain Janeway"], ["Vacuums", "Vulcans", "Viagras", "Vegans"], ["Johnnie Cochran", "Barbara Corcoran", "Zephram Cochrane", "Billy Crystal"], ["Data", "Darla", "Doula", "DARPA"], ["Claymations","Kardashians","Carnations","Cardassians"]];
var imageArray = ["<img class='center-block img-right' src='assets/img/scotty.jpg'>", "<img class='center-block img-right' src='assets/img/wesley.jpg'>", "<img class='center-block img-right' src='assets/img/odo.jpg'>", "<img class='center-block img-right' src='assets/img/janeway.jpg'>", "<img class='center-block img-right' src='assets/img/spock.jpg'>", "<img class='center-block img-right' src='assets/img/zephrum.jpg'>", "<img class='center-block img-right' src='assets/img/data.jpg'>", "<img class='center-block img-right' src='assets/img/cardassians.jpg'>"];
var correctAnswers = ["C: Scotty", "A: Wesley Crusher", "B: Odo", "D: Captain Janeway", "B: Vulcans", "C: Zephram Cochrane", "A: Data", "D: Cardassians"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/photorp.wav");
