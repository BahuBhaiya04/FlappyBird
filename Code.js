//--------------------Variables declaration--------------------\\
console.log('Code.js Imported');
let obstacle = document.body.querySelector(".obstacle");
let playground = document.body.querySelector(".child-background");
// console.log(obstacle);
let background = document.body.querySelector(".background");

let i=0;
let drone = document.body.querySelector(".drone");

//To Halt All ruunning Functions as soon as game ends
let isRunning = false;  

console.log(getComputedStyle(background).width);

//--------------------Obstacle Designing--------------------\\
function obstacle_displacer(params,s) {
    params.style.transform = `translateX(${s}px)`;
}

obstacle_displacer(obstacle)

function obstacle_render(params) {
    
}

function obstacle_generator(){
    
    console.log(i);
    i++

    //obstacle creation
    let new_obstacle = document.createElement('div');
    new_obstacle.setAttribute('class','obstacle')
    playground.append(new_obstacle);
    // tracker_module(new_obstacle);
    
    // obstacle removal
    new_obstacle.addEventListener('animationend', ()=>{
        new_obstacle.remove();
        console.log('Obstacle Removed');
    })

    if(i<10){
        setTimeout(obstacle_generator,3000);//call back recursive function
    }

}



//--------------------Bird Building--------------------\\
function distance_module() {
    
    let initial_drone_position_bottom = drone.getBoundingClientRect().bottom
    let initial_drone_position_top = drone.getBoundingClientRect().top

    let offset = ground-initial_drone_position_bottom;
    let offset_ceil = ceiling-initial_drone_position_top;
    let position_dataset = [offset,offset_ceil]

    // console.log('distance_module offset val',offset,initial_drone_position_bottom,initial_drone_position_top,ground, ceiling);
    return position_dataset;
}

let ceiling = playground.getBoundingClientRect().top
let ground = playground.getBoundingClientRect().bottom//not in distance odule because no need for dynaic offset


let offset = distance_module()[0];
let offset_ceil = distance_module()[1];
console.log(offset_ceil);

// drone.style.transform = `translateY(${offset}px)`;
function bird_tilt(params) {
    if(isRunning){
        params.style.transform = `rotate(${-45}deg)`;
    }
    else{
        params.style.transform = `rotate(${45}deg)`;
    }
}
bird_tilt(drone)



//--------------------Game Physics--------------------\\
function gravity(Target,t) {
    
    let u = 0
    let g = 0.0007;
    console.log("value of s at start of gravity module",s);
    console.log("offset from ground ",offset);

    // let t = tFin - tIni;
    //     tIni = tFin;

        u = u+ g*t;
        s = s+ u*t;
        
        console.log("gravity_module",s);

        //Gravity halting command
        if(s>=offset ) {
            console.log("gravity cancel by gravity offset statement");
            s = offset;
            game_loop_runner = false;
            Target.style.transform = `translateY(${s}px)`;
            return;
        }
        if(isRunning){
            console.log("gravity cancel by is running statement ");
            Target.style.transform = `translateY(${s}px)`;
            return;
        }
        
    Target.style.transform = `translateY(${s}px)`;
    return s;
    // function timer(tFin) {
    //     let t = tFin - tIni;
    //     tIni = tFin;

    //     u = u+ g*t;
    //     s = s+ u*t;
        
    //     console.log("gravity_module",s);
    //     if(s>=offset ) {
    //         console.log("gravity cancel by gravity offset statement");
    //         s = offset
    //         Target.style.transform = `translateY(${s}px)`;
    //         return;
    //     }
    //     if(isRunning){
    //         console.log("gravity cancel by is running statement ");
            
    //         Target.style.transform = `translateY(${s}px)`;
    //         return;
    //     }
    //     Target.style.transform = `translateY(${s}px)`;
    //     requestAnimationFrame(timer);
    // }
    // requestAnimationFrame(timer)
}

//booster
function booster(params,time) {
    if (isRunning)return;

    isRunning = true;
    let u = -1;
    let jump_cal = s-(ground*0.1);
    console.log("jump_cal",jump_cal);

    let t = 20; //t aint time its distancing function

        s += u*t;
        params.style.transform = `translateY(${s}px)`
        console.log("booster module",s);

        //jummp calibration
        if (s<=offset_ceil) {
            s = offset_ceil
            params.style.transform = `translateY(${s}px)`;
            return;
        }
        if(s<=jump_cal){
            console.log("jump_cal done return", s);
            isRunning = false
            gravity(params,time)
            return;
        }
    // function timer(time) {
    //     let t = 20;

    //     s += u*t;
    //     params.style.transform = `translateY(${s}px)`
    //     console.log("booster module",s);

    //     //jummp calibration
    //     if (s<=offset_ceil) {
    //         s = offset_ceil
    //         params.style.transform = `translateY(${s}px)`;
    //         return;
    //     }
    //     if(s<=jump_cal){
    //         console.log("jump_cal done return", s);
    //         isRunning = false
    //         gravity(params,time)
    //         return;
    //     }
        
    //     requestAnimationFrame(timer);
    // }

    // requestAnimationFrame(timer)
}


//-----------------GameLoop----------------\\
let tIni = 0;
let game_loop_runner = true
function game_loop(time) {
    
    let tFin = time-tIni;
    tIni = time;

    gravity(drone,tFin)
    if (game_loop_runner) {
        requestAnimationFrame(game_loop)
    }
    if(game_loop_runner ==false){
        console.log("gameloop exit");
        return;
    }
}
requestAnimationFrame(game_loop)

//--------------------Input Events--------------------\\
let first_start = true
let s = 0;  //initial value of translate 
document.addEventListener('click',(e)=>{
    console.log("event listner s value",s);
    console.log(" click event");
    
    let gravity = false;
    if (first_start == false) {
        booster(drone)
    }
    if (first_start) {
        requestAnimationFrame(game_loop)
        first_start = false;
    }
})