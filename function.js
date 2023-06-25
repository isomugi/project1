//for function setting
//キーボード処理
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

//draw sprite
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

//矩形同士の当たり判定
function checkHitRect(bullet, character, s=1){
    let bx = bullet.x>>8;
    let by = bullet.y>>8;
    let bw = bullet.w;
    let bh = bullet.h;
    let cx = character.x>>8;
    let cy = character.y>>8;
    let cw = character.w*s;
    let ch = character.h*s;
    if(bx<=cx+cw){
        if(bx+bw>=cx){
            if(by<=cy+ch){
                if(by+bh>=cy)return true;
            }
        }
    }
}

//円同士の当たり判定
function checkHitCirc(bullet, character, s=1){
    let a = (character.x - bullet.x)>>8;
    let b = (character.y - bullet.y)>>8;
    let r = character.w/2*s + bullet.w/2;
    if(a*a+b*b<=r*r)return true;
}
