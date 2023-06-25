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

