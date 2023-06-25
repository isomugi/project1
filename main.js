//debug
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

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

//keybord
let keys = [];
let keyCode = '';

document.onkeydown = function(evt){
    keyCode = evt.code;
    keys.push(keyCode);
}

document.onkeyup = function(evt){
    keyCode = evt.code;
    removal = [keyCode];
    keys = keys.filter(function(v){
        return ! removal.includes(v);
    });
}

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

//camera
let camera_x = 0;
let camera_y = 0;

//random
function random(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

//update objects
function updateObject(objects){
    for(let i=objects.length-1 ; i>=0 ; i--){
        objects[i].update();
        if(objects[i].delFlag)objects.splice(i,1);
    }
}

//draw objects
function drawObject(objects){
    for(let i=0 ; i<objects.length ; i++)objects[i].draw();
}

//Sprite
let SpriteImage = new Image();
SpriteImage.src = "sprite.png";

class Sprite{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

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

function drawSprite(snum, x, y, s=1){
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;
    
    let px = (x>>8) - sw/2;
    let py = (y>>8) - sh/2;

    if(px+sw*s<camera_x || px>=camera_x + SCREEN_W || py+sh*s<camera_y || py>=camera_y + SCREEN_H) return;
    vcont.drawImage(SpriteImage, sx, sy, sw, sh, px, py, sw*s, sh*s);
}

//charactor base
class CharactorBase{
    constructor(x, y, vx, vy, snum){
        this.snum = snum;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.delFlag = false;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0 || this.x > FIELD_W<<8 || this.y <0 || this.y > FIELD_H<<8)this.delFlag = true;
    }

    draw(s=1){
        drawSprite(this.snum, this.x, this.y, s);
    }
}
//bullet
class Bullet extends CharactorBase{
    constructor(x, y, vx, xy, snum = 3){
        super(x, y, vx, xy, snum);
    }
    update(){
        super.update();
    }
    draw(){
        super.draw();
    }
}

let bullets = [];

//enemy
class Enemy extends CharactorBase{
    constructor(x, y, vx, vy, snum){
        super(x, y, vx, vy, snum);
    }

    update(){//snum,num
        super.update();
        //this.snum = snum + num;
    }

    draw(){
        super.draw(2);
    }
}

let enemies = [
    new Enemy(100<<8, 100<<8, 0, 0, 5),
    new Enemy(200<<8, 200<<8, 0, 0, 8),
]

//player
class Player{
    constructor(){
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/2)<<8;
        this.speed = 512;
        this.anime = 0;
        this.reload = 0;
        this.reload2 = 0;
    }

    update(){
        if(keys.includes('Space') && this.reload == 0){
            bullets.push(new Bullet(this.x-(8<<8), this.y-(4<<8), 0, -1400));
            bullets.push(new Bullet(this.x+(8 <<8), this.y-(4<<8), 0, -1400));
            bullets.push(new Bullet(this.x-(8<<8), this.y-(4<<8), -256, -1400));
            bullets.push(new Bullet(this.x+(8 <<8), this.y-(4<<8), 256, -1400));
            this.reload = 10;
            //数発打ったら遅延
            if(++this.reload2 == 4){
                this.reload = 20;
                this.reload2 = 0;
            }
        }
        if(this.reload > 0)this.reload--;
        if(!keys.includes('Space'))this.reload = 0;
        if(keys.includes('ArrowLeft') && this.x > this.speed)this.x -= this.speed;
        if(keys.includes('ArrowUp') && this.y > this.speed)this.y -= this.speed;
        if(keys.includes('ArrowRight') && this.x < (FIELD_W<<8) - this.speed)this.x += this.speed;
        if(keys.includes('ArrowDown') && this.y < (FIELD_H<<8) - this.speed)this.y += this.speed;
    }

    draw(r){
        //r = random(0,2);
        drawSprite(r, this.x, this.y);
    }
}

let player = new Player;

//star
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
    //フレーム毎にどれだけ動かすか
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.y > FIELD_H<<8){
            this.x = random(0, FIELD_W)<<8;
            this.y = 0;
        } 
    }
}

let stars = [];

//initialize
function gameInit(){
    setInterval(gameLoop, GAME_SPEED)
    //requestAnimationFrame()
    for(let i=0 ; i<STAR_MAX ; i++)stars[i] = new Star();
}

let count=0;
num=0;

//移動処理
function upadateAll(){
    updateObject(stars);
    updateObject(bullets);
    updateObject(enemies);
    player.update();
}

//描画処理
function drawAll(){
    vcont.fillStyle = "black";
    vcont.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
    drawObject(stars);
    drawObject(bullets);
    drawObject(enemies);
    r = random(0,2);
    player.draw(r);

    //drawSprite(5, 100<<8, 100<8);

    //player 0 ~ FIELD_W
    //camera 0 ~ FIELD_W - SCREEN_W
    camera_x = (player.x>>8)/FIELD_W * (FIELD_W - SCREEN_W);
    camera_y = (player.y>>8)/FIELD_H * (FIELD_H - SCREEN_H);

    //仮装画面から実際のキャンバスにコピー
    cont.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);
}

//デバッグ情報表示
function debugShow(){
    if(DEBUG){
        drawCount++;
        if(lastTime + 1000 <= Date.now()){
            fps = drawCount;
            drawCount = 0;
            lastTime = Date.now()
        }
        cont.font = "20px 'Impact'";
        cont.fillStyle = "white";
        cont.fillText('FPS:'+fps, 120, 20)
        cont.fillText('Bullets:'+bullets.length, 20, 20)
        cont.fillText('Enemies:'+enemies.length, 20, 40)
    }
}

//game Loop
function gameLoop(){
    upadateAll();

    drawAll();

    debugShow();
    //ループ終了
}


//オンロードでゲーム開始
window.onload = function(){
    gameInit();
}