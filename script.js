let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".resetbtn");
let newButton = document.querySelector(".newbtn");
let info = document.querySelector(".hide");
let infoMsg = document.querySelector(".msg");
const turnDisplay = document.querySelector(".turn");
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
let currentTurn = "X"; // Variable to track the current turn
let turn = true;


//Main game logic
boxes.forEach ((box) => {
    box.addEventListener("click" , () => {
        if (turn){
            box.innerText = "x";
            box.style.color="black";
            turn = false;
        } else {
            box.innerText ="O";
            box.style.color="red";
            turn = true;
        }
      box.classList.add("disabled");//if one time button pressed then it will disabled the button
       if(checkWinner()){
           return;//check winner function by calling them if the check winner is true then checkdraw dont work in no the check draw work 
       }
       else{
           checkDraw();
        } 
        currentTurn = currentTurn === "X" ? "O" : "X";
         updateTurnDisplay(); // Update the turn display 
    });
});



// Update turn display function
const updateTurnDisplay = () => {
    turnDisplay.innerText = `${currentTurn}'s Turn`;
};
updateTurnDisplay();// Initial update



// funcion for checking winner by given patterns
const checkWinner = () => {
    for(let pattern of winPatterns){
      
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if( pos1 !=="" && pos2 !=="" && pos3 !==""){
            if(pos1===pos2 && pos2===pos3 && pos3===pos1){      
                showWinner(pos1 , pattern);
                disableBoxes();              
                return true;
            }
        }
    }
    return false;
}

// for showing winner information
const showWinner = (winner , pattern) => {
    infoMsg.innerHTML = `<span id="win">${winner}</span> 's Winner`;
    let winnerStyle = document.querySelector("#win");
    winnerStyle.style.fontFamily = "Permanent Marker";
    winnerStyle.style.fontSize = "7vh";
    winnerStyle.style.color = "red";
    info.classList.remove("hide");
    reset.classList.add("hide");
    turnDisplay.classList.add("hide"); 

    pattern.forEach ((index) => {
        boxes[index].style.backgroundColor = "#ffca67"; // Set background color for winning boxes
        boxes[index].style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.7)"; // Add text shadow
    });
} 

 // funcion for disable box after winner find
 const disableBoxes = () => {
    for(let box of boxes ){
        box.classList.add("disabled");
        
    }
}

// funcion if there is no winner then to give draw 
const checkDraw = () => {
    let isDraw = true;
    boxes.forEach ((box) => {
        if ( box.innerText === "" ){
         isDraw = false;
        }   
    });
    if(isDraw){ 
        showDraw();
        
    }
}

const showDraw = () => {
    infoMsg.innerText = "Draw!";
    info.classList.remove("hide");
    reset.classList.add("hide");
    turnDisplay.classList.add("hide"); 

}

// function for reset and new button work 
let button = () => {
    boxes.forEach ((box) => {
        turn = true;
        box.innerText = "";
        box.classList.remove("disabled");
        reset.classList.remove("hide");
        turnDisplay.classList.remove("hide");
        box.style.backgroundColor = ""; // Reset background color
        box.style.textShadow = ""; // Reset text shadow          
    })
    currentTurn = "X"; // Reset to "X" turn
    updateTurnDisplay(); // Update the turn display to show the first turn
    info.classList.add("hide");//when button click congratulation was removed
}


reset.addEventListener("click" , button);
newButton.addEventListener("click" , button);









