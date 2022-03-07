const theBoard = document.getElementsByClassName("gameBoard")[0];
const restartButton = document.getElementById("btnRestart");
const startButton = document.getElementById("btnStart");
const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");
let winner;
let currentMark = "X";

const gameBoard = (() => {
    let board =  
    [
    ["","",""],
    ["","",""],
    ["","",""]
    ]
    return {board}
})();


const Player = (name, mark) => {
    return {
        name,
        mark
    }
}


const findTheWinner = (row, position, PlayerOne, PlayerTwo) => {
    console.log(PlayerOne);
    console.log(PlayerTwo);
    let win = false;
    let winnerMark;
    //check if draw 
  
    //check on row
    if(gameBoard.board[row][0] === gameBoard.board[row][1] && gameBoard.board[row][0] === gameBoard.board[row][2]) {
        if (gameBoard.board[row][0] !== ""){
        winnerMark = gameBoard.board[row][0];
        win = true;
        }
    }
    //check on diag
    if(gameBoard.board[0][0] === gameBoard.board[1][1] && gameBoard.board[0][0] === gameBoard.board[2][2]) {
        if (gameBoard.board[0][0] !== ""){
            winnerMark = gameBoard.board[0][0];
            win = true;
            }
    }
    //check on diag
    if(gameBoard.board[2][0] === gameBoard.board[1][1] && gameBoard.board[2][0] === gameBoard.board[0][2]) {
        if (gameBoard.board[2][2] !== ""){
            winnerMark = gameBoard.board[2][2];
            win = true;
            }
    }
    //check on columns
    if(gameBoard.board[0][position] === gameBoard.board[1][position] && gameBoard.board[row][position] === gameBoard.board[2][position]){
        if (gameBoard.board[0][position] !== ""){
            winnerMark = gameBoard.board[0][position];
            win = true;
            }
    }

    if (!gameBoard.board[0].includes("") && !gameBoard.board[1].includes("") && !gameBoard.board[2].includes(""))
    {
        alert("DRAW");
        return 0;
    }

    //winner alert
    if (win) {
        if (PlayerOne.mark === winnerMark) {
            alert(`${PlayerOne.name} wins`);
            return 1;
        }

        alert(`${PlayerTwo.name} wins`);
        return 2;
    }
};


const changePlayer = (currentMark, PlayerOneMark, PlayerTwoMark) => {
    if (currentMark === PlayerOneMark) return PlayerTwoMark;
    return PlayerOneMark;
};


//loop through the board

const render = (PlayerOne, PlayerTwo) => {
    for (let row = 0;row < gameBoard.board.length; row++){
        for (let id = 0; id < gameBoard.board[row].length ; id++){
            //Create a square
          const square = document.createElement("div");
          square.classList.add("square");
          square.id = `square-${row + 1}-${id + 1}`;
          //click event for square
          square.addEventListener("click", ()=> {
              //Do nothing if the square already marked
              if (winner) return
              if (square.textContent === " ") return
              square.textContent = currentMark;
              gameBoard.board[row][id] = currentMark;
              winner = findTheWinner(row, id, PlayerOne, PlayerTwo);
              currentMark = changePlayer(currentMark, PlayerOne.mark, PlayerTwo.mark);
          });
    
          theBoard.appendChild(square);
        }
    }}



const reset = (PlayerOne, PlayerTwo) => {
        //reset the object
        gameBoard.board = [
            ["","",""],
            ["","",""],
            ["","",""]
            ]
        //re-render the board
        while (theBoard.firstChild) {
            theBoard.removeChild(theBoard.lastChild)
        }
        render(PlayerOne, PlayerTwo)
    }
    
    startButton.addEventListener("click", () => {
        const PlayerOne = Player(playerOneName.value, "X");
        const PlayerTwo = Player(playerTwoName.value, "O");
        reset(PlayerOne, PlayerTwo)
        restartButton.classList.remove("hide")

    });
    
    
    
    
    
    
    //reset button 
    restartButton.addEventListener("click", reset)


