/**
 * Created by Bjorn on 2016-05-01.
 */

//var buttons = 8;
//var money = 1000;

//var arrMoneyMakers = [];
//var arrMmProd = [1,10,100,1000,10000,100000,1000000,10000000];
//var arrMmCost = [1,10,100,1000,10000,100000,1000000,10000000];
/*
var cityMap =   [[1,1,1,0,1,0,1,0,1],
                 [0,0,0,0,0,0,0,0,1],
                 [1,0,1,0,1,1,1,0,1],
                 [0,0,1,0,0,0,0,0,0],
                 [1,0,1,0,1,1,1,0,1],
                 [1,0,0,0,0,0,0,0,0],
                 [1,0,1,0,1,0,1,1,1],
                 [0,0,1,0,0,0,1,1,1],
                 [1,0,1,0,1,0,1,1,1]]; */

var panels = ["panelMap", "panelHenchmen", "panelTraining",
    "panelResearch", "panelFactory", "panelPowers", "panelSlide"];

var small = true;

//map = new Map();

var imageRepository = new function () {
    "use strict";
    console.log("Start image load");
    var numImages = 2;
    var numLoaded = 0;

    // Define images
    this.imgMap = new Image();
    this.spriteMap = new Image();

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

    // Set images src
    this.imgMap.src = "./Resources/Images/CityTileMap.png";
    this.spriteMap.src = "./Resources/Images/SpriteMap.png";
};

var Person = function(startPosX, startPosY){
    var oldX = 0;
    var oldY = 0;
    var newX = 0;
    var newY = 0;
    var startX = startPosX;
    var startY = startPosY;
    var type = 0;

    var reset = function() {
        console.log("Person Reset");
        oldX = startPosX;
        oldY = startPosY;
        newX = startPosX;
        newY = startPosY;

        return this;
    };
    reset();
    return{startX:startX,startY:startY,
        oldX:oldX,
        oldY:oldY,
        newX:newX,
        newY:newY,
        type:type,
        reset:reset};
};

