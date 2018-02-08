//global variables
var binaryShip; //reserves storage space for an instance of the binaryShip class
var backgroundImage; //reserves storage space for the background image
var asciiAliens = []; //reserves an empty array for alien instances
var binaryBullets = [];
var exitIntro1 = false;
var exitIntro2 = false;
var secretSymbol;
var ascii; //stores the ascii code for the secret symbol
var binaryArray = []; //stores the secret binary number
var binaryNumber = ''; //stores the secret binary number as a string
var alienCount = 0; //used to move alien
var beam = 0; //used to beam down secret symbol
var amo = 0; //bullets used
var score = 0; // 1 hit = 5 points, 1 bullet = -1, aliens down = -2
var kills = 0; //number of aliens eliminated

function preload() {
    backgroundImage = loadImage("images/background.jpg");
    alienImage = loadImage("images/alien.png");

}

function setup() {
    /* this function sets up a game canvas, creates an instance of BinaryShip, creates an array of 8 alien instances  */
    pixelDensity(1);
    createCanvas(800, 600);
    makeSecretSymbol(); //generates a random symbol into binary
    generateAliens(); //generate aliens

}

function draw() {
    /* this function loops continuously unless noloop is true.
    the background image is loaded, the ship is displayed on the canvas
    the ship moves in response to keyboard events */
    background(backgroundImage, 0, 0, 800, 500);
    if (!exitIntro1) { //if player presses any key move to intro2
        intro1();
    } else if (!exitIntro2) { //if player presses any key move to playgame
        intro2();
    } else {
        playGame();
    }
}


//setup functions

function makeSecretSymbol() {
    /* This function is called in setup to create a secret symbol then convert it to a ascii code and then into a binary number */

    binaryShip = new BinaryShip(); //new instance of BinaryShip class
    secretSymbol = char(random(65, 90)); //random number between 65 an 90
    ascii = unchar(secretSymbol); //returns the ascii code for the number
    binaryNumber = decimalToBinary(ascii); //returns the bianry number
}

function generateAliens() {
    for (var i = 0; i < 8; i++) {
        //fill an array of 8 alien objects each positioned along x direction
        asciiAliens[i] = new AsciiAlien(i * 50 + 50, 100);
        asciiAliens[i].value = binaryArray[i]; // assigns a bit to an alien
    }
}

function decimalToBinary(number) {
    /*This function is called by makeSecretSymbol and will ascii code into binary and stores in array. */
    var index = 7;
    binaryArray[0] = 0;
    for (; number >= 0; number = number / 2) {
        remainder = number % 2;
        number = number - remainder;
        binaryNumber = remainder + binaryNumber;
        binaryArray[index] = remainder;
        index = index - 1;
        if (number == 0) {
            break;
        }
    }
    return binaryNumber; //also sends it  to a string if needed
}

//draw functions

function playGame() {
    binaryShip.show();
    binaryShip.move();
    displayScore();
    startAliens();
    fireBullets();
}


function displayScore() {
    /*  This function is called by function playgame and displays amo usage */
    textSize(20);
    fill(255, 102, 153);
    text('Binary bullets used: ' + amo, 10, 50);
    text('Score: ' + score, 300, 50);
    text('Kills: ' + kills, 500, 50);
}

function startAliens() {
    /* This function is called by playGame and shows and moves aliens and detects if aliens hit the edge of the canvas and moves down and in opposite direction */
    var edge = false;
    for (var i = 0; i < asciiAliens.length; i++) {
        //display and move the array of aliens
        asciiAliens[i].show();
        if (kills < 8) { //this only lets aliens move if not all killed
            asciiAliens[i].move();
        }
        //detects when aliens hit edge of canvas
        if (asciiAliens[i].x > width || asciiAliens[i].x < 0) {
            edge = true;
        }
    }

    if (edge) {
        for (var i = 0; i < asciiAliens.length; i++) {
            asciiAliens[i].shiftDown();
        }
        if (kills < 8) {
            score = score - 2;
        }
    }
}


function fireBullets() {
    /* This function moves and fires bullets and  checks for a hit*/
    for (var i = 0; i < binaryBullets.length; i++) {
        binaryBullets[i].show();
        binaryBullets[i].move();

        for (var j = 0; j < asciiAliens.length; j++) {
            //checks if hit and if correct key was pressed
            if (binaryBullets[i].hits(asciiAliens[j]) && asciiAliens[j].value == key) {
                if (asciiAliens[j].r != 0) { //stops hitting already hit aliens 
                    score = score + 5; //5 points for a kill
                    kills = kills + 1; // increment kills

                }
                asciiAliens[j].hit(); //make radius of alien 0
                binaryBullets[i].toRemove(); // flag to remove old bullets from THE ARRAY
            } else {

            }
        }
    }

    //remove bullets from array that have hit
    for (var i = binaryBullets.length - 1; i >= 0; i--) {
        if (binaryBullets[i].toDelete) {
            binaryBullets.splice(i, 1);
        }
    }
}


//keyboard controls

function keyReleased() {
    /* this function sets the direction of ship to stop if any 
    key is released except for the firing keys */
    if (key != '0' || key != '1') { //prevents space bar from stopping ship
        binaryShip.setDir(0);
    }
}

function keyPressed() {
    /* this function listens for keyboard events
    if key is pressed intro is exited
    if the right arrow is pressed the ship will move right
    if the left arrow is pressed the ship will go left
    if number 0 is pressed the binary bullet 0 is fired
    if number 1 is pressed the binary bullet 1 is fired */

    //advance introduction with space bar
    if (!exitIntro1) {
        exitIntro1 = true;
    } else {
        exitIntro2 = true;
    }


    //shoot bullets
    /*     if (key === ' ') {
            var binaryBullet = new BinaryBullet(binaryShip.x, height, 2);
            binaryBullets.push(binaryBullet); //adds a bullet to the array
        } */
    if (key === '0') {
        var binaryBullet = new BinaryBullet(binaryShip.x, height, 0);
        binaryBullets.push(binaryBullet); //adds a bullet to the array
        amo = amo + 1;
        score = score - 1;
    }
    if (key === '1') {
        var binaryBullet = new BinaryBullet(binaryShip.x, height, 1);
        binaryBullets.push(binaryBullet); //adds a bullet to the array
        amo = amo + 1;
        score = score - 1;
    }


    //steer ship
    if (keyCode === RIGHT_ARROW) {
        binaryShip.setDir(1); //sends the direction to the ship
    } else if (keyCode === LEFT_ARROW) {
        binaryShip.setDir(-1);
    }
}