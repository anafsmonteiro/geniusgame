let order = []; 
let playerOrder = []; 
let flash; 
let turn;
let good; 
let compTurn; 
let intervalId;
let noise = true;
let win;
let start = false;

const turnoTela = document.querySelector("#turno");
const topoEsquerdo = document.querySelector("#topoEsquerdo");
const topoDireito = document.querySelector("#topoDireito");
const baseEsquerda = document.querySelector("#baseEsquerda");
const baseDireita = document.querySelector("#baseDireita");
const botaoStart = document.querySelector("#start");

function BotaoStart () {
            play();
    }

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnoTela.innerHTML = 1;
    good = true;
    for (let i = 0; i < 20; i++) {
      order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;
  
    intervalId = setInterval(gameTurn, 800);
  }

  function gameTurn() {
    start = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        start = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) um();
            if (order[flash] == 2) dois();
            if (order[flash] == 3) tres();
            if (order[flash] == 4) quatro();
            flash++;
        }, 200);
    }
}

function um() {
    noise = true;
    topoEsquerdo.style.backgroundColor = "lightgreen";
}

function dois() {
    noise = true;
    topoDireito.style.backgroundColor = "tomato";
}

function tres() {
    noise = true;
    baseEsquerda.style.backgroundColor = "yellow";
}

function quatro() {
    noise = true;
    baseDireita.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topoEsquerdo.style.backgroundColor = "darkgreen";
    topoDireito.style.backgroundColor = "darkred";
    baseEsquerda.style.backgroundColor = "goldenrod";
    baseDireita.style.backgroundColor = "darkblue";
}

function flashColor() {
    topoEsquerdo.style.backgroundColor = "lightgreen";
    topoDireito.style.backgroundColor = "tomato";
    baseEsquerda.style.backgroundColor = "yellow";
    baseDireita.style.backgroundColor = "lightskyblue";
}

topoEsquerdo.addEventListener('click', (event) => {
    if (start) {
        playerOrder.push(1);
        check();
        um();
        if (!win) {
            setTimeout(() => {
                clearColor;
            }, 300);
        }
    }
})

topoDireito.addEventListener('click', (event) => {
    if (start) {
        playerOrder.push(2);
        check();
        dois();
        if (!win) {
            setTimeout(() => {
                clearColor;
            }, 300);
        }
    }
})

baseEsquerda.addEventListener('click', (event) => {
    if (start) {
        playerOrder.push(3);
        check();
        tres();
        if (!win) {
            setTimeout(() => {
                clearColor;
            }, 300);
        }
    }
})

baseDireita.addEventListener('click', (event) => {
    if (start) {
        playerOrder.push(4);
        check();
        quatro();
        if (!win) {
            setTimeout(() => {
                clearColor;
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good) {
        winGame();
    }
    if (good == false) {
        flashColor();
        turnoTela.innerHTML = "NO!";
        setTimeout(() => {
            turnoTela.innerHTML = turn;
            clearColor();
            if (start) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnoTela.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800)
    }
}

function winGame() {
    flashColor();
    turnoTela.innerHTML = "WIN!";
    start = false;
    win = true;
}