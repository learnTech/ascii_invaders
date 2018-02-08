function intro1() {
    textSize(32);
    text("ASCII INVADERS", 300, 50);
    fill(255, 102, 153);
    text("Wait for the alien symbol to appear. You must destroy the aliens before they destroy you. Decoding the symbol into binary using an ASCII table. Fire the correct BIT at each alien in the correct order using the 0 and 1 keys", 250, 70, 400, 400);
    text("press any key to continue", 250, height - 20);

}

function intro2() {
    loadAlien();
    removeAlienBackground();
    introAlien();

}

function loadAlien() {
    /* This function loads Alien image file and creates a new alien image that will have the white background removed */
    alienImage.loadPixels(); //loads the image into a pixel array
    alienImageTrans = createImage(235, 214); //create an empty pixel array same size as alienImage 
    alienImageTrans.loadPixels(); //loads the alien image into the new empty pixel array
}

function removeAlienBackground() {
    /* This function removes the white background from the alien image and scales it down to 50px across */
    for (var y = 0; y < alienImage.height; y++) {
        for (var x = 0; x < alienImage.width; x++) {
            var i = (x + y * alienImage.width) * 4;
            if ((alienImage.pixels[i] < 255) && (alienImage.pixels[i + 1] < 255) && (alienImage.pixels[i + 2] < 255)) {
                alienImageTrans.pixels[i] = alienImage.pixels[i];
                alienImageTrans.pixels[i + 1] = alienImage.pixels[i + 1];
                alienImageTrans.pixels[i + 2] = alienImage.pixels[i + 2];
                alienImageTrans.pixels[i + 3] = alienImage.pixels[i + 3];
            }
        }
    }
    alienImageTrans.updatePixels();
    alienImageTrans.resize(50, 0);
}


function introAlien() {
    /* This function animates the flying alien out to the middle of the canvas. */
    if (alienCount < width / 2) { //stops moving when alien in the middle
        alienCount = alienCount + 2; //increments x position of alien
        image(alienImageTrans, alienCount, 0); //move alien out to middle
    } else {
        displaySecretCode();
    }
}

function displaySecretCode() {
    /* This function animates a beam of light from the alien and generates a random letter for the player to then convert to binary */
    image(alienImageTrans, width / 2 - 20, 0); //display the alien
    fill(255, 255, 255, 100);
    stroke(23, 231, 23);
    if (beam < height - 20) { //stops the animation when reaches bottom
        triangle(width / 2, 40, width / 2 - 80, 40 + beam, width / 2 + 80, beam + 40);
        beam = beam + 1;
        text(char(random(65, 90)), width / 2, height - (height - beam - 40));
    } else {
        triangle(width / 2, 40, width / 2 - 80, height, width / 2 + 80, height);
        textSize(16);
        text("Greetings earthling", width / 2 - 70, height - 70);
        text("There are 8 aliens", width / 2 - 70, height - 50);
        text("The secret symbol is ", width / 2 - 70, height - 30);
        text(secretSymbol, width / 2, height - 10);
        text("press any key to continue", 50, height - 20);
    }
}