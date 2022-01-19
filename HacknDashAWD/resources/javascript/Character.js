import { Collision,YPosition } from "./Platform.js";

let posy = 0;
let posx = 0;
let vx = 0;
let vy = 0;
let cube = document.getElementById("player");
let cubeBounds = cube.getBoundingClientRect();
let holdLeft = false;
let holdRight = false;
let onGround = false;
let gravity = 0.2;
let friction = 0.5;
let deltaTime;

// Update Player Position
export function PlayerUpdate(dt){
    
    deltaTime = dt;
    updatePosition();
    
    cube.style.top = posy+"px";
    cube.style.left = posx+"px";
}

// Events for Movement
export function RegisterEventListener(){

    window.addEventListener("keydown", function(event) {

        if (event.code === "ArrowUp"){

            if(onGround){
                onGround = false;
                vy = -2;
            }
            
        } else if (event.code === "ArrowLeft"){

            holdLeft = true;

            if(onGround){
                vx = -0.5;
            }else{
                vx = -0.2;
            }
            
        } else if (event.code === "ArrowRight"){

            holdRight = true;

            if(onGround){
                vx = 0.5;
            }else{
                vx = 0.2;
            }
            
        }

        event.preventDefault();

    }, true)

    window.addEventListener("keyup", function(event) {

        if (event.code === "ArrowRight"){

            holdRight = false;
            
        } else if (event.code === "ArrowLeft"){

            holdLeft = false;
        }

        event.preventDefault();

    }, true)


}

// Updates Position regarding the cubes velocity
function updatePosition(){

    vy = vy+gravity;

    if(!holdLeft&&onGround&&vx<0){
        vx = vx*friction;
    }
    if(!holdRight&&onGround&&vx>0){
        vx = vx*friction;
    }
    if(-0.1<=vx&&vx<=0.1){
        vx=0;
    }

    posx = updateXPosition(vx);
    posy = updateYPosition(vy)

}

// Update Position for X, Spawns on opposite side on leaving window
function updateXPosition(moverate){


    posx = posx + moverate*deltaTime;

    if(posx<0){
        posx = 0;
    }else if (posx>window.innerWidth-cubeBounds.width) {
        posx = window.innerWidth-cubeBounds.width;
    }

    return posx;

}

// Update Position for Y, Spawns on opposite side on leaving window
function updateYPosition(moverate){

    posy = posy + moverate*deltaTime;

    onGround = false;

    if (posy>window.innerHeight-cubeBounds.height) {
        posy = window.innerHeight-cubeBounds.height;
        onGround = true;
    } else if(moverate>0&&Collision()){
        posy = YPosition()-cubeBounds.height;
        vy = 0;
        onGround = true;
    }

    return posy;

}

    


