//for enemy setting
//enemy
class Enemy extends CharacterBase{
    constructor(x, y, vx, vy, snum=5){
        super(x, y, vx, vy, snum);
        this.reload = 0;
        this.reload2 = 0;
        this.sw = sprite[snum].w;
        this.sh = sprite[snum].h;
    }

    update(){
        super.update();
        if(this.reload == 0){
            bullets.push(new Bullet(this.x, this.y+this.sh*2, -1000, 0, this.snum+2));
            //bullets.push(new Bullet(this.x+this.sw, this.y, 0, 1000, this.snum+2));
            //bullets.push(new Bullet(this.x+this.sw, this.y+this.sh, -1000, 0, this.snum+2));
            //bullets.push(new Bullet(this.x+this.sw, this.y+this.sh, 0, 1000, this.snum+2));
            this.reload = 10;
            if(++this.reload2 == 4){
                this.reload = 20;
                this.reload2 = 0;
            }
        }
        this.reload--;
        
    }

    draw(){
        super.draw(2);
    }
}
