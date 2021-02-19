/**@author Olga BAITEMIROVA 52191 */

/**Creates div for each square with id --> square(row,column) */
function displayBoard(){
    for (let i=1; i<=15; i++) {
        for (let j=1; j<=15; j++) {
            $(".board").append(
                $("<div>").attr("id", "square("+i+";"+j+")").css({
                    "grid-template-rows": i+"/"+i+1,
                    "grid-template-columns": j+"/"+j+1,
                })
              );
        }
    }   
}

/** Displays the snake's head on the board */
function displaySnake() {
    switch(snake.direction_) {
        case "W":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headW.png')";
            document.getElementById(getHeadSquareId()).style.backgroundSize = "100%";
            break;
        case "N":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headN.png')";
            document.getElementById(getHeadSquareId()).style.backgroundSize = "100%";
            break;
        case "E":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headE.png')";
            document.getElementById(getHeadSquareId()).style.backgroundSize = "100%";
            break;
        case "S":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headS.png')";
            document.getElementById(getHeadSquareId()).style.backgroundSize = "100%";
            break;
    }
}

/** The previous head's square id is replaced by the tail */
function displayTail() {
    if (snake.tail_.length > 1) {
        /**tail */
        if (snake.tail_[0].row_ == snake.tail_[1].row_ && snake.tail_[0].column_ < snake.tail_[1].column_) {
            document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailE.png')";
            document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
        }
        else if (snake.tail_[0].row_ == snake.tail_[1].row_ && snake.tail_[0].column_ > snake.tail_[1].column_) {
            document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailW.png')";
            document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
        }
        else if (snake.tail_[0].column_ == snake.tail_[1].column && snake.tail_[0].row_ < snake.tail_[1].row_) {
            document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailS.png')";
            document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
        }
        else if (snake.tail_[0].column_ == snake.tail_[1].column && snake.tail_[0].row_ > snake.tail_[1].row_) {
            document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailN.png')";
            document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
        }

        /**main tail (body)*/
        for (let i = 1; i < snake.tail_.length-1; i++) {
            if (snake.tail_[i-1].row_ == snake.tail_[i+1].row_ && (snake.tail_[i-1].column_ < snake.tail_[i+1].column_ ||
                snake.tail_[i-1].column_ > snake.tail_[i+1].column_)) {
                    document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/bodyWE.png')";
                    document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
            }
            else if (snake.tail_[i-1].column_ == snake.tail_[i+1].column_ && (snake.tail_[i-1].row_ < snake.tail_[i+1].row_ ||
                     snake.tail_[i-1].row_ > snake.tail_[i+1].row_)) {
                        document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/bodyNS.png')";
                        document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
            }
            else {
                addPivot(i);
            }

        }
        /**('neck')*/
        if (swivel[swivel.length-2] == snake.direction_) {
            switch (snake.direction_) {
                case "W":
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyWE.png')";
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
                    break;
                case "N":
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyNS.png')";
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
                    break;
                case "E":
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyWE.png')";
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
                    break;
                case "S":
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyNS.png')";
                    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
                    break;
            }

        }
        else {
            addNeckPivot();
        }
    }
    else{
        switch (snake.direction_) {
            case "W":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailW.png')";
                document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
                break;
            case "N":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailN.png')";
                document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
                break;
            case "E":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailE.png')";
                document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
                break;
            case "S":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailS.png')";
                document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
                break;
        }
    }
}

function displayFruit() {
    document.getElementById(fruits[fruits.length-1]).style.backgroundImage = "url('images/redApple.png')";
    document.getElementById(fruits[fruits.length-1]).style.backgroundSize = "100%";
}

function displayAppleScore(score) {
    document.getElementById("appleNB").textContent = score;
}

function displayScore(score) {
    document.getElementById("scoreNB").textContent = score;
}

function displayHighScore() {
    if (localStorage.getItem("scoreNB") == null) {
        document.getElementById("highScore").textContent = 0;
    }
    else {
        document.getElementById("highScore").textContent = localStorage.getItem("scoreNB");
    }
}

function clearTailSquare(prevTailSquareId) {
    document.getElementById(prevTailSquareId).style.backgroundSize = 0;
}

function displayGameOver() {
    document.getElementById("gameOverWindow").style.opacity = "1";
    document.getElementById("button").disabled = false;
}

function replaceHead() {
    switch (snake.direction_) {
        case "W":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverW.png')";
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
            break;
        case "N":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverN.png')";
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
            break;
        case "E":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverE.png')";
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
            break;
        case "S":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverS.png')";
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
            break;
    }
}

function addPivot(i) {
    if ((swivel[i-1] == "W" && swivel[i+1] == "S") || (swivel[i-1] == "N" && swivel[i+1] == "E")) {
            document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot1.png')";
            document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
    }
    else if((swivel[i-1] == "E" && swivel[i+1] == "N") || (swivel[i-1] == "S" && swivel[i+1] == "W")) {
                document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot2.png')";
                document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
    }
    else if ((swivel[i-1] == "E" && swivel[i+1] == "S") || (swivel[i-1] == "N" && swivel[i+1] == "W")) {
                document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot3.png')";
                document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
    }
    else if ((swivel[i-1] == "S" && swivel[i+1] == "E") || (swivel[i-1] == "W" && swivel[i+1] == "N")) { 
        document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot4.png')";
        document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
    }
}

function addNeckPivot() {
    if ((swivel[snake.tail_.length-2] == "W" && snake.direction_ == "S") || (swivel[snake.tail_.length-2] == "N" && snake.direction_ == "E")) {
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot1.png')";
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
    }
    else if ((swivel[snake.tail_.length-2] == "E" && snake.direction_ == "N") || (swivel[snake.tail_.length-2] == "S" && snake.direction_ == "W")) {
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot2.png')";
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
    }
    else if ((swivel[snake.tail_.length-2] == "E" && snake.direction_ == "S") || (swivel[snake.tail_.length-2] == "N" && snake.direction_ == "W")) {
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot3.png')";
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
    }
    else if ((swivel[snake.tail_.length-2] == "S" && snake.direction_ == "E") || (swivel[snake.tail_.length-2] == "W" && snake.direction_ == "N")) {
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot4.png')";
        document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
    }
}
