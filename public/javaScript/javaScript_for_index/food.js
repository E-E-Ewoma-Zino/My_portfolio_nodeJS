import { controlPlayerSpeed, game_obj as player } from "./player.js";
import { endGame } from "./game.js";

export let foodSpeed = 17;
export let life = 3;
export let score = 0;

let foodNum = 0;
let missFood = false;
let eatHealth = false;
let hasHealthBeenTaken = [false, false, false, false, false];
let waitForFood = false;

let food = [
    {
        x: Math.floor(Math.random() * 35) + 1,
        y: 1
    },
];

let health = {
    x: Math.floor(Math.random() * 35) + 1,
    y: -1
};

export function update() {
    // console.log("Updating Obstacle");

    for (let i = 0; i < food.length; i++) {
        food[i].y += 1;
    }

    if (eatHealth == true && waitForFood == true) {
        console.log(`eat health at a ${eatHealth}`);
        health.y += 1;
    }


    add(foodNum, foodSpeed);
    eat();
    missed();
    loose();
    gainHealth();
    gameManager();
    // console.log("food length " + food.length);
}

export function draw(game_board) {
    // console.log("Drawing Obstacle");
    food.forEach(index => {
        let obj = document.createElement("DIV");
        obj.style.gridRowStart = index.y;
        obj.style.gridColumnStart = index.x;
        for (let i = 0; i < food.length; i++) {
            // console.log(i);
        }
        // if (index == food[food.length - 1]) {
        //     obj.style.backgroundColor = "red";
        // }
        obj.classList.add("food");
        obj.classList.add("my-rounded");
        game_board.appendChild(obj);
    });

    let obj2 = document.createElement("DIV");

    obj2.style.gridColumnStart = health.x;
    obj2.style.gridRowStart = health.y;
    obj2.style.backgroundColor = "green";
    game_board.appendChild(obj2);
}

function foodCond1(j) {
    // 20 / 35
    return (player.x - 1) == food[j].x && player.y == food[j].y;
} function foodCond2(j) {
    // 19 / 35
    return (player.x - 2) == food[j].x && player.y == food[j].y;
} function foodCond3(j) {
    // 20 / 34
    return (player.x - 1) == food[j].x && (player.y - 1) == food[j].y;
} function foodCond4(j) {
    // 19 / 34
    return (player.x - 2) == food[j].x && (player.y - 1) == food[j].y;
} function foodCond5(j) {
    // 18 / 35
    return (player.x - 3) == food[j].x && player.y == food[j].y;
} function foodCond6(j) {
    // 18 / 34
    return (player.x - 3) == food[j].x && (player.y - 1) == food[j].y;
}

function eat() {
    for (let j = 0; j < food.length; j++) {
        // console.log(`X player ${player.x} == obj ${food[j].x}`);
        // console.log(`Y player ${player.y} == obj ${food[j].y}`);
        // console.log(`${foodCond1(j)} || ${foodCond2(j)} || ${foodCond3(j)} || ${foodCond4(j)} || ${foodCond5(j)} || ${foodCond6(j)}`);
        if (foodCond1(j) || foodCond2(j) || foodCond3(j) || foodCond4(j) || foodCond5(j) || foodCond6(j)) {
            // console.log(`player eat food`);

            food[j].x = Math.floor(Math.random() * 35) + 1;
            food[j].y = 1;
            missFood = false;
            score++;
        }
        else {
            missFood = true;
        }
    }
}

function healthCondition1() {
    return (player.x - 1) == health.x && player.y == health.y;
} function healthCondition2() {
    return (player.x - 2) == health.x && player.y == health.y;
} function healthCondition3() {
    return (player.x - 1) == health.x && (player.y - 1) == health.y;
} function healthCondition4() {
    return (player.x - 2) == health.x && (player.y - 1) == health.y;
} function healthCondition5() {
    return (player.x - 3) == health.x && player.y == health.y;
} function healthCondition6() {
    return (player.x - 3) == health.x && (player.y - 1) == health.y;
}

function gainHealth() {
    let ctn = 0;

    if (healthCondition1() || healthCondition2() || healthCondition3() || healthCondition4() || healthCondition5() || healthCondition6()) {
        // console.log(`player eat food`);
        life++;
        health.y = -1;
        console.log(`eat health at b ${eatHealth}`);
        hasHealthBeenTaken[ctn] = true;
        waitForFood = false;
        ctn++;
        setHealthFalse();
        // endGame();
    }else{
        if (health.y >= 40) {
            health.y = -1;
            setHealthFalse();
            hasHealthBeenTaken[ctn] = true;
            ctn++;
        }
    }
}

function missed() {
    for (let i = 0; i < food.length; i++) {
        if (food[i].y > 34 && missFood == true) {
            food[i].x = Math.floor(Math.random() * 35) + 1;
            food[i].y = 1;

            // console.log(`miss ${i}`);
            life--;
            missFood = false;
            break;
        }

    }
}

function loose() {
    if (life < 1) {
        endGame();
    }
}

export function reset() {
    foodSpeed = 17;
    score = 0;
    life = 3;
    missFood = false;
    eatHealth = false;
    waitForFood = false
    hasHealthBeenTaken = [false, false, false, false, false];


    food = [
        {
            x: Math.floor(Math.random() * 35) + 1,
            y: 5
        },
    ];

    health = {
        x: Math.floor(Math.random() * 35) + 1,
        y: -1
    };
}

function add(foodNum, waitNum) {
    // console.log(`Food num ${foodNum}`);
    if (food.length > foodNum) return;

    // console.log(`wait num ${waitNum}`);
    if (food[food.length - 1].y < waitNum) return;

    // console.log("Add");
    food.push(
        {
            x: Math.floor(Math.random() * 35) + 1,
            y: 1
        }
    );
}


function gameManager() {
    if (score == 5 && hasHealthBeenTaken[0] == false) {
        foodSpeed = 17;
        foodNum = 0;
        console.log(`eat health c ${eatHealth}`);
        if (food[food.length - 1].y > foodSpeed) waitForFood = true;
        setHealthToTrue();

    } else if (score == 10 && hasHealthBeenTaken[1] == false) {
        foodSpeed = 17;
        controlPlayerSpeed(10);
        console.log(`eat health d ${eatHealth}`);
        if (food[food.length - 1].y > foodSpeed) waitForFood = true;
        setHealthToTrue();
    } else if (score == 15 && hasHealthBeenTaken[2] == false) {
        foodSpeed = 17;
        controlPlayerSpeed(5);
        foodNum = 1;
        if (food[food.length - 1].y > foodSpeed) waitForFood = true;
        setHealthToTrue();
    } else if (score == 20 && hasHealthBeenTaken[3] == false) {
        foodSpeed = 17;
        foodNum = 1;
        controlPlayerSpeed(10);
        if (food[food.length - 1].y > foodSpeed) waitForFood = true;
        setHealthToTrue();
    } else if (score == 25 && hasHealthBeenTaken[4] == false) {
        foodSpeed = 17;
        foodNum = 0;
        controlPlayerSpeed(25);
        if (food[food.length - 1].y > foodSpeed) waitForFood = true;
        setHealthToTrue();
    }
}

function setHealthToTrue() {

    console.log(`eat health e ${eatHealth}`);
    eatHealth = true;
}
function setHealthFalse() {
    eatHealth = false;
    console.log(`eat health f ${eatHealth}`);

}