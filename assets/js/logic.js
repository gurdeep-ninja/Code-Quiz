// AS A coding boot camp student
// I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
// SO THAT I can gauge my progress compared to my peers

// Acceptance Criteria
// Create a code quiz that contains the following requirements:

// A start button that when clicked a timer starts and the first question appears.

// Questions contain click event for each answer.
// When answer is clicked, the next question appears
// If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.

// When the game ends, it should display their score and give the user the ability to save their initials and their score


// Tasks required

// Record which answer the user clicks on

// Check if answer is correct
//// if the answer is correct 'show correct' message and display next question
///// Record score
//// if the answer is wrong, subtract time from the timer & display next question

// If all the questions are answered OR the timer runs out, end the quiz

// Show the score to the user and let them save their result

// Set variable to HTML elements

// Assign variable to button '#start' (starts the game)
let start = document.querySelector('#start')

// Assign variable to button '#submit' (saves score)
let submit = document.querySelector('#submit')

// Assign variable to span html element '#time'
let time = document.querySelector('#time')

// Create a variable to keep track of the countdown timer
let countDownTimer = 50

// Create a variable to store which question we are on
let questionNumber = 0

// Create a variable to keep the user score
let userScore = 0

// Assign variable to div html element '#start-screen'
let startScreen = document.querySelector('#start-screen')

// Assign variable to div html element '#questions'
let questionsScreen = document.querySelector('#questions')

// Assign variable to div html element '#end-screen'
let endScreen = document.querySelector('#end-screen')

// Assign variable to div html element '#end-screen'
let feedbackScreen = document.querySelector('#feedback')

// Assign variable to question title
let questionTitle = document.querySelector('#question-title')

// Assign variable to question choices
let questionChoices = document.querySelector('#choices')

//Assign variable to span element #final-score
let finalScore = document.querySelector('#final-score')

// Assign variable to keep track if the game has ended or not
let gameEnded = false

// Assign variables for audio clip(s) incorrect/correct
let correctSound = new Audio('./assets/sfx/correct.wav')

let incorrectSound = new Audio('./assets/sfx/incorrect.wav')

// Assign variable to html input element #initials
let userInitials = document.querySelector('#initials')

// Start a timer when 'Start Quiz' button is clicked
// 1 Need an event listener on the start quiz button click

// Display the first question & multiple choice answers to the user
// 1 need some questions and answers for user.
// 2 could use an

// Task 1 - Starting the quiz

// 1. Event listener on button click - starts the quiz
// 2. Hide the #start-screen element & show the #questions element

start.addEventListener('click', function (event) {
    
    // Show initial countdown value before starting timer
    time.textContent = countDownTimer

    // use setAttribute to set the class to 'hide'
    startScreen.setAttribute('class', 'hide')

    // use the setAttribute to set the class to '' (shows element)
    questionsScreen.setAttribute('class', '')

    // Run interval every 1 second to start countdown timer
    let myInterval = setInterval(function () {
        // decrement of the countdown timer by 1 on each interval
        countDownTimer--

        // update the content of the time element to the count down 
        time.textContent = countDownTimer
        //console.log(questionNumber + ' ' + questions.length)

        // If the game has ended or count down timer has expired, clear the interval & stop the game
        if (gameEnded || countDownTimer <= 0) {
            gameFinished()
            clearInterval(myInterval)
        }
    }, 1000);

    // Call showQuestion function to display the question on the screen
    showQuestion(questions[questionNumber])

})

// Add an event listener (click) on the #submit button on the feedback section
submit.addEventListener('click', (function (event) {

    // get the value of the userInitials input box value & trim whitespace
    let initials = userInitials.value.trim()

    //let element = event.target
    // Check if initials has a valid value
    if (initials !== '') {

        // Multiply the score by 20 to make it look better on the scoreboard instead of 1,2,3,4 etc
        let score = userScore * 20

        // Create an object to store the user initial and score
        let scoreToSubmit = {
            initial: initials,
            score: score
        }

        recordScore(scoreToSubmit)
    } else {
        // Provide feedback to the user to enter initials
        feedbackScreen.textContent = 'Please enter your initials!'
    }


}))

