function BinaryBullet(x, y, value) {

    /* PROPERTIES */

    this.x = x; //xposition
    this.y = y; //yposition
    this.r = 8; //radius
    this.value = value; //0, 1 or 2 value based on keypressed
    this.toDelete = false;


    /* METHODS */

    this.show = function () {
        //this function displays the bullet and bit
        noStroke();
        fill(150, 0, 255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2); //ellipse for bullet
        fill(15, 0, 255);
        textSize(12);
        text(this.value, this.x - 5, this.y + 5); //the bit is display on bullet
    };

    this.hits = function (asciiAlien) {
        //if distance from center of bullet to center of alien is 
        //greater than radius of bullet + radius of alien then a hit 
        var d = dist(this.x, this.y, asciiAlien.x, asciiAlien.y);
        if (d < this.r + asciiAlien.r) {
            return true; //a hit
        } else {
            return false; //a miss
        }
    };

    this.toRemove = function () {
        //removes the bullet
        this.toDelete = true;

    };

    this.move = function () {
        this.y = this.y - 5;
    };
}