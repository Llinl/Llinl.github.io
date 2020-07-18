
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
