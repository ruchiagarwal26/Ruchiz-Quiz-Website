var inital_set = document.querySelector(".card");
var wordBlank = document.querySelector(".questions");
var questionSpace = document.querySelector("#question");
var optionSpace = document.querySelector("#answers");
var win = document.querySelector(".correct");
var lose = document.querySelector(".misses");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.querySelector(".submit");

questionSpace.setAttribute("style", "color: blue; padding: 20px; font-size:35px;")
optionSpace.setAttribute("style", "color: brown; padding: 20px; margin:10px; font-size:25px;")

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;
var questionIndex = 0;
var correctOnQuiz = [];
var UserInitials;

var quizContent = [
{ id : 0,
  question: "Inside which HTML element do we put the JavaScript?",
  answers: ["javascript","script","scripting"],
  correct: "script"
},
{ id : 1,
  question: "Where is the correct place to insert a JavaScript?",
  answers: ["Head", "body","None"],
  correct: "body"
},
{ id : 2,
  question: "How do you write 'Hello World' in an alert box?",
  answers: ["msbBox('Hello World')", "alert('Hello World')","alertBox('Hello World')"],
  correct: "alert('Hello World')"
}
]

//console.log("options", quizContent);

//function to call each question

//startButton.addEventListener("click",displayQuestion);
//submitButton.addEventListener("click",displayQuestion);

function displayQuestion(){

  var answer;
  var useId;

  //for (let i=0; i<quizContent.length; i++){ 

  questionId = quizContent[questionIndex].question;
  answer = []; 
  correctAns =  quizContent[questionIndex].correct;
  useId = quizContent[questionIndex].id;
  
  
    for (let ans in quizContent[questionIndex].answers){
      answer.push (
        '<div>'
					+ '<input type="radio" name="question" value="'+ans+'"/>'
					+ quizContent[questionIndex].answers[ans]
				+ '</div>'
      );
    }

    questionSpace.innerHTML = questionId;
    optionSpace.innerHTML = answer.join(',').replaceAll(",", " ").split(); 


};

//based on click event by submitting the form 
// a. registering which answer was selected
// b. validating it with the right answer
// c. adding into the win 

submitButton.addEventListener("click", function(event){

  var sel = document.getElementsByTagName('input')
    
      for (i=0; i < sel.length; i++){
        if(sel[i].type="radio" ){
          if (sel[i].checked == true) {
            //registering which answer was selected
            var selectedOption = sel[i].value
          console.log(sel[i].value, " status ", sel[i].checked, " var ",selectedOption);}
        }
      }; 
          
          var answerIn = quizContent[questionIndex].answers ;

         // console.log("selectedOption ", answerIn[selectedOption], " displayQuestion ",  quizContent[questionIndex].correct );
          //validating it with the right answer
            if (answerIn[selectedOption] == quizContent[questionIndex].correct)
              {
              //adding into the win 
                winCounter++
                startButton.disabled = false;
                setWins()
                //isWin = true; 
                }
              else {console.log("loose");
                    loseCounter++
                    timerCount= timerCount-2
                    setLosses()};
              
              
              if (questionIndex < quizContent.length-1){
                  questionIndex = questionIndex + 1;
                  displayQuestion();
                }
                else {submitButton.disabled = true;
                  clearInterval(timer);
                  wordBlank.innerHTML = "Quiz Completed";
                  startButton.disabled = false;
                  questionSpace.innerHTML = " ";
                  optionSpace.innerHTML=" ";
                  //questionSpace.textContent = UserInitials + " thank you for playing, you scored " + winCounter + ".";
                  end_Quiz();
                 };  

  });

   
//The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 20;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  //inital_set.empty();
  startTimer()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "Quiz Completed";
  questionSpace.innerHTML = " ";
  optionSpace.innerHTML=" ";
  loseCounter++
  startButton.disabled = false;
  setLosses()
 
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  displayQuestion();
  submitButton.disabled = false;
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
      end_Quiz();
    }
  
  }, 1000);
}

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);
questionSpace.innerHTML= "W e l c o m e" ;
optionSpace.innerHTML = "L e t' s  P l a y ";
submitButton.disabled = true;
// Calls init() so that it fires when page opened
init();

//prompt to save initials and score
function end_Quiz(){
 var initials = prompt("please enter your initials: ");
 var inititialsInput = localStorage.setItem("Initials: ", initials)
 var UserInitials = localStorage.getItem("inititialsInput");
 var correctOnQuizCount = localStorage.getItem("winCount");
 correctOnQuiz.push(correctOnQuizCount);
 //UserInitials = userInitial;
};

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
