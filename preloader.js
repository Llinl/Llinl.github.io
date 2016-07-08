//This will start the program since onload calls the init after it is done.

var imageRepository = new function () {
    "use strict";
    console.log("Start image load");
    let numImages = 3;
    let numLoaded = 0;

    // Define images
    this.imgMap = new Image();
    this.spriteMap = new Image();
    this.logImg = new Image();

    // Ensure all images have loaded before starting the game

    function imageLoaded() {
        console.log("Image loaded");
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }
    this.imgMap.onload = function() {
        imageLoaded();
    };

    this.spriteMap.onload = function() {
        imageLoaded();
    };

    this.logImg.onload = function(){
        imageLoaded();
    }

    // Set images src
    this.imgMap.src = "./Resources/Images/CityTileMap.png";
    this.spriteMap.src = "./Resources/Images/SpriteMap.png";
    this.logImg.src = "./Resources/Images/LogImg.png";
};