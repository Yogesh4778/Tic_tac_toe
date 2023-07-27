const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; /*for giving turns*/

const winningPositions = [
 [0,1,2],
 [3,4,5],
 [6,7,8],
 [0,3,6],
 [1,4,7],
 [2,5,8],
 [0,4,8],
 [2,4,6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];  
    
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; //set pointer event true
        //one more thing is missing, initialise box with css properties again (to remove green color)
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -${currentPlayer}`;

}

initGame();

function swapTurn() {
    if(currentPlayer == "O"){
        currentPlayer = "X";
    }
    else
    currentPlayer = "O";

    //UI Update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver(){
  let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {
          
            //check if winner is X
            if(gameGrid[position[0]] === "X")
            answer = "X";

            else
            answer = "O";

            //disable pointer events after we get winner
            boxes.forEach((box) => {
             box.style.pointerEvents = "none";     
            })

            //now  we know X/O winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //we know , no winner found , let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });

    //board is filled, game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //empty box pr current player ko put kiya at UI
        gameGrid[index] = currentPlayer; //changing gamegrid we made above line 22 for checking current status of game
        boxes[index].style.pointerEvents = "none"; //cursor pointer remove after we put value
        //swap karo turn ko
        swapTurn();
        //check kro koi jit to nhi gya
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);