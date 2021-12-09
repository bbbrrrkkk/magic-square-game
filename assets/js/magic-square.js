/*jshint esversion: 7 */
/*globals $ */

// Defining constants for classes
const square = document.querySelector(".magic-square");

// Setting initial values for Magic Square
let IndexToRemove = [];
let SquareSize = 3; // Assumed Magic Square is size three by default
let SquareDiff = 0; // Assumed difficulty level is set to easy - corresponding to a increment value of 0
let squareArraySorted = [3,5,7,4,9,2,8,1,6]; // Initial magic square array sorted 
let gameDiff = 'easy';

// Setting variable to count clicks on Hint button
var hintClicks = 0; // should be var not int
  
// Code to run functions when buttons are pressed:
document.getElementById('submit-button').addEventListener('click', checkAnswer); // submit button
document.getElementById('hint-button').addEventListener('click', showHint); // hint button
document.getElementById('play-button').addEventListener('click', playGame); // start button
document.getElementById('settings-button').addEventListener('click', gameSettings); // settings button
document.getElementById('instructions-button').addEventListener('click', gameInstructions); // settings button
document.getElementById('reset-button').addEventListener('click', resetGame); // reset button


// Once page has loaded, all code in this function will run:
document.addEventListener("DOMContentLoaded", function() {
    $('#container-intro').fadeIn(1600); 
    squareArraySorted = makeSquare(genSquare());
    fillSquare(SquareSize);
});

// Code to run once the user has clicked on the 'Start Game' button
  $('#start-button').bind('click', function() {  
    $('#container-intro').fadeOut(0, function(){
        $('#container-instructions').removeClass('hide');
        $('#credits').removeClass('hide');
        $('#instructions-button').removeClass('hide');
        $('#play-button').removeClass('hide');
        $('#hint-button').removeClass('hide');
        $('#settings-button').removeClass('hide');    
    });
});

// ************************************************
// Setting variables to capture the grid size and game difficulty
// ************************************************

/* storing the size when a size button is clicked */
document.getElementById('button-small-size').onclick = SetSquareSize;
document.getElementById('button-medium-size').onclick = SetSquareSize;
document.getElementById('button-large-size').onclick = SetSquareSize;

/* storing the difficulty when the difficulty button is clicked */
document.getElementById('button-diff-easy').onclick = RecordDiff;
document.getElementById('button-diff-medium').onclick = RecordDiff;
document.getElementById('button-diff-hard').onclick = RecordDiff;

// ************************************************
// Functions to show the Game Sections
// ************************************************

/**
 * Function to show the game settings; unused containers are hidden
 */
function gameSettings() {
    $('#container-instructions').addClass('hide');
    $('#container-game').addClass('hide');  
    $('#container-settings').removeClass('hide');
    $('#reset-button').addClass('hide');
    $('#play-button').removeClass('hide');
    clearHint(); // Clearing the hint if player moves back to Settings 
    hintClicks = 0; // Resetting the hint button counter if the player moves back to settings
}

/**
 * Function to show the game instructions; unused containers are hidden
 */
function gameInstructions() {
    $('#container-instructions').removeClass('hide');
    $('#container-game').addClass('hide'); 
    $('#container-settings').addClass('hide'); 
    $('#reset-button').addClass('hide');
    $('#play-button').removeClass('hide');
    clearHint();
    hintClicks = 0; // Resetting the hint button counter if the player moves back to the Instructions
}

/**
 * Function to play the game; unused containers are hidden
 */
function playGame() {
    $('#container-settings').addClass('hide'); 
    $('#container-instructions').addClass('hide');
    $('#container-game').removeClass('hide'); 
    $('#play-button').addClass('hide');
    $('#reset-button').removeClass('hide');
    hideMessages();
    SetSquareDiff(); // setting square difficulty based on the value of the squareDiff variable
    squareArraySorted = makeSquare(genSquare());
    fillSquare(SquareSize);
}

/**
 * Function to reset the game and play again
 */
function resetGame() {
    playGame(); 
    hideMessages();
    hintClicks = 0; // Resetting the hint button counter if the player resets the game
}

/**
 * Function to hide the messages that appear on game page for hints, correct submissions and wrong submissions
 */
function hideMessages() {
    $("#correct-ans-msg").addClass('hide');
    $('#hint-msg').addClass('hide');
    $('#wrong-ans-msg').addClass('hide');
}


// ************************************************
// Functions to manage the Game Hints
// ************************************************

/**
 * Function to update the button press count for the hint button; the maximum value is 4
 */
function hintClickUpdate() {
    if (hintClicks == 4){
        hintClicks = 4;
    }
    else {hintClicks += 1;}
}

/**
 * Shows the hint
 * Hint values are extracted from the sorted array containing the magic square values
 */
