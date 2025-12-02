const title = document.querySelector(".title span");
const squares = document.querySelectorAll(".squares div");
const board = document.querySelector(".board");
const btn1v1 = document.getElementById("p1v1");
const btn1vai = document.getElementById("p1vai");
const x = document.querySelector(".x");
const o = document.querySelector(".o");



function checkWin(){

        if(squares[0].innerHTML == squares[1].innerHTML && squares[1].innerHTML == squares[2].innerHTML && squares[0].innerHTML != ""){
            endGame(squares[0], squares[1], squares[2]);
            finish = true;
        }
        else if(squares[3].innerHTML == squares[4].innerHTML && squares[4].innerHTML == squares[5].innerHTML && squares[3].innerHTML != ""){
            endGame(squares[3], squares[4], squares[5]);
            finish = true;
        }
        else if(squares[6].innerHTML == squares[7].innerHTML && squares[7].innerHTML == squares[8].innerHTML && squares[6].innerHTML != ""){
            endGame(squares[6], squares[7], squares[8]);
            finish = true;
        }
        else if(squares[0].innerHTML == squares[3].innerHTML && squares[3].innerHTML == squares[6].innerHTML && squares[0].innerHTML != ""){
            endGame(squares[0], squares[3], squares[6]);
            finish = true;
        }
        else if(squares[1].innerHTML == squares[4].innerHTML && squares[4].innerHTML == squares[7].innerHTML && squares[1].innerHTML != ""){
            endGame(squares[1], squares[4], squares[7]);
            finish = true;
        }
        else if(squares[2].innerHTML == squares[5].innerHTML && squares[5].innerHTML == squares[8].innerHTML && squares[2].innerHTML != ""){
            endGame(squares[2], squares[5], squares[8]);
            finish = true;
        }
        else if(squares[0].innerHTML == squares[4].innerHTML && squares[4].innerHTML == squares[8].innerHTML && squares[0].innerHTML != ""){
            endGame(squares[0], squares[4], squares[8]);
            finish = true;
        }
        else if(squares[2].innerHTML == squares[4].innerHTML && squares[4].innerHTML == squares[6].innerHTML && squares[2].innerHTML != ""){
            endGame(squares[2], squares[4], squares[6]);
            finish = true;
        }
        else{
            checkDraw();
            
        };
    };

function checkDraw(){
    if([...squares].every(box => box.innerHTML !== "")){
        squares.forEach(drawBox => {
            drawBox.style.transition = "0.6s";
            drawBox.style.border = "#eed6209f";
            drawBox.style.boxShadow = "0 0 14px #eed6209f inset";
            drawBox.style.textShadow = "0 0 10px #eed6209f";
            drawBox.style.color = "#eed6209f";
        });
        finish = true;
        title.innerHTML = "Draw!";
        let dotRepeat = setInterval(() => {
            title.innerHTML += ".";
        }, 1000);
        setTimeout(() => {
            resetGame();
            clearInterval(dotRepeat)
        }, 4000);
    };
};
let xwins = 1;
let owins = 1;
function scores(char){
    if(char === "X") {
        x.innerHTML = `X: ${xwins++}`;

    }else if(char === "O"){
        o.innerHTML = `${owins++} :O`;

    }
}

function endGame(box1, box2, box3){
    scores(box1.innerHTML);
    box1.style.transition = "0.6s";
    box1.style.border = "#0f0";
    box1.style.boxShadow = "0 0 14px #0f0 inset";
    box1.style.textShadow = "0 0 10px #0f0";
    box1.style.color = "#0f0";

    box2.style.transition = "0.6s";
    box2.style.border = "#0f0";
    box2.style.boxShadow = "0 0 14px #0f0 inset";
    box2.style.textShadow = "0 0 10px #0f0";
    box2.style.color = "#0f0";

    box3.style.transition = "0.6s";
    box3.style.border = "#0f0";
    box3.style.boxShadow = "0 0 14px #0f0 inset";
    box3.style.textShadow = "0 0 10px #0f0";
    box3.style.color = "#0f0";

    squares.forEach(box => {
        box.style.pointerEvents = "none";
    });

    title.innerHTML = `${box1.innerHTML} - Is The Winner`;

    let wait = setInterval(() => {
        title.innerHTML += ".";
    }, 1000);

    setTimeout(() => {
        clearInterval(wait)
        resetGame();
    }, 4000)
};

function resetGame(){
    squares.forEach(box => {
        box.innerHTML = "";
        box.style = "";
        box.style.pointerEvents = "auto";
    });
    turn = "X";
    title.innerHTML = "X-O Game";
};


let turn = "X";
let finish = false;

function gamePlayAi(id){

    let box = document.getElementById(id);
    let playTurn = false;
    if(box.innerHTML == "" && turn == "X" && !playTurn){
        box.innerHTML = turn;
        turn = "O";
        title.innerHTML = turn;
        playTurn = true;
        squares.forEach(div => div.style.pointerEvents = "none");
        checkWin();
        if(finish) {
            finish = false;
            return;
        };
    };
    if(playTurn){
        setTimeout(() => {
        let best = getBestMove("O");
        let block = getBestMove("X");
        if(best !== -1){
            squares[best].innerHTML = turn;
        }else if(block !== -1){
            squares[block].innerHTML = turn;
        }else if(squares[4].innerHTML === ""){
            squares[4].innerHTML = turn;
        }else{
            const empty = [...squares].filter(b => b.innerHTML == "");
            if(empty.length > 0){
                empty[Math.floor(Math.random() * empty.length)].innerHTML = turn;
            }
        };
        turn = "X";
        title.innerHTML = turn;
        squares.forEach(div => div.style.pointerEvents = "auto");
        playTurn = false;
        checkWin();
        if(finish) finish = false;
        }, 1000);
    };

};

function gamePlayFriend(id){
    let box = document.getElementById(id);
    if(box.innerHTML == "" && turn == "X"){
        box.innerHTML = turn;
        turn = "O";
        title.innerHTML = turn;
        checkWin();
        if(finish) {
            finish = false;
            return;
        };
    };
    if(box.innerHTML == "" && turn == "O"){
        box.innerHTML = turn;
        turn = "X";
        title.innerHTML = turn;
        checkWin();
        if(finish) {
            finish = false;
            return;
        };
    };
}

function getBestMove(player){
    for(let i = 0; i < squares.length; i++){
        if(squares[i].innerHTML === ""){
            squares[i].innerHTML = player;
        if(isWinner(player)){
            squares[i].innerHTML = "";
            return i;
        };
        squares[i].innerHTML = "";
        };
    };
    return -1;
};

function isWinner(player){
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return wins.some(([a,b,c]) => {
        return squares[a].innerHTML == player &&
        squares[b].innerHTML == player &&
        squares[c].innerHTML == player
    });
};

btn1v1.addEventListener("click", () => {
    board.style.display = "none";
    squares.forEach(box => {
    box.addEventListener("click", () => {
        gamePlayFriend(box.id)
    });
});
});
btn1vai.addEventListener("click", () => {
    board.style.display = "none";
    squares.forEach(box => {
    box.addEventListener("click", () => {
        gamePlayAi(box.id)
    });
});
});