var Map = function() {
    var mapWidth = 0;
    var mapHeight = 0;
    var tileWidth = 0;
    var tileHeight = 0;
    var tileScale = 0;
    var startPos = {};
     if (small) {
         mapWidth = 9;
         mapHeight = 9;
         tileWidth = 24;
         tileHeight = 24;
         tileScale = 2;

         backgroundArr =
             [[1, 1, 1, 0, 1, 0, 1, 0, 1],
                 [0, 0, 0, 0, 0, 0, 0, 0, 1],
                 [1, 0, 1, 0, 1, 1, 1, 0, 1],
                 [0, 0, 1, 0, 0, 0, 0, 0, 0],
                 [1, 0, 1, 0, 1, 1, 1, 0, 1],
                 [1, 0, 0, 0, 0, 0, 0, 0, 0],
                 [1, 0, 1, 0, 1, 0, 1, 1, 1],
                 [0, 0, 1, 0, 0, 0, 1, 1, 1],
                 [1, 0, 1, 0, 1, 0, 1, 1, 1]];

          startPos = {X:4,Y:1};
     }

     else {
         mapWidth = 18;
         mapHeight = 18;
         tileWidth = 24;
         tileHeight = 24;
         tileScale = 1;

         var backgroundArr = [[1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
             [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
             [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
             [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
             [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
             [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
             [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
             [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
             [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
             [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
             [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
             [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
             [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
             [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
             [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
             [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
             [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1]];

          startPos = {X:8,Y:1};
        }

     return {
         redraw: function () {
             console.log("Map redraw");
             this.background.redraw();
         }
         ,
         background: {
             canvas: document.getElementById("background"),
             context: document.getElementById("background").getContext("2d"),
             redraw: function () {
                 console.log("Map Background Redraw");
                 for (var h = 0; h < mapHeight; h++) {
                     for (var w = 0; w < mapWidth; w++) {
                         this.context.drawImage(imageRepository.imgMap,
                             (1 - backgroundArr[h][w]) * tileWidth, 0,
                             tileWidth, tileHeight,
                             w * tileWidth * tileScale, h * tileHeight * tileScale,
                             tileWidth * tileScale, tileHeight * tileScale);
                     }
                 }
             }
         }
         ,
         people: {
             canvas: document.getElementById("people"),
             context : document.getElementById("people").getContext("2d"),
             citizens:10000,
             population:[],
             init: function(){
             console.log("People init");
                 for(var i = 0; i < this.citizens; i++){
                     var p = new Person(startPos.X, startPos.Y);
                     p.type = 1;
                     //p.X = 4;
                     //p.Y = 4;
                     this.population.push(p);
                 }
             },
             testLimits : function(person){
                 var returnBool = true;
                 if (person.X < 0)  returnBool = false;
                 if (person.X > mapWidth-1)  returnBool = false;
                 if (person.Y < 0)  returnBool = false;
                 if (person.Y > mapHeight-1)  returnBool = false;
                 console.log(person);
                 if (backgroundArr[person.Y][person.X] === 1) returnBool = false;

                 return returnBool;
             },
             move : function() {
                 console.log("Map People Move");
                 for (var people = 0; people < this.citizens; people++) {
                     var person = this.population[people];

                     if (person.newX === 0 || person.newX === mapWidth-1 ||
                         person.newY === 0 || person.newY === mapHeight-1) {
                         this.population[people].oldX = this.population[people].newX;
                         this.population[people].oldY = this.population[people].newY;
                         this.population[people].newX = this.population[people].startX;
                         this.population[people].newY = this.population[people].startY;
                     }
                     else {
                         var moved = false;
                         var nextStep = {X: 0, Y: 0};
                         while (moved === false) {
                             nextStep = {X: 0, Y: 0};
                             var rnd = Math.floor(Math.random() * 4);
                             if (rnd === 0) nextStep.X = -1;
                             if (rnd === 1) nextStep.X = 1;
                             if (rnd === 2) nextStep.Y = -1;
                             if (rnd === 3) nextStep.Y = 1;

                             if (this.testLimits({
                                     X: nextStep.X + this.population[people].newX,
                                     Y: nextStep.Y + this.population[people].newY
                                 })) {
                                 moved = true;
                             }
                             if (nextStep.X + this.population[people].newX === this.population[people].oldX && nextStep.Y + this.population[people].newY === this.population[people].oldY) moved = false;
                         }
                         this.population[people].oldX = this.population[people].newX;
                         this.population[people].oldY = this.population[people].newY;
                         this.population[people].newX += nextStep.X;
                         this.population[people].newY += nextStep.Y;
                     }
                 }
             },

             redraw : function () {
                 console.log("Map People Redraw");
                 for (var people = 0; people < this.citizens; people++) {
                     //console.log("oldX = " + this.population[people].oldX + " oldY = " + this.population[people].oldY);
                     this.context.clearRect(this.population[people].oldX * tileWidth * tileScale, this.population[people].oldY * tileHeight * tileScale, tileWidth * tileScale, tileHeight * tileScale);

                     //console.log("newX = " + this.population[people].newX + " newY = " + this.population[people].newY);

				     this.context.drawImage(imageRepository.spriteMap, this.population[people].type * 16, 0,16 ,16 ,this.population[people].newX * tileWidth * tileScale , this.population[people].newY * tileHeight * tileScale,tileWidth * tileScale, tileHeight * tileScale);
                 }
             }
         }
         ,
         player: {
             canvas: document.getElementById("player"),
                 context : document.getElementById("player").getContext("2d"),
                 redraw : function () {
                 for (var h = 0; h < 9; h++) {
                     for (var w = 0; w < 9; w++) {
                         //this.context.drawImage(imageRepository.imgMap,
                         // (1 - cityMap[w][h]) * 24, 0, 24, 24, h * 48, w * 48, 48, 48);
                     }
                 }
             }
         }
     }
};

var map = new Map();

function init(){
    map.redraw();
    map.people.init();
    map.people.redraw();

    //var myVar = setInterval(movePeople, 1000);
    setInterval(movePeople, 1000);

    //map.player.redraw();

    /*

    for(var i = 0; i< buttons;i++){
        var mm = new MoneyMaker(document.getElementById("mm"+i),document.getElementById("but"+i+"Cost"));
        mm.prod = arrMmProd[i];
        mm.cost = arrMmCost[i];
        arrMoneyMakers.push(mm);
    }
    update();
    setInterval(gameLoop,1000);
    */
}

function movePeople(){
    map.people.move();
    map.people.redraw();
}

function switchSize(){
    var contextb= document.getElementById("background").getContext("2d");
    contextb.clearRect(0, 0, context.canvas.width, context.canvas.height);
    var contextp = document.getElementById("people").getContext("2d");
    contextp.clearRect(0, 0, context.canvas.width, context.canvas.height);

    small = !small;
    map = new Map();
    map.redraw();
    map.people.init();
    map.people.redraw();
}

/*
function MoneyMaker(txtMm,txtMmCost){
    this.txtMm = txtMm;
    this.txtMmCost = txtMmCost;
    this.nr = 0;
    this.prod = 0;
    this.cost = 0;

    this.payout = function(){
        return this.prod*this.nr;
    };

    this.buy = function(){
        var returnCost =  this.cost;
        this.cost *= 1.2;
        this.nr++;
        return returnCost;
    };

    this.update = function(){
        this.txtMm.innerHTML = "" + this.nr;
        this.txtMmCost.innerHTML = "" + Math.floor(this.cost + 0.5);
    }
}

function butClickMm(nr){
    money = money - arrMoneyMakers[nr].buy();
    update();
}
function update(){

    arrMoneyMakers.forEach(function(mm){mm.update();});
    //document.getElementById("money").innerHTML = ""+ Math.floor(money);
}

function gameLoop(){
    for (var i in arrMoneyMakers){
        money = money + arrMoneyMakers[i].payout();
    }
    update();
}

function showScreen(){
    var scr = document.getElementById("Screen1");
    scr.style["display"]="inline";
}
*/
function closeAllPanels(){
    for(var p in panels){
        document.getElementById(panels[p]).style["display"] = "none";
    }
}
function changePanel(nr){
    closeAllPanels();
    document.getElementById(panels[nr]).style["display"]="inline";
}
