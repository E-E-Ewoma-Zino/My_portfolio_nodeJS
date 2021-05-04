import { getInput } from "./input.js"

export let playerSpeed = 5;
export let stopPlayer = false;


export let game_obj = {
    x: 20,
    y: 34
};

export function continueMovement() {
    stopPlayer = false
}

export function controlPlayerSpeed(speed) {
    playerSpeed = speed;
}

export function update() {
    // console.log("Updating Player");

    const inputDirection = getInput();
    if (game_obj.x < 4 && getInput().x < 1) {
        // console.log(`less than 1 true`);
        return;
    }

    if (game_obj.x > 36 && getInput().x > 0) {
        // console.log(`greater thasn 1 true`);
        return;
    }

    // console.log(`direction ${game_obj.x}`);
    game_obj.x += inputDirection.x;
}

export function draw(game_board) {
    // console.log("Drawing Player");
    let obj = document.createElement("DIV");
    obj.style.gridColumnEnd = game_obj.x;
    obj.classList.add("obj");
    game_board.appendChild(obj);
}

export function reset() {
    playerSpeed = 5;
    stopPlayer = false;

    game_obj = {
        x: 20,
        y: 34
    };
}