//--------------------Variables declaration--------------------\\
console.log('Code.js Imported');
let obstacle = document.body.querySelector(".obstacle");
let playground = document.body.querySelector(".child-background");
//Bird is drone
let drone = document.body.querySelector(".drone");

//for Booster module
let booster_isRunning = false;

//--------------------Obstacle Designing--------------------\\
const obstacleWidth = obstacle.getBoundingClientRect().width;
const playWidth = playground.getBoundingClientRect().width;

function obstacle_append(time) {

    const obst = document.createElement('div');
    obst.setAttribute('class','obstacle');
    playground.append(obst);

    const pipeUp = document.createElement('div')
    pipeUp.setAttribute('class','pipeUp pipe');
    obst.append(pipeUp);

    const opening = document.createElement('div')
    opening.setAttribute('class','opening');
    obst.append(opening);

    const opening2 = document.createElement('div')
    opening2.setAttribute('class','opening2');
    opening.append(opening2);

    const pipeDown = document.createElement('div')
    pipeDown.setAttribute('class','pipeDown pipe');
    obst.append(pipeDown);


    do {
        pipeUpHeight = (Math.random()*70)+15;
        openingHeight = (Math.random()*15)+25;

    } while ((pipeUpHeight+openingHeight)>110);
    
    objectArr.push({
        element: obst,
        x:0,
        pipeUpHeight:pipeUpHeight,
        openingHeight:openingHeight
    })
}

let objectArr =[{
    element:obstacle,
    x:0,
    pipeUpHeight:50,
    openingHeight:30
}];
let pipeUpHeight,openingHeight;
let v = 5;
let droneCalibrate = drone.getBoundingClientRect().width;
function obstacle_displacer() {
    for (let i = 0; i < objectArr.length; i++) {
        
        objectArr[i].x += v;     
        objectArr[i].element.style.transform = `translateX(${-objectArr[i].x}px)`;
        objectArr[i].element.style.setProperty("--openingHeight",`${objectArr[i].openingHeight}%`)
        objectArr[i].element.style.setProperty("--pipeUpHeight",`${objectArr[i].pipeUpHeight}%`)
        
        if (objectArr[i].x > (playWidth+obstacleWidth)) {
        objectArr[i].element.remove();
        objectArr.shift();
        }
        if (objectArr[i].x+droneCalibrate > playWidth * 0.75 &&
            objectArr[i].x+droneCalibrate < playWidth * 0.90) {            
            collusionCheck(i);
        }
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


let offset_floor = distance_module()[0];
let offset_ceil = distance_module()[1];


//--------------------Game Physics--------------------\\
function gravity(Target,t) {
    
    let u = 0
    let g = 0.015;
    
    s = s+ g*t*t;
        
    //Gravity halting commands
    if(s>=offset_floor) {
        console.log("gravity cancel by gravity offset statement");
        s = offset_floor;
        game_loop_isRunning = false;//Halts game_loop Funtion
        Target.style.transform = `translateY(${s}px)`;
        return;
    }
    Target.style.transform = `translateY(${s}px) rotate(${deg}deg)`;
    return s;
}

//-------------Booster for Drone
//"t" variable is not required for booster
// But to transfer seamlessly for gravity again
let jump_cal, sumation;
let deg = 25;
let u = -0.3;// must be negative
function booster(params,time,jump_cal) {
    // "s" translates as RAF gives frames to change continuously via obj
        s += u*time;
        params.style.transform = `translateY(${s}px) rotate(${-deg}deg)`
        
    //jummp calibration
    if (s<=offset_ceil) {
        s = offset_ceil
        params.style.transform = `translateY(${s}px)`;
        return game_loop_isRunning = false;
    }
    if(s<=jump_cal){
        booster_isRunning = false;
        return;
    }
}

//-----------------CollusionEngineering-----------------\\
let opening = document.body.querySelector('.opening');
let obstacleHeight = obstacle.getBoundingClientRect().height;
let pipeUpHeightTrue ,droneHeight;
let score = 0;
function collusionCheck(i) {
    pipeUpHeightTrue = 0.01*((objectArr[i].pipeUpHeight)*obstacleHeight - 0.5*obstacleHeight*(objectArr[i].openingHeight))

    droneHeight = drone.getBoundingClientRect().top-ceiling;  
    
    //Collusion True
    if (droneHeight>pipeUpHeightTrue && droneHeight<pipeUpHeightTrue+0.01*obstacleHeight*(objectArr[i].openingHeight)) {
        return;
    }
    game_loop_isRunning = false;
}
//----------------ScoringSystem-------------\\
let scoreBox = document.getElementById("number")
console.log(scoreBox);
// score += 1;
// scoreBox.textContent = score;


//-----------BackgroundDisplacer-------------\\
let backImg = document.body.querySelector('.background');
let n = 0
function backgroundDisplacer() {
    n += 1;
    backImg.style.backgroundPosition = `${-n}px`;
}



//-----------------GameLoop----------------\\
let s = 0;  //initial value of translate of drone
let lastTime, tInit, deltaTime;
let game_loop_isRunning = true;
function game_loop(timeRn) {
    
    //--Counts ms of each Frame--\\
    if (lastTime == undefined) {

        lastTime = timeRn;
        tInit = timeRn;

        requestAnimationFrame(game_loop);
        return;
    }
    backgroundDisplacer()

    //=========FrameTimeCalculator========\\
    deltaTime = timeRn-lastTime; 
    lastTime = timeRn;
    
    //=====BoosterGravityFunctionDecision====\\
    if(booster_isRunning){
        booster(drone,deltaTime,jump_cal);

    }else{
        gravity(drone,deltaTime);
    }

    //===========ObstacleWorking==========\\
    if (timeRn > tInit+2000) {
        tInit = timeRn;
        score += 1;
        scoreBox.textContent = score;
        obstacle_append();
    }
    
    obstacle_displacer();
    
    //=========ExitConditions=========\\
    if(game_loop_isRunning == false){
        return;
    }
    requestAnimationFrame(game_loop);
}

//--------------------Input Events--------------------\\
let isfirst_click = true
document.addEventListener('click',(e)=>{

    // let gravity = false;
    if (isfirst_click == false) {
        jump_cal= s-(ground*0.08);
        booster_isRunning = true;
    }
    if (isfirst_click) {
        jump_cal= s-(ground*0.08);
        isfirst_click = false;
        booster_isRunning = true;
        
        requestAnimationFrame(game_loop); //Starts game
    }
})