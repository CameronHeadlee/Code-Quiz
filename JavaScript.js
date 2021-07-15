var quiz = document.getElementById("quiz");
var finalScoreEl = document.getElementById("finalScore");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("results");
var quizTimer = document.getElementById("timer");
var GameOverEl = document.getElementById("GameOver");
var startDiv = document.getElementById("startPage");
var startButton = document.getElementById("startButton");
var highscoreDisplayName = document.getElementById("highscoreIntials");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreInputName = document.getElementById("initials");
var highscoreDiv = document.getElementById("highscorePage");
var highscoreDisplayScore = document.getElementById("highscoreScore");
var endGameButton = document.getElementById("endGameButton");
var submitScoreButton = document.getElementById("submitScore");
var Button1 = document.getElementById("1");
var Button2= document.getElementById("2");
var Button3 = document.getElementById("3");
var Button4 = document.getElementById("4");
var correct;
var score = 0;
var finalQuestionIndex = quizQuestions.length;
var timeLeft = 90;
var timerInterval;
var currentQuestionsIndex = 0;

var quizQuestions = [{
    question: "Commonly used data types do not include",
    choice1: "strings",
    choice2: "Boolean",
    Choice3: "Numbers",
    choice4: "Alerts",
    correctAnswer: "4"},
{
    question: "Arrays in JavaScript objects can be stored in ___",
    choice1: "Numbers and Strings",
    choice2: "Booleans",
    Choice3: "Other Arrays",
    choice4: "All of the above",
    correctAnswer: "4"},
{
    question: "Condition of an if/else statement can be stored within ___",
    choice1: "Parentheses",
    choice2: "Quotes",
    Choice3: "Curly brackets",
    choice4: "Sqaure brackets",
    correctAnswer: "1"},
];

function generateQuizQuestion(){
    GameOverEl.styles.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question +"</p>";
    Button1.innerHTML = currentQuestion.choice1;
    Button2.innerHTML = currentQuestion.choice2;
    Button3.innerHTML = currentQuestion.Choice3;
    Button4.innerHTML = currentQuestion.choice4;
};

function startQuiz(){
    GameOverEl.style.display = "none";
    startDiv.style.display = "none",
    generateQuizQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "time left: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quiz.style.display = "block";
}

function showScore(){
    quiz.style.display = "none"
    GameOverEl.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "you got " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreButton.addEventListener("click", function highscore(){

    if(highscoreInputName.value ==="") {
        alert("Intials cannot be blank");
        return false;
    }else{
        var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
        GameOverEl.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameButton.style.display = "flex";

        savedHighScores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=o, i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScorespan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScorespan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScorespan);
    }
}

function showHighscore(){
    startQuiz.style.display = "none"
    GameOverEl.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameButton.style.display = "flex";

    generateHighscores();
}

function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";

}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    GameOverEl.style.display = "none";
    startQuiz.style.display = "flex";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionsIndex].correctAnswer;

    if (answer === correct && currentQuestionsIndex !== finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionsIndex++;
        generateQuizQuestion();

    }else if (answer !== correct && currentQuestionsIndex !== finalQuestionIndex){
        alert("Incorrect!")
        currentQuestionsIndex++;
        generateQuizQuestion();

    }else{
        showScore();
    }
}

startQuizButton.addEventListener("click", startQuiz);