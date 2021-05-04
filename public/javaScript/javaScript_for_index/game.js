// 
import {playerSpeed, reset as resetPlayer, update as updatePlayer, draw as drawPlayer} from "./player.js";
import {life, score, reset as resetFood, update as updateObstacle, draw as drawObstacle} from "./food.js";
import {reset as resetInput} from "./input.js";

let game_board = document.getElementById("game-container");
let gameOverBoard = document.getElementById("gameOverBoard");
let gameIntro = document.getElementById("gameIntro");
let previousTime = 0;
let gameOver = false;

window.startGame = startMyGame;

function startMyGame() {
    window.requestAnimationFrame(main);

    gameOver = false;
    gameOverBoard.style.display = "none";
    game_board.style.display = "grid";
    gameIntro.style.display = "none";
    document.getElementById("header-nav").style.display = "none";
}

window.refeshGame = refesh;

function refesh() {
    window.requestAnimationFrame(main);

    resetPlayer();
    resetFood();
    resetInput();
    gameOver = false;
    gameOverBoard.style.display = "none";
    game_board.style.display = "grid";
    gameIntro.style.display = "none";
    document.getElementById("header-nav").style.display = "none";   
}

window.closeGame = closeGame;

function closeGame() {
    window.location.reload();
}

function main(currentTime) {
    if (gameOver == true) {
        // console.log("Game Over");
        gameOverBoard.style.display = "flex";
        document.getElementById("scoreboard").innerHTML = "Score: " + score;
        game_board.style.display = "none";
        return;
    }
    window.requestAnimationFrame(main);
    
    const lastRender = (currentTime - previousTime) / 1000;
    
    if(lastRender < (1 / playerSpeed)) return;
    
    previousTime = currentTime;
    
    update();
    draw();
    playerLife();
    playerScore();
}


function update() {
    updateObstacle();
    updatePlayer();
}

function draw() {
    game_board.innerHTML = "";
    drawObstacle(game_board);
    drawPlayer(game_board);
}

export function endGame() {
    gameOver = true;
}

function playerScore() {
    let score_board = document.createElement("DIV");
    score_board.style.gridRowStart = "2";
    score_board.style.gridColumnStart = "34";
    score_board.classList.add("dash-board");
    score_board.classList.add("rounded");
    score_board.innerHTML = "Score " + score;
    game_board.appendChild(score_board);
}

function playerLife() {
    let playerLife = document.createElement("DIV");
    playerLife.style.gridRowStart = "2";
    playerLife.style.gridColumnStart = "2";
    playerLife.classList.add("dash-board");
    playerLife.classList.add("rounded");
    playerLife.innerHTML = "Life " + life;
    game_board.appendChild(playerLife);
}