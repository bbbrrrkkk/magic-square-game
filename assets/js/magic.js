// Javascript for dynamic gird size
//const button = document.querySelector('.my-button');
const square = document.querySelector(".magic-square");
//let SquareSize = 3; // Assumed Magic Square is size three by default


/*
button.addEventListener("click", handleClick);
*/

/* storing the size when a size button is clicked */
document.getElementById('button-small-size').onclick = SetSquareSize;
document.getElementById('button-medium-size').onclick = SetSquareSize;
document.getElementById('button-large-size').onclick = SetSquareSize;

function SetSquareSize(clicked) {
    if (this.id == 'button-small-size') {
        resizeSquare(3);
        console.log(3);
    }
    if (this.id == 'button-medium-size') {
        resizeSquare(5);
        console.log(5);
    }
    if (this.id == 'button-large-size') {
        resizeSquare(7);
        console.log(7);
    }
}  


/**
 * Function that resizes the square based on the user size.
 * Size of the grid dynamically resized.
 * New grid size is specified as argument in the function call.
 */
function resizeSquare(SquareSize) {
  square.innerHTML = ''; /* Clearing HTML content */
  for (let i = 0; i < SquareSize * SquareSize; i++) { /* Placing html content with for loop */
    square.innerHTML +='<div class="square-item">' +i+'</div>';
  }
  square.style.setProperty("--grid-size", SquareSize); /*Setting new grid size */
  square.style.setProperty("font-size", (180/SquareSize)+'px'); /* Resizing the font size for the magic square */
}

/*

// Defining the base magic square
// Function to be written to automatically generate the values array

// Defining an empty square
var square2 = [];
for(var i=0; i<3; i++) {
    square2[i] = new Array(3);
}

// Filling the gird with the k values using the 
// MatLab version of the algorithm

var n = 3; // size of the grid
let array = [1,2,3,4,5,6,7,8,9]; // magic square array
var i = 1; // starting row
var j = (n+1)/2; // starting column

for(var k=0; k<9; k++) {
    let is = i;
    let js = j;
    square2[i-1][j-1] = array[k];
    i = n - (n+1-i)%(n);
    j = (j%n) + 1;
    if (square2[i-1][j-1] != null) {
        i = (is%n) + 1;
        j = js;
    }
}

console.table(square2);
*/