// let questions = [
//     {
//         question: 'Commonly used data types DO NOT include:',
//         choices: ['strings','booleans','alerts','numbers'],
//         correctAnswer: 'booleans'
//     },

function showQuestion(question) {

    // Reset the question
    questionTitle.innerHTML = ''

    // Reset the choices
    questionChoices.innerHTML = ''

    // Get the question from the question object being passed
    // To do work on changing 'question' conflict/ambiguous name 
    questionTitle.textContent = question.question
    //console.log(question.question)

    // setting j for number visualisation against choice
    let j = 1;

    for (i = 0; i < question.choices.length; i++) {

        // Create a button html element (choice)
        let choice = document.createElement('button')

        // create an attribute called choice (will use to verify correct answer)
        choice.dataset.choice = question.choices[i]

        // Set the text of the button (choice)
        choice.textContent = j + '. ' + question.choices[i]

        choiceText = question.choices[i]

        choice.addEventListener('click', function (event) {
            let element = event.target

            let userChoice = (element.dataset.choice)

            let correctAnswer = (question.correctAnswer)

            //console.log(correctAnswer)

            checkAnswer(correctAnswer, userChoice)

        })
        // Append the button to the questionChoices element
        questionChoices.appendChild(choice)

        // Increment j by 1
        j++
    }
}

function checkAnswer(correctAnswer, userAnswer) {

    //console.log('Correct: ' +correctAnswer)
    //console.log('User: ' +userAnswer)
    //let questionNumber = correctAnswer
    //let answer = userAnswer

    // Show the feedBack screen
    feedbackScreen.classList.remove('hide')
    // If the user select the correct answer, increase their score, show feedback
    if (correctAnswer === userAnswer) {
        // Increase user score
        userScore++

        // Show feedback message
        feedbackScreen.textContent = 'Correct!'
        //console.log(correctSound)
        correctSound.play()

        // If the user is incorrect, show feedback, decrease timer
    } else {
        // Decrease timer
        countDownTimer = countDownTimer - 10

        // Show feedback message
        feedbackScreen.textContent = 'Incorrect!'
        incorrectSound.play()
    }
    questionNumber++
    checkQuestionCounter()

}

function checkQuestionCounter() {
    // If the user hasn't answered all the question, continue the quiz
    if (questionNumber !== questions.length) {
        showQuestion(questions[questionNumber])
    } else {
        gameFinished()
    }
}

// A function to trigger the end of the game
function gameFinished() {

    // set gameEnded variable to true
    gameEnded = true

    // Hide the questionScreen
    questionsScreen.classList.add('hide')

    // Show the End screen element
    endScreen.classList.remove('hide')

    // Display the user score on screen
    finalScore.textContent = userScore * 20
}

// A function to store the user score in localStorage
function recordScore(scoreToSubmit) {

    //Initialise an empty array to store the scores as array elements
    let scores = []

    // If the localStorage item 'scores' is not empty then we want to fetch the current scores and append to them
    if (localStorage.getItem('scores') !== null) {

        // fetch the current scores string and convert it into an array
        scores = JSON.parse(localStorage.getItem('scores'))

        // Push the new score record to the scores array
        scores.push(scoreToSubmit)

        // Save the updated scores to localStorage
        localStorage.setItem('scores', JSON.stringify(scores))
        processHighScore()
        window.location.href = 'highscores.html';

    }
    // If the localStorage item 'scores' is empty then we want just need to append to it
    else {
        // Push the new score as an array element
        scores.push(scoreToSubmit)

        // store the scores array as a string in local storage item 'scores'
        localStorage.setItem('scores', JSON.stringify(scores))
        processHighScore()
    }
}

// A function to sort the high scores and re-save
function processHighScore(){

    let scores = JSON.parse(localStorage.getItem('scores'))
    //console.log(scores)
    scores.sort(function(value1,value2){

        return value2.score - value1.score

    })
    
    //console.log(scores)
    localStorage.setItem('scores', JSON.stringify(scores))

    //console.log(localStorage.getItem('scores'))
}