function showHint() {
    hintClickUpdate();
    $('#hint-msg').removeClass('hide');
    let out;

    // Code to generate the hint on the first click
    if (hintClicks == 1) {
        out = '<strong>Hint!</strong><br>Each row, column and diagonal should sum to ';
        let sumVals = 0;
        for(let i=0; i<SquareSize; i++) {
            sumVals += parseInt(squareArraySorted[i]);
        }
        out = out + sumVals + '.';
        }

    // Code to generate the hint on the second click
    if (hintClicks == 2) {
        out = '<strong>Hint!</strong><br>The largest missing value is ';
        let missingVals = [];
        for(let i=0; i<SquareSize; i++) {
            missingVals.push(parseInt(squareArraySorted[IndexToRemove[i]]));
        }
        out = out + Math.max.apply(Math,missingVals) + '.';
    }

    // Code to generate the hint on the third click
    if (hintClicks == 3) {
        out = '<strong>Hint!</strong><br>The smallest missing value is ';
        let missingVals = [];
        for(let i=0; i<SquareSize; i++) {
            missingVals.push(parseInt(squareArraySorted[IndexToRemove[i]]));
        }
        out = out + Math.min.apply(Math,missingVals) + '.';
    }    

    // Code to generate the hint on the fourth click
    if (hintClicks == 4) {
        out = '<strong>Hint!</strong><br>Try the following values: ';
        for(let i=0; i<SquareSize; i++) {
            out += squareArraySorted[IndexToRemove[i]];
            if(i != SquareSize-1){out += ', ';}
        }
        out += '.';
    }

    // Display the hint and fade out
    clearHint();
    $('#hint-msg').html(out);
    $('#hint-msg').fadeOut(6000, function() {
        $('#hint-msg').removeAttr( 'style');
        $('#hint-msg').addClass('hide');
    });
}

/**
 * Clears the hint area
 */
function clearHint() {
    $('#hint-msg').html('');
}

// ************************************************
// Defining helper functions to add and remove classes
// ************************************************

/**
 * Function to help add classes when the user clicks a button 
 * @param {*} clickedBtn : Button the user has clicked on
 * @param {*} targetClass : Target class that will be modified
 * @param {*} classToAdd : Class to be added to the target class
 */
function addClass(clickedBtn, targetClass, classToAdd) {
    if($(targetClass).hasClass(classToAdd)) 
    		{
        $(targetClass).removeClass(classToAdd);
        $(clickedBtn).addClass(classToAdd);
    		}
    }

/**
 * Function to help remove classes when the user clicks a button 
 * @param {*} clickedBtn : Button the user has clicked on
 * @param {*} targetClass : Target class that will be modified
 * @param {*} classToRemove : Class to be removed to the target class
 */
function removeClass(clickedBtn, targetClass, classToRemove) {
    if($(targetClass).hasClass(classToRemove)) {
        $(targetClass).addClass(classToRemove);
        $(clickedBtn).removeClass(classToRemove);}
    }    


// ************************************************
// Functions to generate the magic square and check if the square is correct
// ************************************************

/**
 * Function to record the game difficulty and highlight the clicked button
 * @param {*} clicked 
 */    
function RecordDiff(clicked) {

    if (this.id == 'button-diff-easy') {
        gameDiff = 'easy';
        addClass('#button-diff-easy', '.btn-diff', 'btn-click'); 
        removeClass('.text-diff-easy', '.settings-text-diff', 'hide'); // changing button color          
        }
    if (this.id == 'button-diff-medium') {
        gameDiff = 'medium';
        addClass('#button-diff-medium', '.btn-diff', 'btn-click');    
        removeClass('.text-diff-medium', '.settings-text-diff', 'hide'); // changing button color           
        }
    
    if (this.id == 'button-diff-hard') {
        gameDiff = 'hard';
        addClass('#button-diff-hard', '.btn-diff', 'btn-click');    
        removeClass('.text-diff-hard', '.settings-text-diff', 'hide'); // changing button color     
        }
    }     

/**
 * Function to set the magic square size on click by the user
 * @param {*} clicked 
 */
function SetSquareSize(clicked) {
    if (this.id == 'button-small-size') {
        SquareSize = 3;
        addClass('#button-small-size', '.btn-size', 'btn-click'); // changing button color
        removeClass('.text-small-grid', '.settings-text-grid', 'hide'); // changing button color       
    
    }
    if (this.id == 'button-medium-size') {
        SquareSize = 5;
        addClass('#button-medium-size', '.btn-size', 'btn-click');  // changing button color        
        removeClass('.text-medium-grid', '.settings-text-grid', 'hide'); // changing button color
    }
    
    if (this.id == 'button-large-size') {
        SquareSize = 7;
        addClass('#button-large-size', '.btn-size', 'btn-click'); // changing button color            
        removeClass('.text-large-grid', '.settings-text-grid', 'hide'); // changing button color            
    }
}  

/**
 * Function to generate a random integer within a given range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

/**
 * Function to set the square difficulty based on user input
 * Default difficulty is easy
 */
