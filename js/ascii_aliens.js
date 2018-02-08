//alien constructor 
function AsciiAlien(x, y, value) {

    /*  properties */

    this.x = x; //position alien
    this.y = y;
    this.r = 20;
    this.value = value; //stores a BIT value of the secret symbol   
    this.xdir = 1;



    /* methods */

    this.hit = function () {
        this.r = 0;
        text(this.value, this.x, this.y)

    }

    this.shiftDown = function () {
        /* this function moves the aliens down and in opposite direction 
        when they hit the edge of the canvas */
        this.xdir *= -1.1;
        this.y += this.r; //lowers alien down by size of radius . If hit then alien doesn't move down
    }

    this.move = function () {
        /*this function moves aliens in x direction when called*/
        this.x = this.x + this.xdir;
    }

    this.show = function () {
        fill(255, 0, 200);
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
        text(this.value, this.x, this.y)
    }
}