//for data
//sprite
class Sprite{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

//sprite data
let sprite = [
    //player 0~2
    new Sprite(1,0,26,30),
    new Sprite(29,0,26,30),
    new Sprite(57,0,26,30),

    //player bullets 3,4
    new Sprite(1,34,7,7),
    new Sprite(8,33,7,11),
    
    //mob green 5~7
    new Sprite(2,45,15,16),
    new Sprite(18,45,15,16),
    new Sprite(2.5,77.5,6,6),

    //mob yellow 8~10
    new Sprite(38,45,15,16),
    new Sprite(54,45,15,16),
    new Sprite(21.5,77.5,6,6),

    //mob red 11~12
    new Sprite(2,61,15,16),
    new Sprite(18,61,15,16),
    new Sprite(14.5,77.5,6,6),

    //mob blue 13~15
    new Sprite(38,61,15,16),
    new Sprite(54,61,15,16),
    new Sprite(8.5,77.5,6,6),
];