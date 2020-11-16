var playerOne = prompt("What is the Player 1(Red) name: ")
var playerTwo = prompt("What is the Player 2(blue) name: ")
var redArray = [];
var blueArray = [];
var turn = 0;
var red = {
  'background-color': 'red'};
var blue = {
  'background-color': 'blue'};
var gameOver = false;



//Add event listener the top row of the game board
function initiate(){
  $('h5').text(playerOne + " it is your turn");
  for(var i = 0; i < 7; i++){
    $('td').eq(i).click(function(){
      playerTurn(this);
    })
  }
}
initiate()

//Go through each players turn
function playerTurn(cell){
  var i = $(cell).index();
  var j = i+35;
  for(var i = 0; i < 6; i++){
    while(true){
      if($('td').eq(j).css('background-color') == 'rgb(255, 0, 0)' || $('td').eq(j).css('background-color') == 'rgb(0, 0, 255)' ){
        j-=7;
        continue;
      }if(j<0){
        return -1;
      }
      else{
        break;
      }
    }
  }
  if(turn%2 == 0){
    changeColor(redArray, red, j, playerTwo);
  } else {
    changeColor(blueArray, blue, j, playerOne);
  }
}

//Places the given color chip on the board
function changeColor (array, color, index, player){
  $('td').eq( index).css(color);
  array.push(index);
  $('h5').text(player + " it is your turn");
  setTimeout(function () {
    isWinner = winCheck(index, player);
  }, 100);

  turn++;
}

//Function checks if the most recetn chip placed has the required
//chips around it to win the game
function winCheck(index , player){
  var check = [index];
  var i = 0;
  var circleColor = $('td').eq(check[0]).css('background-color');
  while(i < check.length){
    var modOne = check[i]%7;
    var modTwo = (check[i]+1)%7;
    chipCheck(check, i, 7, circleColor);
    chipCheck(check, i, -7, circleColor);
    chipCheck(check, i, 1, circleColor, modTwo);
    chipCheck(check, i, -1, circleColor, modOne);
    i++;
  }
  if(check.length > 5 && gameOver === false){
    gameWon(player);
  }
}


//adds color to heading depending on the victor
function gameWon(player){
    turn%2 === 0? ($('h1').addClass('player-blue'), $('h1').text(playerTwo + " is the VICTOR!!"))  :
                  ($('h1').addClass('player-red'), $('h1').text(playerOne + " is the VICTOR!!"))
  $('h5').text('GAME OVER');
  gameOver = true;
  $('td').off();
}

//Fucntion checks for the identical color pieces around the give chip
function chipCheck(arr, i, position, color, modValue = null){
  if($('td').eq(arr[i]+position).css('background-color') == color
    && !(arr.includes(arr[i]+position)) && (modValue != 0)){
    arr.push(arr[i]+position)
    return true;
  }
}


//Function to reset the the table to the beginning
function reset(){
  redArray = [];
  blueArray = [];
  turn = 0;
  gameOver = false;
  colorArray = document.querySelectorAll("td");
  for(var i = 0; i < colorArray.length; i++){
    colorArray[i].style.backgroundColor = "black";
    }
  $('h1').text("Connect 6 to win!");
  $('h1').removeClass('player-blue player-red');
  }

//Initiate the reset button to clear the board
function resetBtn(){
  btn = document.querySelector('button');
  btn.addEventListener('click', (e) => {
    reset();
    initiate();
  })
}
resetBtn();
