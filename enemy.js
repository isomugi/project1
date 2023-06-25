//for enemy setting
//enemy
class Enemy extends CharacterBase{
    constructor(x, y, vx, vy, snum=5){
        super(x, y, vx, vy, snum);
        this.reload = 0;
        this.reload2 = 0;
        this.bullet = snum+2;
        this.flag = false;
        this.count = 0;
    }

    update(){
        super.update();
        if(Math.abs(this.y - player.y)<(100<<8) && !this.flag){
            this.flag = true;
        }
        if(!this.flag){
            if(this.x<player.x && this.vx < 128)this.vx+=8;
            else if(this.x>player.x && this.vx >-128)this.vx-=8;
        }else{
            if(this.x<player.x && this.vx < 128)this.vx-=16;
            else if(this.x>player.x && this.vx >-128)this.vx+=16;
        }
        if(this.flag && this.vy>-800)this.vy-=32;
        if(this.reload == 0){
            let an = Math.atan2(player.y - this.y, player.x - this.x);
            an += random(-10,10)*Math.PI/180; //*Math.PI/180は弧度法（ラジアン）にしている
            let dx = Math.cos(an)*1000;
            let dy = Math.sin(an)*1000;
            if(this.flag)enemybullets.push(new EnemyBullet(this.x+this.w, this.y+this.h, dx, dy, this.bullet));
            this.reload = 10;
            if(++this.reload2 == 3){
                this.reload = 20;
                this.reload2 = 0;
            }
        }
        this.reload--;
        if(this.dead >= 4)this.delFlag = true;
    }

    draw(){
        if(this.flag && this.count==0){
            this.snum+=1;
            this.count++;
        }
        super.draw(2);
    }
}

//enemy bullet
class EnemyBullet extends CharacterBase{
    draw(){
        super.draw()
    }
}