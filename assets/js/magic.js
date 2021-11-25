// Defining constants for classes
const square = document.querySelector(".magic-square");
const hintArea = document.querySelector(".hint-area")

// Setting inital values for Magic Square
let SquareSize = 3; // Assumed Magic Square is size three by default
let SquareDiff = 0;
let squareArraySorted = [3,5,7,4,9,2,8,1,6]; 

// Defining constants for button names
const submitBtn = document.getElementById('submit-button');
const playBtn = document.getElementById('play-button');
const hintBtn = document.getElementById('hint-button');
const settingsBtn = document.getElementById('settings-button');
const instructionsBtn = document.getElementById('instructions-button');
const resetBtn = document.getElementById('reset-button')
const startBtn = document.getElementById('start-button')

// Defining container ids
const ContainerInstructions = document.getElementById('container-instructions');
const ContainerSettings = document.getElementById('container-settings');
const ContainerGame = document.getElementById('container-game');

// Code to run functions when buttons are pressed:
submitBtn.addEventListener('click', checkAnswer) // submit button
hintBtn.addEventListener('click', showHint) // hint button
playBtn.addEventListener('click', playGame) // start button
settingsBtn.addEventListener('click', gameSettings) // settings button
instructionsBtn.addEventListener('click', gameInstructions) // settings button
resetBtn.addEventListener('click', resetGame) // settings button

// Once page has loaded, all code in this function will run:
document.addEventListener("DOMContentLoaded", function() {
    $('#container-intro').fadeIn(1600); 
    console.log(genSquare());
    makeSquare(genSquare());
    resizeSquare(SquareSize);
})

startBtn.addEventListener('click', function() {
    $('#container-intro').fadeOut(0, function(){
        ContainerInstructions.classList.remove('hide');
        $('#credits').removeClass('hide')
        instructionsBtn.classList.remove('hide');
        playBtn.classList.remove('hide')
        hintBtn.classList.remove('hide')
        settingsBtn.classList.remove('hide')
    });
})


// , function() {

// });

// Code to change button colors:
// https://stackoverflow.com/questions/55873688/how-to-change-button-colors-on-click-with-multiple-buttons/55873783
//$('.btn-size').on('click', function() {
//    let btnSize = $('.btn-size');
//
//    if(btnSize.hasClass('btn-size-click')) {
//        btnSize.removeClass('btn-size-click');
//        $(this).addClass('btn-size-click');
//    }
// });


function gameSettings() {
    ContainerInstructions.classList.add('hide')
    ContainerGame.classList.add('hide')
    ContainerSettings.classList.remove('hide')
    clearHint() // Clearing the hint if player moves back to Settings 
    resetBtn.classList.add('hide') // hiding the reset button;
    playBtn.classList.remove('hide') // unhiding the start button;
}

function gameInstructions() {
    ContainerInstructions.classList.remove('hide')
    ContainerGame.classList.add('hide')
    ContainerSettings.classList.add('hide')
    clearHint() // Clearing the hint if player moves back to Instructions 
    resetBtn.classList.add('hide') // hiding the reset button;
    playBtn.classList.remove('hide') // unhiding the start button;
}



function playGame() {
    ContainerSettings.classList.add('hide')
    ContainerInstructions.classList.add('hide')
    ContainerGame.classList.remove('hide')
    makeSquare(genSquare());
    resizeSquare(SquareSize);
    console.log('Game has started');
    playBtn.classList.add('hide'); //hide the start button; reset button will be used to start the game
    resetBtn.classList.remove('hide') // unhiding the reset button
}

function resetGame() {
    playGame(); 
}

function showHint() {
    let out = 'Have you tried the following values: '
    for(i=0; i<SquareSize; i++) {
        out += squareArraySorted[IndexToRemove[i]];
        if(i != SquareSize-1){out += ','}
    }
    out += ' ?'
    console.log(out)
    clearHint();
    hintArea.innerHTML += out;
}

function clearHint() {
    hintArea.innerHTML = ''; // clearing the hint
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

    console.table(square);
    console.log(squareArraySorted);

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


function checkAnswer(){
    let inputAns = [];
    let correctAns = [];

    for(var i=0; i<IndexToRemove.length; i++){
        inputAns.push(parseInt(document.getElementById('answer-'+IndexToRemove[i]).value));
        correctAns.push(inputAns[i] == squareArraySorted[IndexToRemove[i]]);
        }

    console.log(inputAns)
    console.log(correctAns)

    if (correctAns.every(Boolean)) {
        alert("Hey! You got it right! :D");
    }

    else {
        alert('Try again !')
    }
}