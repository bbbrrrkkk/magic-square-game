// Defining constants for classes
const square = document.querySelector(".magic-square");
//const hintArea = document.querySelector("#hint-msg");
//const successArea = document.querySelector("#correct-ans-msg");
//const wrongArea = document.querySelector("#wrong-ans-msg");

// Setting initial values for Magic Square
let SquareSize = 3; // Assumed Magic Square is size three by default
let SquareDiff = 0; // Assumed difficulty level is set to easy - corresponding to a increment value of 0
let squareArraySorted = [3,5,7,4,9,2,8,1,6]; // Initial magic square array sorted 

// Defining constants for button names
//const submitBtn = document.getElementById('submit-button');
//const playBtn = document.getElementById('play-button');
//const hintBtn = document.getElementById('hint-button');
//const settingsBtn = document.getElementById('settings-button');
//const instructionsBtn = document.getElementById('instructions-button');
//const resetBtn = document.getElementById('reset-button');
//const startBtn = document.getElementById('start-button');

// Defining container ids
//const ContainerInstructions = document.getElementById('container-instructions');
//const ContainerSettings = document.getElementById('container-settings');
//const ContainerGame = document.getElementById('container-game');

// Code to run functions when buttons are pressed:
document.getElementById('submit-button').addEventListener('click', checkAnswer); // submit button
document.getElementById('hint-button').addEventListener('click', showHint); // hint button
document.getElementById('play-button').addEventListener('click', playGame); // start button
document.getElementById('settings-button').addEventListener('click', gameSettings); // settings button
document.getElementById('instructions-button').addEventListener('click', gameInstructions); // settings button
document.getElementById('reset-button').addEventListener('click', resetGame); // settings button

// Once page has loaded, all code in this function will run:
document.addEventListener("DOMContentLoaded", function() {
    $('#container-intro').fadeIn(1600); 
    console.log(genSquare());
    makeSquare(genSquare());
    resizeSquare(SquareSize);
})

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
})


function gameSettings() {
    //ContainerInstructions.classList.add('hide')
    //ContainerGame.classList.add('hide')
    //ContainerSettings.classList.remove('hide')
    
    //resetBtn.classList.add('hide') // hiding the reset button;
    //playBtn.classList.remove('hide') // unhiding the start button;
    $('#container-instructions').addClass('hide');
    $('#container-game').addClass('hide');  
    $('#container-settings').removeClass('hide');
    $('#reset-button').addClass('hide');
    $('#play-button').removeClass('hide');
    clearHint() // Clearing the hint if player moves back to Settings 

}

function gameInstructions() {
    // ContainerInstructions.classList.remove('hide')
    // ContainerGame.classList.add('hide')
    // ContainerSettings.classList.add('hide')
    // clearHint() // Clearing the hint if player moves back to Instructions 
    // resetBtn.classList.add('hide') // hiding the reset button;
    // playBtn.classList.remove('hide') // unhiding the start button;

    $('#container-instructions').removeClass('hide');
    $('#container-game').addClass('hide'); 
    $('#container-settings').addClass('hide'); 
    $('#reset-button').addClass('hide');
    $('#play-button').removeClass('hide');
    clearHint()
}


function playGame() {
    // ContainerSettings.classList.add('hide')
    // ContainerInstructions.classList.add('hide')
    // ContainerGame.classList.remove('hide')
    // makeSquare(genSquare());
    // resizeSquare(SquareSize);
    // console.log('Game has started');
    // playBtn.classList.add('hide'); //hide the start button; reset button will be used to start the game
    // resetBtn.classList.remove('hide') // unhiding the reset button

    $('#container-settings').addClass('hide'); 
    $('#container-instructions').addClass('hide');
    $('#container-game').removeClass('hide'); 
    $('#play-button').addClass('hide');
    $('#reset-button').removeClass('hide');
    makeSquare(genSquare());
    resizeSquare(SquareSize);
}

function resetGame() {
    playGame(); 
    //successArea.classList.add('hide');
    //hintArea.classList.add('hide');
    //wrongArea.classList.add('hide');
    $("#correct-ans-msg").addClass('hide');
    $('#hint-msg').addClass('hide');
    $('#wrong-ans-msg').addClass('hide');

}

/**
 * Shows the hint
 * Hint values are extracted from the sorted array containing the magic square values
 */
function showHint() {
    //hintArea.classList.remove('hide');
    $('#hint-msg').removeClass('hide');
    let out = '<strong>Hint!</strong><br>Try the following values: '
    for(i=0; i<SquareSize; i++) {
        out += squareArraySorted[IndexToRemove[i]];
        if(i != SquareSize-1){out += ', '}
    }
    out += '.'
    clearHint();
    $('#hint-msg').html(out)
    $('#hint-msg').fadeOut(6000, function() {
        $('#hint-msg').removeAttr( 'style');
        $('#hint-msg').addClass('hide');
    });
}

/**
 * Clears the hint area
 */
function clearHint() {
    //hintArea.innerHTML = ''; // clearing the hint
    $('#hint-msg').html('')
}

