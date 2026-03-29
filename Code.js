console.log('Code.js Imported');
let obstacle = document.body.querySelector(".obstacle");
let playground = document.body.querySelector(".child-background");
// console.log(obstacle);
let i=0;
let drone = document.body.querySelector(".drone");

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


function obstacle_render(params) {
    
}
//obstacle_generator();
// Drone Creation 

// let a = window.getComputedStyle(drone);
// console.log(a);

//function drone_booster(param) {


    // param.style.animation = 'none';
    // param.offsetHeight;
    // param.style.animation = 'modi-flapper 0.5s linear forwards';
    // drone.addEventListener('animationend',()=>{
    //     console.log('end');
    //     drone.style.animation = 'gravity .7s cubic-bezier(0.5, 0.03, 1, 0.49) forwards';
    // })

    //event listners stack they dont get erased unless done
    // inside browser 'Event Target Listener Registry'

    // to avoid that two ways
    // document.removeEventListener('click', handler);[this too]
    // document.addEventListener('click', handler, { once: true }); [heavy on light devices]



    // setTimeout(() => {
    //     drone.style.animation = 'gravity 0.7s cubic-bezier(0.5, 0.03, 1, 0.49) forwards'
    // }, 500);

    //this will not stop to overwrite the continuous click command 
    // drone will not work well
//}

//make a complete independent listener whichh will stay and is stable

// drone.addEventListener('animationend',(e)=>{
//     drone.style.animation = 'gravity .7s cubic-bezier(0.5, 0.03, 1, 0.49) forwards';
//     console.log(e)
// })


let isRunning = false;
//better gravity

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

function gravity(Target,tIni) {
    let u = 0
    let g = 0.0007;
    console.log("value of s at start of gravity module",s);
    console.log("offset from ground ",offset);

    function timer(tFin) {
        
        
        let t = tFin - tIni;
        tIni = tFin;

        u = u+ g*t;
        s = s+ u*t;
        
        console.log("gravity_module",s);
        if(s>=offset ) {
            console.log("gravity cancel by gravity offset statement");
            s = offset
            Target.style.transform = `translateY(${s}px)`;
            return;
        }
        if(isRunning){
            console.log("gravity cancel by is running statement ");
            
            Target.style.transform = `translateY(${s}px)`;
            return;
        }
        Target.style.transform = `translateY(${s}px)`;
        requestAnimationFrame(timer);
    }
    requestAnimationFrame(timer)
    return s;
}
//better booster
function booster(params) {
    if (isRunning)return;
    isRunning = true;

    let u = -1;
    let jump_cal = s-(ground*0.1);
    console.log("jump_cal",jump_cal);

    function timer(time) {
        let t = 20;

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
        
        requestAnimationFrame(timer);
    }

    requestAnimationFrame(timer)
}

let s = 0;  //initial value of translate 
document.addEventListener('click',(e)=>{
    console.log("event listner s value",s);
    console.log(" click event");
    let gravity = false;
    booster(drone)})


// function tracker() {
//     let drone_coordinates = drone.getBoundingClientRect();
//     let playground_coordinates = playground.getBoundingClientRect();
//     console.log('tracker info');
//     console.log(drone_coordinates,playground_coordinates);
// }

// do {
    
// } while ();


// cooordinate tracking
// function tracker(time) {
//     requestAnimationFrame(tracker);
// }
// function create_tracker(params) {
//     const obj = params.getBoundingClientRect();
//     console.log(obj.x,obj.y);
//     tracker();
// }


// function tracker_module(element){
//     function fps_module(time) {
//         console.log(element.getBoundingClientRect(),time);
//         requestAnimationFrame(fps_module)
//     }
//     fps_module();
// }