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
            break;
        case "N":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headN.png')";
            break;
        case "E":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headE.png')";
            break;
        case "S":
            document.getElementById(getHeadSquareId()).style.backgroundImage = "url('images/headS.png')";
            break;
    }
    document.getElementById(getHeadSquareId()).style.backgroundSize = "100%";
}

/** The previous head's square id is replaced by the tail */
function displayTail() {
    if (snake.tail_.length > 1) {
        tailPart();
        bodyPart();
        neckPart();
    }
    else{
        switch (snake.direction_) {
            case "W":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailW.png')";
                break;
            case "N":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailN.png')";
                break;
            case "E":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailE.png')";
                break;
            case "S":
                document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailS.png')";
                break;
        }
        document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
    }
}

function tailPart() {
    if (snake.tail_[0].row_ == snake.tail_[1].row_ && snake.tail_[0].column_ < snake.tail_[1].column_) {
        document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailE.png')";
    }
    else if (snake.tail_[0].row_ == snake.tail_[1].row_ && snake.tail_[0].column_ > snake.tail_[1].column_) {
        document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailW.png')";
    }
    else if (snake.tail_[0].column_ == snake.tail_[1].column && snake.tail_[0].row_ < snake.tail_[1].row_) {
        document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailS.png')";
    }
    else if (snake.tail_[0].column_ == snake.tail_[1].column && snake.tail_[0].row_ > snake.tail_[1].row_) {
        document.getElementById(getTailSquareId(0)).style.backgroundImage = "url('images/tailN.png')";
    }
    document.getElementById(getTailSquareId(0)).style.backgroundSize = "100%";
}

function bodyPart() {
    for (let i = 1; i < snake.tail_.length-1; i++) {
        if (snake.tail_[i-1].row_ == snake.tail_[i+1].row_ && (snake.tail_[i-1].column_ < snake.tail_[i+1].column_ ||
            snake.tail_[i-1].column_ > snake.tail_[i+1].column_)) {
                document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/bodyWE.png')";
        }
        else if (snake.tail_[i-1].column_ == snake.tail_[i+1].column_ && (snake.tail_[i-1].row_ < snake.tail_[i+1].row_ ||
                 snake.tail_[i-1].row_ > snake.tail_[i+1].row_)) {
                    document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/bodyNS.png')";
        }
        else {
            addPivot(i);
        }
        document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
    }
}

function neckPart() {
    if (swivel[swivel.length-2] == snake.direction_) {
        if (snake.direction_ == "W" || snake.direction_ == "E") {
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyWE.png')";
        } else if (snake.direction_ == "N" || snake.direction_ == "S") {
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/bodyNS.png')";
        }
    }
    else {
        addNeckPivot();
    }
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
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
            break;
        case "N":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverN.png')";
            break;
        case "E":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverE.png')";
            break;
        case "S":
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/headOverS.png')";
            break;
    }
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundColor = "brown";
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.borderBottomRightRadius = "50px 46px";
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.borderBottomLeftRadius = "30px 50px";
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.borderTopLeftRadius = "70px 40px";
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.borderTopRightRadius = "30px 60px";
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
}

function addPivot(i) {
    let pivot1 = (swivel[i-1] == "W" && swivel[i+1] == "S") || (swivel[i-1] == "N" && swivel[i+1] == "E");
    let pivot2 = (swivel[i-1] == "E" && swivel[i+1] == "N") || (swivel[i-1] == "S" && swivel[i+1] == "W");
    let pivot3 = (swivel[i-1] == "E" && swivel[i+1] == "S") || (swivel[i-1] == "N" && swivel[i+1] == "W");
    let pivot4 = (swivel[i-1] == "S" && swivel[i+1] == "E") || (swivel[i-1] == "W" && swivel[i+1] == "N");
    addImagePivot(i, pivot1, pivot2, pivot3, pivot4);
}
function addImagePivot(i, pivot1, pivot2, pivot3, pivot4) {
    switch(true) {
        case pivot1: 
            document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot1.png')";
            break;
        case pivot2:
            document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot2.png')";
            break;
        case pivot3:
            document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot3.png')";
            break;
        case pivot4:
            document.getElementById(getTailSquareId(i)).style.backgroundImage = "url('images/pivot4.png')";
    }
    document.getElementById(getTailSquareId(i)).style.backgroundSize = "100%";
}

function addNeckPivot() {
    let neckPivot1 = (swivel[snake.tail_.length-2] == "W" && snake.direction_ == "S") || (swivel[snake.tail_.length-2] == "N" && snake.direction_ == "E");
    let neckPivot2 = (swivel[snake.tail_.length-2] == "E" && snake.direction_ == "N") || (swivel[snake.tail_.length-2] == "S" && snake.direction_ == "W");
    let neckPivot3 = (swivel[snake.tail_.length-2] == "E" && snake.direction_ == "S") || (swivel[snake.tail_.length-2] == "N" && snake.direction_ == "W");
    let neckPivot4 = (swivel[snake.tail_.length-2] == "S" && snake.direction_ == "E") || (swivel[snake.tail_.length-2] == "W" && snake.direction_ == "N");
    addImageNeckPivot(neckPivot1, neckPivot2, neckPivot3, neckPivot4);
}

function addImageNeckPivot(neckPivot1, neckPivot2, neckPivot3, neckPivot4) {
    switch(true) {
        case neckPivot1: 
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot1.png')";
            break;
        case neckPivot2:
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot2.png')";
            break;
        case neckPivot3:
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot3.png')";
            break;
        case neckPivot4:
            document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundImage = "url('images/pivot4.png')";
    }
    document.getElementById(getTailSquareId(snake.tail_.length-1)).style.backgroundSize = "100%";
}
