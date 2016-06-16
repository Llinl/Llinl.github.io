//var small = false;



//This will start the program snce onload calls the init after it is done.
var imageRepository = new function () {
    "use strict";
    console.log("Start image load");
    let numImages = 2;
    let numLoaded = 0;

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

class Sprite {
    constructor(spritemap, tileNr) {
        this._spritemap = spritemap;
        this._tileNr = tileNr;
        this._width = 0;
        this._height = 0;
    };
    get spritemap() {return this._spritemap;} set spritemap(value){this._spritemap = value;}
    get tileNr() {return this._tileNr;} set tileNr(value) {this._tileNr = value;}

    get width() {return this._width;} set width(value) {this._width = value;}
    get height() {return this._height;} set height(value) {this._height = value;};
}

class Position{
    constructor(x, y){
        this._x = x;
        this._y = y;
    }
    get X(){return this._x;} set X(value){this._x = value;}

    get Y(){return this._y; } set Y(value){this._y = value;}
}

class Mapmaker {
    constructor() {
        this.block = [];
        this.template = [[1, 1, 4, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 4, 1, 1],
            [1, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 1],
            [3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
            [3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 3],
            [1, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 1],
            [1, 1, 4, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 4, 1, 1]
        ];
        this.base = [[0,0,0,0,0],
                     [0,1,1,1,0],
                     [0,1,1,1,0],
                     [0,1,1,1,0],
                     [0,0,0,0,0]];
    };

    drawMap(map,width,height,x,y){
        let returnString = "";
        for(let h = y; h < y + height; h++) {
            for (let w = x; w < x + width; w++) {
                returnString = returnString + map[h][w];
            }
            returnString = returnString + "\n"
        }
        console.log(returnString);
    }

    addHouse(block) {
        let rnd = Math.floor(Math.random() * 4);
        if (rnd === 0 && block[1][0] === 0 && block[0][0] != 3 && block[2][0] != 3) {
            block[1][0] = 1;
            if (block[0][0] === 4) block[2][0] = 4;
        }
        if (rnd === 1 && block[0][1] === 0 && block[0][0] != 4 && block[0][2] != 4) {
            block[0][1] = 1;
            if (block[0][0] === 3) block[0][2] = 3;
        }
        if (rnd === 2 && block[2][1] === 0 && block[2][0] != 4 && block[2][2] != 4) {
            block[2][1] = 1;
            if(block[2][0]===3)block[2][2]=3;
        }
        if (rnd === 3 && block[1][2] === 0 && block[0][2] != 3 && block[2][2] != 3) {
            block[1][2] = 1;
            if(block[0][2]===3)block[2][2]=3;
        }
        return block;
    }

    forbidRoads(block){
        if(block[1][0] === 0) block [1][0]= 2;
        if(block[0][1] === 0) block [0][1]= 2;
        if(block[2][1] === 0) block [2][1]= 2;
        if(block[1][2] === 0) block [1][2]= 2;

        return block;
    }

    countWalls(block){
        this.returnNr = 0;
        if(block[1][0] ===1 || block[1][0] ===3 || block[1][0] ===4) this.returnNr++;
        if(block[0][1] ===1 || block[0][1] ===3 || block[0][1] ===4) this.returnNr++;
        if(block[2][1] ===1 || block[2][1] ===3 || block[2][1] ===4) this.returnNr++;
        if(block[1][2] ===1 || block[1][2] ===3 || block[1][2] ===4) this.returnNr++;

        return this.returnNr;
    }

    testCorners(block){
        if(block[1][0] ===1 && block[0][1] ===1 ){
            block[0][2] = 3;
            block[2][0] = 4;
        }
        //console.log("block[1][0] ===1 && block[0][1]");
        //this.drawMap(block,3,3,0,0);
        if(block[1][2] ===1 && block[2][1] ===1){
            block[0][2] = 4;
            block[2][0] = 3;
        }
        //console.log("block[1][2] ===1 && block[2][1] ===1");
        //console.log("block[1][2] = " + block[1][2] + " block[2][1] = " + block[2][1] );
        //this.drawMap(block,3,3,0,0);
        if(block[1][0] ===1 && block[2][1] ===1){
            block[2][2] = 3;
            block[0][0] = 4;
        }
        //console.log("block[1][0] ===1 && block[2][1] ===1");
        //this.drawMap(block,3,3,0,0);
        if(block[0][1] ===1 && block[1][2] ===1){
            block[2][2] = 4;
            block[0][0] = 3;
        }
        //console.log("block[0][1] ===1 && block[1][2] ===1");
        //this.drawMap(block,3,3,0,0);
    }

    buildBlock(block) {
        this.block = this.testCorners(block);
        if(this.countWalls(block) === 0) {

            block = this.addHouse(block);
            block = this.addHouse(block);
        }

        if(this.countWalls(block) === 1) {
            block = this.addHouse(block);
        }

        block = this.forbidRoads(block);

        this.block = this.testCorners(block);
        //test
        return block;
    }

    buildHouses(map){
        for(let h = 0; h < 5;h++) {
            for (let w = 0; w < 5; w++) {
                console.log("w = " + w)
                map[h+7][w+7] = this.base[h][w];
            }
        }
        return map;
    }

    cleanMap(map){
        for(let h = 0; h < 19;h++) {
            for (let w = 0; w < 19; w ++) {
                if(map[h][w]===0 || map[h][w]===2){
                    map[h][w] = 0;
                }
                else{
                    map[h][w] = 1;
                }
            }
        }
        return map;
    }

    getMap(){
        this.returnMap = this.template;

        for(let h = 1; h < 19;h+=2) {
            for (let w = 1; w < 19; w += 2) {
                this.block = [[this.returnMap[h - 1][w - 1], this.returnMap[h - 1][w], this.returnMap[h - 1][w + 1]],
                    [this.returnMap[h][w - 1], this.returnMap[h][w], this.returnMap[h][w + 1]],
                    [this.returnMap[h + 1][w - 1], this.returnMap[h + 1][w], this.returnMap[h + 1][w + 1]]];

                this.block = this.buildBlock(this.block);
                //this.drawMap(this.returnMap,3,3,0,0);

                for (let y = 0; y < 3; y++) {
                    for (let x = 0; x < 3; x++) {
                        this.returnMap[h + y - 1][w + x - 1] = this.block[y][x];
                    }
                }
            }
        }
        //console.log(this.returnMap);
        this.returnMap = this.buildHouses(this.returnMap);
        //this.drawMap(this.returnMap,19,19,0,0);
        this.returnMap = this.cleanMap(this.returnMap);
        return  this.returnMap;
    };
}

class Person extends Sprite{
    constructor(pos){
        super(imageRepository.spriteMap,0);
        this.width = 24;
        this.height = 24;
        this._oldPos = pos;
        this._newPos = pos;
        this._startPos = pos;
    }
     reset() {
         console.log("Person Reset");

         this._oldPos = this._newPos;
         this._newPos = this._startPos;
    };

    get oldPos(){return this._oldPos;}
    set oldPos(value){this._oldPos = value;}
    get newPos(){return this._newPos;}
    set newPos(value){this._newPos = value;}
}

class Map{
    constructor() {
        this.mapWidth = 19;
        this.mapHeight = 19;
        this.tileWidth = 24;
        this.tileHeight = 24;
        this.tileScale = 1;

        this.startPos = new Position(9, 7);
    }

     testEdges (person){
        if (person.newPos.X === 0) return false;
        if (person.newPos.X === this.mapWidth-1) return false;
        if (person.newPos.Y === 0) return false;
        return person.newPos.Y !== this.mapHeight - 1;

    };
}
class Background extends Map{
    constructor() {
        super();
        this.mapmaker = new Mapmaker();
        this.backgroundArr = this.mapmaker.getMap();

        //let canvas = document.getElementById("background");
        this.context = document.getElementById("background").getContext("2d");

        //this.makeMap();
    }
    makeMap(){


        this.backgroundArr = [[1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0 ,1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1]];

    };
    testLimits(pos){
        if (pos.X < 0) return false;
        if (pos.X > this.mapWidth-1) return false;
        if (pos.Y < 0) return false;
        if (pos.Y > this.mapHeight-1)  return false;
        return this.backgroundArr[pos.Y][pos.X] !== 1;

    };
    redraw() {
        console.log("Map Background Redraw");
        for (let h = 0; h < this.mapHeight; h++) {
            for (let w = 0; w < this.mapWidth; w++) {
                this.context.drawImage(imageRepository.imgMap,
                    (this.backgroundArr[h][w]) * this.tileWidth, 0,
                    this.tileWidth, this.tileHeight,
                    w * this.tileWidth * this.tileScale, h * this.tileHeight * this.tileScale,
                    this.tileWidth * this.tileScale, this.tileHeight * this.tileScale);
            }
        }
    }
}

class People extends Map{
    constructor(){
        super();
        console.log("People init");
        this.canvas= document.getElementById("people");
        this.context = document.getElementById("people").getContext("2d");
        this.citizens=9;
        this.population=[];

        for(let i = 0; i < this.citizens; i++){
            var p = new Person(this.startPos);
            p.tileNr = 1;
            p.reset();
            var h = new Person(this.startPos);
            h.tileNr = 2;
            h.reset();
            var r = new Person(this.startPos);
            r.tileNr = 3;
            r.reset();

            this.population.push(p);
            this.population.push(h);
            this.population.push(r);
        }

    }
    static getNextStep(){
        console.log("Map Get Next Step");
        let rnd = Math.floor(Math.random() * 4);
        if (rnd === 0) return {X:-1,Y:0};
        if (rnd === 1) return {X:1,Y:0};
        if (rnd === 2) return {X:0,Y:-1};
        if (rnd === 3) return {X:0,Y:1};
        return{};
    }
    //noinspection JSUnusedGlobalSymbols
    move () {
        console.log("Map People Move");
        console.log("this.citizens = " + this.citizens);
        for (let people = 0; people < this.citizens; people++) {
            console.log("people = " + people);
            let person = this.population[people];
            if (this.testEdges(person)) {
                let moved = false;
                let nextStep = {X: 0, Y: 0};
                while (moved === false) {

                    nextStep = People.getNextStep();

                    if (back.testLimits({
                            X: nextStep.X + person.newPos.X,
                            Y: nextStep.Y + person.newPos.Y
                        })) {
                        moved = true;
                    }
                    if (nextStep.X + person.newPos.X === person.oldPos.X && nextStep.Y + person.newPos.Y === person.oldPos.Y) moved = false;
                }

                this.population[people].oldPos = this.population[people].newPos;

                this.population[people].newPos = new Position(this.population[people].newPos.X + nextStep.X, this.population[people].newPos.Y + nextStep.Y);

            } else {
                this.population[people].reset();

            }
            console.log (".newPos.X = " + this.population[people].newPos.X);
            console.log (".newPos.Y = " + this.population[people].newPos.Y);
        }
    }
    redraw() {
        console.log("Map People Redraw");
        console.log(this.population);
        for (let people = 0; people < this.citizens; people++) {
            let person = this.population[people];
            this.context.clearRect(person.oldPos.X * this.tileWidth * this.tileScale, person.oldPos.Y * this.tileHeight * this.tileScale, this.tileWidth * this.tileScale, this.tileHeight * this.tileScale);
            this.context.drawImage(person.spritemap,person.tileNr * person.width, 0,person.width ,person.height ,person.newPos.X * this.tileWidth * this.tileScale , person.newPos.Y * this.tileHeight * this.tileScale,this.tileWidth * this.tileScale, this.tileHeight * this.tileScale);
        }
    }
}


class Player extends Map {
    constructor() {

        //this.canvas = document.getElementById("player");
        this.context = document.getElementById("player").getContext("2d");
    }
        static redraw(){
            for (let h = 0; h < 9; h++) {
                for (let w = 0; w < 9; w++) {
                    //this.context.drawImage(imageRepository.imgMap,
                    // (1 - cityMap[w][h]) * 24, 0, 24, 24, h * 48, w * 48, 48, 48);
                }
            }
        };
}

var back = new Background();
var peo =  new People();
//var pla = new Player();

function init(){
    back.redraw();
    peo.redraw();

   //setInterval(movePeople, 1000);
}

function resetMap(){
    back = new Background();
    back.redraw();
}

function movePeople(){
    peo.move();
    peo.redraw();
}


/*
function switchSize(){
    var contextb= document.getElementById("background").getContext("2d");
    contextb.clearRect(0, 0, contextb.canvas.width, contextb.canvas.height);
    var contextp = document.getElementById("people").getContext("2d");
    contextp.clearRect(0, 0, contextp.canvas.width, contextp.canvas.height);

    small = !small;
    back = new Background();
    peo = new People();
    back.redraw();
    peo.redraw();
}
*/
function closeAllPanels(){
    for(var p in panels){
        document.getElementById(panels[p]).style["display"] = "none";
    }
}
//noinspection JSUnusedLocalSymbols
function changePanel(nr){
    closeAllPanels();
    document.getElementById(panels[nr]).style["display"]="inline";
}
