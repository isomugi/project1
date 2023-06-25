//その他class
//charactor base
class CharacterBase{
    constructor(x, y, vx, vy, snum){
        this.snum = snum;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.delFlag = false;
        this.w = sprite[snum].w;
        this.h = sprite[snum].h;
        this.dead = 0;
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