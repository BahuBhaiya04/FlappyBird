//--------------------Variables declaration--------------------\\
console.log('Code.js Imported');
let obstacle = document.body.querySelector(".obstacle");
let playground = document.body.querySelector(".child-background");
// console.log(obstacle);
let background = document.body.querySelector(".background");

let i=0;

//Bird is drone
let drone = document.body.querySelector(".drone");

//for Booster module
let booster_isRunning = false;

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

// drone.style.transform = `translateY(${offset}px)`;
function bird_tilt(params) {
    if(booster_isRunning){
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
    let g = 0.02;
    
    s = s+ g*t*t;
        
    //Gravity halting commands
    if(s>=offset ) {
        console.log("gravity cancel by gravity offset statement");
        s = offset;
        game_loop_isRunning = false;   //Halts game_loop Funtion
        Target.style.transform = `translateY(${s}px)`;
        return;
    }
    if(booster_isRunning){
        console.log("gravity cancel by is running statement ");
        Target.style.transform = `translateY(${s}px)`;
        return;
    }
        
    Target.style.transform = `translateY(${s}px)`;
    requestAnimationFrame(game_loop);
    return s;
}

//-------------Booster for Drone
//"t" variable is not required for booster
// But to transfer seamlessly for gravity again
function booster(params,time) {
    console.log("boosteron");
    
    if (booster_isRunning)return;
    booster_isRunning = true;
    console.log('definitelyon');
    
    //final value to which booster applies
    let jump_cal = s-(ground*0.1); 
    console.log("jump_cal",jump_cal);

    // "s" translates as RAF gives frames to change continuously via obj
        let u = -0.2; // must be negative
        s += u*time*time;
        params.style.transform = `translateY(${s}px)`
        console.log("booster module",s);

    //jummp calibration
    if (s<=offset_ceil) {
        s = offset_ceil
        params.style.transform = `translateY(${s}px)`;
        return game_loop_isRunning = false;
    }
    if(s<=jump_cal){
        console.log("jump_cal done return", s);
        booster_isRunning = false;
        gravity(params,time)
        return;
    }
    requestAnimationFrame(game_loop);
}


//-----------------GameLoop----------------\\
let s = 0;  //initial value of translate of drone
let tIni = 0;
let game_loop_isRunning = true;

function game_loop(time) {
    
    
    //--Counts ms of each Frame--\\
    let tFin = time-tIni; 
    tIni = time;
    //---------------------------\\

    //Exit Conditions
    if(game_loop_isRunning == false){
        console.log("gameloop exit");
        return;
    }
    
}

//--------------------Input Events--------------------\\
let isfirst_click = true
document.addEventListener('click',(e)=>{

    // let gravity = false;
    if (isfirst_click == false) {
        booster(drone,time)
    }
    if (isfirst_click) {
        game_loop(16.6); //Starts game
        isfirst_click = false;
    }
})