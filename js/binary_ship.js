//ship constructor 
function BinaryShip() {
    //properties
    this.x = width / 2; //position ship
    this.xdir = 0; //default direction stopped


    //methods
    this.show = function () { //show the ship
        fill(255, 0, 0, 150);
        noStroke();
        rect(this.x, height - 20, 20, 60);
    }

    this.setDir = function (dir) { //gets direction from left and right arrow game.js
        this.xdir = dir;
    }

    this.move = function (dir) { //moves ship
        this.x = this.x + this.xdir * 5;
    }
}