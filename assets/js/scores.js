// Assign variable to order list #highscores
let highscores = document.querySelector('#highscores')

// Assign variable to button '#clear' (clear the localObject 'scores')
let clear = document.querySelector('#clear')

//console.log(highscores)

displayScores()
function displayScores() {

    // If the localStorage item 'scores' is not empty then we want to fetch the current scores
    if (localStorage.getItem('scores') !== null) {

        // fetch the current scores string and convert it into an array
        scores = JSON.parse(localStorage.getItem('scores'))
        // Loop through each score 
        scores.forEach(function (element) {
            // create a HTML li element
            let li = document.createElement('li')
            // assign the textContent using the initial and score
            li.textContent = (element.initial + ' - ' + element.score)
            //console.log(li)

            // append the li to the #highscores <ol> element
            highscores.appendChild(li)
        })
    } 
}

// Add an event listner ('click') to the clear button
clear.addEventListener('click', function(){

    //console.log("clicked")
    // Only attemt to clear the 'scores' item in localStorage if it exists
    if (localStorage.getItem('scores') !== null) {
        
        // removes the scores from localStorage
        localStorage.removeItem('scores')

        // clear the html of the high scores
        highscores.innerHTML = ''
    }
})