//debug
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//smoothing
const SMOOTHING = false;

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

//キャンバスを定義
let can = document.getElementById("can");
let cont = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;
cont.mozimageSmoothingEnabled = SMOOTHING;
cont.webkitimageSmoothingEnabled = SMOOTHING;
cont.msimageSmoothingEnabled = SMOOTHING;
cont,imageSmoothingEnabled = SMOOTHING;

//フィールド(仮装画面)を定義
let vcan = document.createElement("canvas");
let vcont = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;

//camera
let camera_x = 0;
let camera_y = 0;

//Sprite
let SpriteImage = new Image();
SpriteImage.src = "sprite.png";

let bullets = [];

let enemies = [];
let enemyName = []
let enemybullets = [];

let player = new Player;

let stars = [];

let count=0;
num=0;

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
        cont.fillText('FPS:'+fps, 20, 80)
        cont.fillText('PlayerBullets:'+bullets.length, 20, 20)
        cont.fillText('Enemies:'+enemies.length, 20, 40)
        cont.fillText('EnemyBullets:'+enemybullets.length, 20, 60)
    }
}

//initialize
function gameInit(){
    setInterval(gameLoop, GAME_SPEED)
    //requestAnimationFrame()
    for(let i=0 ; i<STAR_MAX ; i++)stars[i] = new Star();
}

//移動処理
function upadateAll(){
    updateObject(stars);
    updateObject(bullets);
    updateObject(enemies);
    updateObject(enemybullets);
    player.update();
}

//描画処理
function drawAll(){
    vcont.fillStyle = "black";
    vcont.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);
    drawObject(stars);
    drawObject(bullets);
    drawObject(enemies);
    drawObject(enemybullets);
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

//game Loop
function gameLoop(){
    if(random(0,50)==1){
        enemies.push(new Enemy(random(0,FIELD_W)<<8, 0, random(-256, 256), random(512,1024)))
    }
    upadateAll();

    drawAll();

    debugShow();
    //ループ終了
}


//オンロードでゲーム開始
window.onload = function(){
    gameInit();
}