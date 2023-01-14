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


// Add an event listener (click) on the #start button

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


// A function to show the question on the screen to the player
// the parameter(question) expected is a question object{} (see questions.js for data structure)

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

    // Loop through all of the choices for the question
    for (i = 0; i < question.choices.length; i++) {

        // Create a button html element (choice)
        let choice = document.createElement('button')

        // create an attribute called data-choice and assign the choice value (e.g. 'Boolean','String' etc) (will use to verify correct answer)
        choice.dataset.choice = question.choices[i]

        // Set the text of the button to a choice (e.g. 'Boolean','String' etc)
        choice.textContent = j + '. ' + question.choices[i]

        // Assign choiceText variable to the string in the question.choices array at position [i]
        choiceText = question.choices[i]

        // Add an event listner on our newly created choice button
        // this is then used to figure out which choice has been clicked and what the correct answer is.
        choice.addEventListener('click', function (event) {

            // we are assigning a variable element to the choice that was clicked on
            let element = event.target

            // assign the users choice to a variable
            let userChoice = (element.dataset.choice)

            // assign the correct answer to a variable
            let correctAnswer = (question.correctAnswer)

            //console.log(correctAnswer)

            // the checkAnswer() function will check if the choice is correct
            checkAnswer(correctAnswer, userChoice)

        })
        // Append the button to the questionChoices element
        questionChoices.appendChild(choice)

        // Increment j by 1
        j++
    }
}


// A function for checking if the choice is the correct answer
// expects two parameters (the correct answer, and the players choice)
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

        // Play the incorrect sound audio file
        incorrectSound.play()
    }
    // Increment the questionNumber by 1 (this is to keep track of what question we are on)
    questionNumber++

    // call the checkQuestionCounter() function
    checkQuestionCounter()

}

// A function to check what question we are currently on.
// If there are outstanding questions to be answered,
function checkQuestionCounter() {
    // If the user hasn't answered all the question, continue the quiz
    if (questionNumber !== questions.length) {
        showQuestion(questions[questionNumber])
    } else {
        // If the user has answered all the questions, then call the gameFinished() function
        gameFinished()
    }
}

// A function to trigger the end of the game
function gameFinished() {

    // set gameEnded variable to true (this is used in myInterval to control game state )
    gameEnded = true

    // Hide the questionScreen
    questionsScreen.classList.add('hide')

    // Show the End screen element
    endScreen.classList.remove('hide')

    // Display the user score on screen
    finalScore.textContent = userScore * 20
}

// A function to store the user score in localStorage
// accepts a single parameter scoreToSubmit which is an object{}
function recordScore(scoreToSubmit) {

    //Initialise an empty array to store the scores as array elements
    // We are going to push an array of objects to our localStorage
    let scores = []

    // If the localStorage item 'scores' is not empty then we want to fetch the current scores and append to them
    if (localStorage.getItem('scores') !== null) {

        // fetch the current scores string and convert it into an array
        scores = JSON.parse(localStorage.getItem('scores'))

        // Push the new score record to the scores array
        scores.push(scoreToSubmit)

        // Save the updated scores to localStorage
        localStorage.setItem('scores', JSON.stringify(scores))

        // call the processHighScore function for re-sorting the high scores
        processHighScore()
    }
    // If the localStorage item 'scores' is empty then we want just need to append to it
    else {
        // Push the new score as an array element
        scores.push(scoreToSubmit)

        // store the scores array as a string in local storage item 'scores'
        localStorage.setItem('scores', JSON.stringify(scores))

        // call the processHighScore function for re-sorting the high scores
        processHighScore()
    }
}

// A function to sort the high scores and re-save
function processHighScore() {


    // Create a scores array based on the data within 'scores' localStorage item
    let scores = JSON.parse(localStorage.getItem('scores'))
    //console.log(scores)

    // use the array.sort function but override it to change the order to High > Low
    scores.sort(function (value1, value2) {

        return value2.score - value1.score

    })

    //console.log(scores)
    // re-save the 'scores' localStorage item to the newly sorted array
    localStorage.setItem('scores', JSON.stringify(scores))
    // redirect the user to the highscores.html page
    window.location.href = 'highscores.html'
}