/* storing the size when a size button is clicked */
document.getElementById('button-small-size').onclick = SetSquareSize;
document.getElementById('button-medium-size').onclick = SetSquareSize;
document.getElementById('button-large-size').onclick = SetSquareSize;

/* storing the difficulty when the difficulty button is clicked */
document.getElementById('button-diff-easy').onclick = SetSquareDiff;
document.getElementById('button-diff-medium').onclick = SetSquareDiff;
document.getElementById('button-diff-hard').onclick = SetSquareDiff;


function addClass(clickedBtn, targetClass, classToAdd) {
    if($(targetClass).hasClass(classToAdd)) {
        $(targetClass).removeClass(classToAdd);
        $(clickedBtn).addClass(classToAdd);};
    }

function removeClass(clickedBtn, targetClass, classToRemove) {
    if($(targetClass).hasClass(classToRemove)) {
        $(targetClass).addClass(classToRemove);
        $(clickedBtn).removeClass(classToRemove);};
    }    

/**
 * Reads the button id and sets the square size parameter. reSize square function call to resize the Magic Square.
 * @param {*} clicked 
 */
function SetSquareSize(clicked) {

    if (this.id == 'button-small-size') {
        SquareSize = 3;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        console.log(SquareSize);
        addClass('#button-small-size', '.btn-size', 'btn-click'); // changing button color
        removeClass('.text-small-grid', '.settings-text-grid', 'hide'); // changing button color       
    
    }
    if (this.id == 'button-medium-size') {
        SquareSize = 5;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        console.log(SquareSize);
        addClass('#button-medium-size', '.btn-size', 'btn-click');  // changing button color        
        removeClass('.text-medium-grid', '.settings-text-grid', 'hide'); // changing button color
    }
    
    if (this.id == 'button-large-size') {
        SquareSize = 7;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        console.log(SquareSize);
        addClass('#button-large-size', '.btn-size', 'btn-click'); // changing button color            
        removeClass('.text-large-grid', '.settings-text-grid', 'hide'); // changing button color            
    }
}  

function SetSquareDiff(clicked) {
    console.log(this.id)
    if (this.id == 'button-diff-easy') {
        SquareDiff = 0;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        addClass('#button-diff-easy', '.btn-diff', 'btn-click'); 
        removeClass('.text-diff-easy', '.settings-text-diff', 'hide'); // changing button color           
    }
    if (this.id == 'button-diff-medium') {
        SquareDiff= 2;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        addClass('#button-diff-medium', '.btn-diff', 'btn-click');    
        removeClass('.text-diff-medium', '.settings-text-diff', 'hide'); // changing button color           
    }
    if (this.id == 'button-diff-hard') {
        SquareDiff = 4;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        addClass('#button-diff-hard', '.btn-diff', 'btn-click');    
        removeClass('.text-diff-hard', '.settings-text-diff', 'hide'); // changing button color           
    }
}  

/**
 * Function to generate the magic square values
 * @returns an order array of the magic square values 
 */
function genSquare() {
    let foo = [];
    for (var i = 1; i <= SquareSize**2; i++) {
        foo.push(i+(SquareDiff*(i-1)))
    }
    console.log(foo);
    return foo;
}


/**
 * Function that resizes the square based on the user size.
 * Size of the grid dynamically resized.
 * New grid size is specified as argument in the function call.
 */
function resizeSquare(NewSquareSize) {
  console.log(squareArraySorted)
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

function makeSquare(squareArray){
    // Defining the base magic square
    // Function to be written to automatically generate the values array

    // Filling the gird with the k values using the 
    // MatLab version of the algorithm
    var n = Math.sqrt(squareArray.length); // size of the grid
    
    // Defining an empty square
    var square = [];
    for(var i=0; i<n; i++) {
        square[i] = new Array(n);
    }

    var i = 1; // starting row
    var j = (n+1)/2; // starting column

    // Filling the empty square with the array variables
    for(var k=0; k<squareArray.length; k++) {
        let is = i;
        let js = j;
        //console.log('i equals:' + i + 'j equals:' + j)
        square[i-1][j-1] = squareArray[k];
        i = n - (n+1-i)%(n);
        j = (j%n) + 1;
        if (square[i-1][j-1] != null) {
            i = (is%n) + 1;
            j = js;
        }
    }

    // Flattening square to an array
    squareArraySorted = square.flat();
}


// Code to remove values:
function getIndexToRemove(SquareSize){
    let IndexToRemove = [];
    
    for(var i=0; i<SquareSize; i++){
        while (IndexToRemove.length < i+1) {
            let randVal = parseInt(Math.random()*SquareSize**2);
            if (IndexToRemove.includes(randVal)){}
            else {IndexToRemove.push(randVal)}
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
        
        $('#wrong-ans-msg').html("That's not quite right....<br>Try a <strong>Hint</strong> if you're stuck..!")
        $('#wrong-ans-msg').removeClass('hide');

        $('#wrong-ans-msg').fadeOut(6000, function() {
            $('#wrong-ans-msg').removeAttr( 'style');
            $('#wrong-ans-msg').addClass('hide');
        });   
    }
}