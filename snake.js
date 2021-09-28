/*Definition of the snake with its head and its direction*/
class Snake{
    
    constructor(head, direction, tail) {
        this.head = head;
        this.direction = direction;
        this.tail = tail;
    }

    
    /**The snake's position on the board */
    get head_() {
        return this.head;
    }

    /**The character of the snake's direction (North, South, West & Est) */
    get direction_() {
        return this.direction;
    }

    get tail_() {
        return this.tail;
    }

    set head_(position) {
        this.head = position;
    }

    set direction_(cardinalPoint) {
        this.direction = cardinalPoint;
    }


    /**The position of the snake's head is changing (depends on the direction)
    * & Conditions <<if>> in switch for the case where the snake goes in the wall
    */
    move(){
        let nextRow;
        let nextColumn;
        moveTail();
        this.tail[this.tail.length-1] = new Position(this.head.row_, this.head.column_);
        swivel[swivel.length-1] = this.direction;
        switch(this.direction) {
            case "W":
                if (this.head.column_ != 1) {
                    nextColumn = this.head.column_ - 1;
                    this.head = new Position(this.head.row_, nextColumn);
                }
                break;
            case "N":
                if (this.head.row_ != 1) {
                    nextRow = this.head.row_ - 1;
                    this.head = new Position(nextRow, this.head.column_);
                }
                break;
            case "E":
                if (this.head.column_ != 15) {
                    nextColumn = this.head.column_ + 1;
                    this.head = new Position(this.head.row_, nextColumn);
                }
                break;
            case "S":
                if (this.head.row_ != 15) {
                    nextRow = this.head.row_ + 1;
                    this.head = new Position(nextRow, this.head.column_);
                }
                break;   
        }
    }
}