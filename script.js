const theBoard = document.getElementsByClassName("gameBoard")[0];
const restartButton = document.getElementById("btnRestart");
const startButton = document.getElementById("btnStart");
const playerOneName = document.querySelector("#playerOneName");
const playerTwoName = document.querySelector("#playerTwoName");
const infomation = document.querySelector("#information");


let winner;
let currentMark = "X";
let  playWithBot = false;

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
        if (gameBoard.board[2][0] !== ""){
            winnerMark = gameBoard.board[2][2];
            win = true;
            }
    }
    //check on columns
    if(gameBoard.board[0][position] === gameBoard.board[1][position] && gameBoard.board[0][position] === gameBoard.board[2][position]){
        if (gameBoard.board[0][position] !== ""){
            winnerMark = gameBoard.board[0][position];
            win = true;
            }
    }

    if (!gameBoard.board[0].includes("") && !gameBoard.board[1].includes("") && !gameBoard.board[2].includes(""))
    {
        information.textContent = `DRAW`;
        return 0;
    }

    //winner alert
    if (win) {
        if (PlayerOne.mark === winnerMark) {
            information.textContent = `${PlayerOne.name} wins`;
            return 1;
        }

        information.textContent = `${PlayerTwo.name} wins`;
        return 2;
    }
};


const changePlayer = (PlayerOneMark, PlayerTwoMark) => {
    if (currentMark === PlayerOneMark) {
        currentMark = PlayerTwoMark;
        return;
    };
    currentMark = PlayerOneMark;
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
              if (square.textContent !== "") return
              square.textContent = currentMark;
              gameBoard.board[row][id] = currentMark;
              winner = findTheWinner(row, id, PlayerOne, PlayerTwo);
              changePlayer(PlayerOne.mark, PlayerTwo.mark);
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
        winner = false;
        currentMark = "X";
        render(PlayerOne, PlayerTwo);
        infomation.textContent = "Playing"
    }
    


    startButton.addEventListener("click", () => {
        //create 2 players
        if (!playerOneName.value || !playerTwoName.value) {
            alert("Please type two players's names");
            return
        }
        const PlayerOne = Player(playerOneName.value, "X");
        const PlayerTwo = Player(playerTwoName.value, "O");
        //set event for the restart button, do it in start button because the restart only shows when we press the start button
        restartButton.addEventListener("click", () => {
            reset(PlayerOne, PlayerTwo)
        })
        reset(PlayerOne, PlayerTwo)
        restartButton.classList.remove("hide");
        infomation.classList.remove("hide");

    });
    
    
    
    
    
    
    //reset button 
   


