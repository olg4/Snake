/**@author Olga BAITEMIROVA 52191 */

let currentPosition = new Position(randomSquare(), randomSquare());
let snake = new Snake(currentPosition,"S", [new Position(currentPosition.row_-1, currentPosition.column_)]);
let swivel = [snake.direction_];
let kb = 40;    // default direction of the snake (South) at the beginning
let vertical = [38, 40];    
let horizontal = [37, 39];

function snake_direction(event) {
    let arrow = event.which || event.keyCode;

    //deactivate the keyboard
    if (over) {
        arrow = 0;
    }
    //the snake can't rotate 180°
    if (arrow!=kb && (vertical.includes(arrow) && !(vertical.includes(kb))) || (horizontal.includes(arrow) 
        && !(horizontal.includes(kb)))) {
        switch(arrow) {
            case 37:
                //console.log("left");
                snake.direction_ = "W";
                kb = 37;
                break;
            case 38:
                //console.log("up");
                snake.direction_ = "N";
                kb = 38;
                break;
            case 39:
                //console.log("right");
                snake.direction_ = "E";
                kb = 39;
                break;
            case 40:
                //console.log("down");
                snake.direction_ = "S";
                kb = 40;
                break;
        }
    }
    else {
        //console.log("none");
    }

}

