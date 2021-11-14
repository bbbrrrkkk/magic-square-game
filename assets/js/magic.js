// Javascript for dynamic gird size
//const button = document.querySelector('.my-button');
const square = document.querySelector(".magic-square");
let SquareSize = 3; // Assumed Magic Square is size three by default
let SquareDiff = 1;
let squareArraySorted = [3,5,7,4,9,2,8,1,6]; 

/*
button.addEventListener("click", handleClick);
*/

/* storing the size when a size button is clicked */
document.getElementById('button-small-size').onclick = SetSquareSize;
document.getElementById('button-medium-size').onclick = SetSquareSize;
document.getElementById('button-large-size').onclick = SetSquareSize;

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

/* storing the difficulty when the difficulty button is clicked */
document.getElementById('button-diff-easy').onclick = SetSquareDiff;
document.getElementById('button-diff-medium').onclick = SetSquareDiff;
document.getElementById('button-diff-hard').onclick = SetSquareDiff;


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
  square.innerHTML = ''; /* Clearing HTML content */

  IndexToRemove = getIndexToRemove(NewSquareSize);  

  for (let i = 0; i < NewSquareSize * NewSquareSize; i++) { /* Placing html content with for loop */
    if (IndexToRemove.includes(i)) {
        square.innerHTML += "<div class='square-item'><input class='answer-box' type='number'></input></div>";
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
    var i = 1; // starting row
    var j = (n+1)/2; // starting column

    // Defining an empty square
    var square = [];
    for(var i=0; i<n; i++) {
        square[i] = new Array(n);
    }

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

    // Flattening square to an array
    squareArraySorted = square.flat();

    console.table(square);
    console.log(squareArraySorted);

}


// Code to remove values:

function getIndexToRemove(SquareSize){
    let IndexToRemove = [];
    
    for(var i=0; i<SquareSize; i++){
        IndexToRemove.push(parseInt(Math.random()*SquareSize**2));
    }

    return IndexToRemove;
}

