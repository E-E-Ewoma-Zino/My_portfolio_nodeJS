// 
import { continueMovement as move } from "./player.js";

let nav_link = document.getElementsByClassName("no-line");

let inputDirection = {
    x: 0,
}

export function getInput() {
    return inputDirection;
}

window.addEventListener("keydown", e => {

    // console.log(e.key);
    switch (e.key) {
        case "ArrowRight":
            inputDirection.x = 1;
            move();
            break;
        case "ArrowLeft":
            inputDirection.x = -1;
            move();
            break;
        default:
            break;
    }
});

window.addEventListener("click", myEvent => {
    console.log(myEvent.offsetX);
    if (myEvent.offsetX > (window.screen.width / 2).toFixed(1)) {
        inputDirection.x = 1;
        move();
    }
    else if (myEvent.offsetX < (window.screen.width / 2).toFixed(1)) {
        inputDirection.x = -1;
        move();
    }
});

export function reset() {
    inputDirection = {
        x: 0,
    };
}