/**@author Olga BAITEMIROVA 52191 */

let fruits = [];
let nbFruits = 0;   // quantity of fruits on the board
let index;          // index of eaten item
let score = 0;      // total score
let appleScore = 0;
let over = false;
let loop;
let growing;
let growingScore;


function start() {
    loop = setInterval(game, 1000/5);
    growing = setInterval(biggerSnake, 5000);
}

function randomSquare() {
    return Math.floor((Math.random()*15)+1);
}

/** used to add items on board */
function randomValue(max) {
    return Math.floor((Math.random()*max)+1);
}

function getRandomFruit() {
    return "square(" + randomSquare() + ";" + randomSquare() + ")";
}

/** Returns the head's Id (row, column) */
function getHeadSquareId() {
    return "square(" + snake.head_.row_ + ";" + snake.head_.column_ + ")";
}

/** Returns the tail's Id (row, column) */
function getTailSquareId(t) {
    return "square(" + snake.tail_[t].row_ + ";" + snake.tail_[t].column_ + ")";
}

/** The snake's head is on the same square than the fruit */
function isRedAppleGetEaten() {
    if (fruits.includes(getHeadSquareId())) {
        index = getHeadSquareId();
    }
    return fruits.includes(getHeadSquareId());
}


/** Item can't appear on the snake */
function isItemOnSnake(id_) {
    for (let i = 0; i < snake.tail_.length; i++) {
        if (getTailSquareId(i) == id_) {
            return true;
        }
    }
    return false;
}

function fruitToTrash() {
    let temp = fruits[fruits.length-1];
    fruits[fruits.length-1] = fruits[fruits.indexOf(index)];
    fruits[index] = temp;
    let eatenFruit = fruits.pop();
}

/** Aach part takes the next postion */
function moveTail() {
    for (let i = 0; i < snake.tail_.length ; i++) {
        snake.tail_[i] = snake.tail_[i+1];
        swivel[i] = swivel[i+1];
    }
}


/** When the head is in the same square than tail*/
 
function isGameOver() {
    for (let i = 0; i < snake.tail_.length; i++) {
        if (getTailSquareId(i) == getHeadSquareId()) { 
            over = true;
        }
    }
}

/**
 * returns true if the snake can cross the wall and false if it can't
 * it depends on the player's choice
 */
function crossWalls() {
    return false;
}

/** The snakes grows after 5 seconds with a new position and a new part of the tail */
function growingSnake() {
    snake.tail_.push(new Position(snake.tail_[snake.tail_.length-1].row_, snake.tail_[snake.tail_.length-1].column_));
    swivel.push(snake.direction_);
}

function biggerSnake() {
    score+=10;
    growingSnake();
}

function game() {
    let prevTailSquare = "square(" + snake.tail_[0].row_ + ";" + snake.tail_[0].column_ + ")";
    displayScore(score);
    snake.move();
    isGameOver();
    if (!over) {
        displaySnake();
        displayTail();
        clearTailSquare(prevTailSquare);

        /** Only 3 fruits on the board to avoid clutter 
         * When the snake eats a red apple it grows and brings 50 points
        */
        if (randomValue(10) == 7 && nbFruits < 3) {
            let item = new Fruit(new Position(randomSquare(), randomSquare()));
            if (!(fruits.includes("square(" + item.position_.row_ + ";" + item.position_.column_ + ")")) && 
                !(isItemOnSnake("square(" + item.position_.row_ + ";" + item.position_.column_ + ")"))) {
                    fruits.push("square(" + item.position_.row_ + ";" + item.position_.column_ + ")");
                    displayFruit();
                    nbFruits++;
            }
        }
        if (isRedAppleGetEaten()){
            growingSnake();
            fruitToTrash();
            score+=50;    // for each eaten apple
            appleScore++;
            displayAppleScore(appleScore);
            nbFruits--;
        }
    }

    else {
        stopGame();
        setTimeout(replaceHead, 1000/100);
        displayGameOver();
    }
}

function stopGame() {
    clearInterval(loop);
    clearInterval(growing);
    clearInterval(growingScore);
    updateScore();
}