function SetSquareDiff() {
    
    if (gameDiff == 'easy') {
        SquareDiff = getRandomInt(0,3);    
    }
    if (gameDiff == 'medium') {
        SquareDiff = getRandomInt(2,5);

    }
    if (gameDiff == 'hard') {
        SquareDiff = getRandomInt(4,7);
    }
}  

/**
 * Function to generate the magic square values
 * @returns an array of the magic square values in increasing numerical order 
 */
function genSquare() {
    let foo = [];
    for (var i = 1; i <= SquareSize**2; i++) {
        foo.push(i+(SquareDiff*(i-1)));
    }
    return foo;
}

/**
 * Function that resizes the square based on the user size.
 * Size of the grid dynamically resized.
 * New grid size is specified as argument in the function call.
 */
function fillSquare(NewSquareSize) {
  square.innerHTML = ''; /* Clearing HTML content */

  IndexToRemove = getIndexToRemove(NewSquareSize);  

  for (let i = 0; i < NewSquareSize * NewSquareSize; i++) { /* Placing html content with for loop */
    if (IndexToRemove.includes(i)) {
        square.innerHTML += "<div class='square-item'><input class='answer-box' type='text' id='answer-"+i+"'></input></div>";
        }
    else {
        square.innerHTML +='<div class="square-item">'+ squareArraySorted[i] + '</div>';}
  }
  square.style.setProperty("--grid-size", NewSquareSize); /*Setting new grid size */
  square.style.setProperty("font-size", (180/NewSquareSize)+'px'); /* Resizing the font size for the magic square */
}

/**
 * Function to create the magic square.
 * Given an input array, the function will return a flattened sorted array.
 * @returns reordered array that will solve to a magic square
 */
function makeSquare(squareArray){
    var n = Math.sqrt(squareArray.length); // size of the grid
    
    // Defining an empty square
    var square = [];
    for(var i=0; i<n; i++) {
        square[i] = new Array(n);
    }

    i = 1; // starting row
    var j = (n+1)/2; // starting column

    // Filling the empty square with the array variables
    for(var k=0; k<squareArray.length; k++) {
        let is = i;
        let js = j;
        square[i-1][j-1] = squareArray[k];
        i = n - (n+1-i)%(n);
        j = (j%n) + 1;
        if (square[i-1][j-1] != null) {
            i = (is%n) + 1;
            j = js;
        }
    }
    console.table(square);
    // Flattening square to an array
    return square.flat();
}

/**
 * Function to randomly generate a list of index values to remove.
 * Given an magic square of size n, function will generate a list of size n of index values
 * @returns a list of size n of unique values; there represent index values to be removed from the magic square arry
 */
function getIndexToRemove(SquareSize){
    let IndexToRemove = [];
    
    for(var i=0; i<SquareSize; i++){
        while (IndexToRemove.length < i+1) {
            let randVal = parseInt(Math.random()*SquareSize**2);
            if (IndexToRemove.includes(randVal)){}
            else {IndexToRemove.push(randVal);}
          }
    }
    return IndexToRemove;
}

/**
 * Function to check whether the answer is correct.
 * Size of the grid dynamically resized.
 * New grid size is specified as argument in the function call.
 */
function checkAnswer(){
    let inputAns = [];
    let correctAns = [];

    // For statement loops through the answer boxes in the magic square
    // Answer box index numbers correspond to the index numbers of the missing values from the magic square
    // Validation check completed to see if the values match
    // The correctAns array will contain all true values if the values input by the user are correct
    for(var i=0; i<IndexToRemove.length; i++){
        inputAns.push(parseInt(document.getElementById('answer-'+IndexToRemove[i]).value));
        correctAns.push(inputAns[i] == squareArraySorted[IndexToRemove[i]]);
        }

    // If statement to return response to user if answers are correct        
    if (correctAns.every(Boolean)) {
        // successArea.innerHTML = '<span class="closebtn">&times;</span> You got it right!<br><br> Press the <strong>Reset Game</strong> button to play again or use the <strong>Settings</strong> button to change the difficulty level';
        //successArea.classList.remove('hide');

        $('#correct-ans-msg').html('<span class="closebtn">&times;</span> You got it right!<br>Press the <strong>Reset Game</strong> button to play again or use the <strong>Settings</strong> button to change the difficulty level');
        $("#correct-ans-msg").removeClass('hide');
    }

    // Output to user if the answers are not correct
    else {
        // wrongArea.innerHTML = "That's not quite right....<br><br>Try a <strong>Hint</strong> if you're stuck..!"
        //wrongArea.classList.remove('hide');
        
        $('#wrong-ans-msg').html("That's not quite right....<br>Try a <strong>Hint</strong> if you're stuck..!");
        $('#wrong-ans-msg').removeClass('hide');

        $('#wrong-ans-msg').fadeOut(6000, function() {
            $('#wrong-ans-msg').removeAttr( 'style');
            $('#wrong-ans-msg').addClass('hide');
        });   
    }
}