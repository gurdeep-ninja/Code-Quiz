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

// Start a timer when 'Start Quiz' button is clicked
// 1 Need an event listener on the start quiz button click

// Display the first question & multiple choice answers to the user
// 1 need some questions and answers for user.
// 2 could use an

// Record which answer the user clicks on

// Check if answer is correct
//// if the answer is correct 'show correct' message and display next question
///// Record score
//// if the answer is wrong, subtract time from the timer & display next question

// If all the questions are answered OR the timer runs out, end the quiz

// Show the score to the user and let them save their result

// Set variable to HTML elements

// Assign variable to button '#submit'
let start = document.querySelector('#start') 

// Assign variable to span html element '#time'
let time = document.querySelector('#time')

// Assign variable to div html element '#start-screen'
let startScreen = document.querySelector('#start-screen')

// Assign variable to div html element '#questions'
let questionsScreen = document.querySelector('#questions')

// Assign variable to div html element '#end-screen'
let endScreen = document.querySelector('#end-screen')

// Assign variable to div html element '#end-screen'
let feedbackScreen = document.querySelector('#feedback')

// Task 1 - Starting the quiz

// 1. Event listener on button click - starts the quiz
// 2. Hide the #start-screen element & show the #questions element

start.addEventListener('click',function(event){
    
    // use setAttribute to set the class to 'hide'
    startScreen.setAttribute('class','hide')
    
    // use the setAttribute to set the class to '' (shows element)
    questionsScreen.setAttribute('class','')
    console.log("start has been clicked")

})