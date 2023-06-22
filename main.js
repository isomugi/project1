//SCREEN size
const SCREEN_W = 180;
const SCREEN_H = 320; 

//CANVAS size
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

//field size
const FIELD_W = SCREEN_W * 2;
const FIELD_H = SCREEN_H * 2;

//star count
const STAR_MAX = 300;

//game speed(ms)　秒間60回更新
const GAME_SPEED = 1000/60;

//キャンバスを定義
let can = document.getElementById("can");
let cont = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;

//フィールド(仮装画面)を定義
let vcan = document.createElement("canvas");
let vcont = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

//Sprite
let SpriteImage = new Image();
SpriteImage.src = "sprite.png";

class Sprite{
    constructor(x, y, h, w){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

let sprite = [
    new Sprite(0,0,140,150),
    new Sprite(141,0,140,150),
    new Sprite(281,0,140,150),
]

function drawSprite(snum, x, y){
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;
    s=3;
    let px = (x>>8) - sw/(s*2);
    let py = (y>>8) - sh/(s*2);

    if(px+sw/(2*s)<camera_x || px-sw/(2*s)>=camera_x + SCREEN_W || py+sh/(2*s)<camera_y || py-sh/(2*s)>=camera_y + SCREEN_H) return;
    vcont.drawImage(SpriteImage, px, py, sw, sh, sx, sy, sw/s, sh/s);
}

//player
class Player{
    constructor(){
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/2)<<8;
    }

    apdate(){

    }

    draw(r){
        //r = random(0,2);
        drawSprite(r, this.x, this.y);
    }
}

let player = new Player;
//camera
let camera_x = 0;
let camera_y = 0;

function random(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

let star = [];

class Star{
    constructor(){
        this.x = random(0, FIELD_W)<<8;
        this.y = random(0, FIELD_H)<<8;
        this.vx = 0;
        this.vy = random(30,200);
        this.sz = random(1,2);
    }
    //描画クラス
    draw(){
        let x = this.x>>8;
        let y = this.y>>8;
        if(x<camera_x || x>=camera_x + SCREEN_W || y<camera_y || y>=camera_y + SCREEN_H) return;

        vcont.fillStyle = random(0,2) != 0 ? "#66f" : "white";
        vcont.fillRect(this.x>>8, this.y>>8, this.sz, this.sz);
    }
    //マイフレーム毎にどれだけ動かすか
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.y > FIELD_H<<8){
            this.x = random(0, FIELD_W)<<8;
            this.y = 0;
        } 
    }
}

//initialize
function gameInit(){
    setInterval(gameLoop, GAME_SPEED)
    for(let i=0 ; i<STAR_MAX ; i++)star[i] = new Star();
}

//game Loop
function gameLoop(){
    //移動処理
    for(let i=0 ; i<STAR_MAX ; i++)star[i].update();
    player.apdate();
    //描画処理
    vcont.fillStyle = "black";
    vcont.fillRect(0, 0, SCREEN_W, SCREEN_H);
    for(let i=0 ; i<STAR_MAX ; i++)star[i].draw();
    r = random(0,2);
    player.draw(r);
    //仮装画面から実際のキャンバスにコピー
    cont.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);
    //ループ終了
}


//オンロードでゲーム開始
window.onload = function(){
    gameInit();
}