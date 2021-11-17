// Javascript for dynamic gird size
//const button = document.querySelector('.my-button');
const square = document.querySelector(".magic-square");
const hintArea = document.querySelector(".hint-area")

let SquareSize = 3; // Assumed Magic Square is size three by default
let SquareDiff = 0;
let squareArraySorted = [3,5,7,4,9,2,8,1,6]; 

// Defining constants for button names
const submitBtn = document.getElementById('submit-button');
const startBtn = document.getElementById('start-button');
const hintBtn = document.getElementById('hint-button');
const settingsBtn = document.getElementById('settings-button');

// Defining container ids
const ContainerInstructions = document.getElementById('container-instructions');
const ContainerSettings = document.getElementById('container-settings');
const ContainerGame = document.getElementById('container-game');


// Code to run on clicking submit button
submitBtn.addEventListener('click', checkAnswer)

// Code to run on clicking hint button
hintBtn.addEventListener('click', showHint)

// Code to run on clicking start button
startBtn.addEventListener('click', startGame)

// Code to run on clicking settings button
settingsBtn.addEventListener('click', gameSettings)

// Once page has loaded, all code in this function will run:
document.addEventListener("DOMContentLoaded", function() {
    console.log(genSquare());
    makeSquare(genSquare());
    resizeSquare(SquareSize);
})


function gameSettings() {
    ContainerInstructions.classList.add('hide')
    ContainerGame.classList.add('hide')
    ContainerSettings.classList.remove('hide')
}


function startGame() {
    ContainerSettings.classList.add('hide')
    ContainerInstructions.classList.add('hide')
    ContainerGame.classList.remove('hide')
    makeSquare(genSquare());
    resizeSquare(SquareSize);
    console.log('Game has started');
}

function showHint() {
    let out = 'Have you tried the following values: '
    for(i=0; i<SquareSize; i++) {
        out += squareArraySorted[IndexToRemove[i]];
        if(i != SquareSize-1){out += ','}
    }
    out += ' ?'
    console.log(out)
    hintArea.innerHTML = ''; // clearing the hint
    hintArea.innerHTML += out;
}

/* storing the size when a size button is clicked */
document.getElementById('button-small-size').onclick = SetSquareSize;
document.getElementById('button-medium-size').onclick = SetSquareSize;
document.getElementById('button-large-size').onclick = SetSquareSize;

/* storing the difficulty when the difficulty button is clicked */
document.getElementById('button-diff-easy').onclick = SetSquareDiff;
document.getElementById('button-diff-medium').onclick = SetSquareDiff;
document.getElementById('button-diff-hard').onclick = SetSquareDiff;

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
    }
    if (this.id == 'button-medium-size') {
        SquareSize = 5;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        console.log(SquareSize);
    }
    if (this.id == 'button-large-size') {
        SquareSize = 7;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
        console.log(SquareSize);
    }
}  

function SetSquareDiff(clicked) {
    if (this.id == 'button-diff-easy') {
        SquareDiff = 0;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
    }
    if (this.id == 'button-diff-medium') {
        SquareDiff= 2;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
    }
    if (this.id == 'button-diff-hard') {
        SquareDiff = 4;
        makeSquare(genSquare());
        resizeSquare(SquareSize);
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
        square.innerHTML += "<div class='square-item'><input class='answer-box' type='number' id='answer-"+i+"'></input></div>";
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
        console.log('i equals:' + i + 'j equals:' + j)
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
}