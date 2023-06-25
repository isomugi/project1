//for player setting

//player
class Player{
    constructor(){
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/2)<<8;
        this.speed = 512;
        this.anime = 0;
        this.reload = 0;
        this.reload2 = 0;
        this.delFlag = false;
    }

    update(){
        if(keys.includes('Space') && this.reload == 0){
            bullets.push(new Bullet(this.x-(8<<8), this.y-(4<<8), 0, -1400));
            bullets.push(new Bullet(this.x+(8 <<8), this.y-(4<<8), 0, -1400));
            bullets.push(new Bullet(this.x-(8<<8), this.y-(4<<8), -256, -1400, 3));
            bullets.push(new Bullet(this.x+(8 <<8), this.y-(4<<8), 256, -1400, 3 ));
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

//bullet
class Bullet extends CharacterBase{
    constructor(x, y, vx, xy, snum = 4){
        super(x, y, vx, xy, snum);
    }
    update(){
        super.update();
        for(let i=0 ; i<enemies.length ; i++){
            if(!enemies[i].kill){
                if(checkHitCirc(this, enemies[i])){
                    if(this.snum == 3){
                        enemies[i].dead++;
                    }else if(this.snum == 4){
                        enemies[i].dead+=2;
                    }
                    this.dead++;
                    break;
                }
            }
        }
        if(this.dead>=1)this.delFlag = true;
    }
    draw(){
        super.draw();
    }
}

