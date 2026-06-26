
console.log('Test.js Imported');
let obstacle = document.body.querySelector(".obstacle");
let playground = document.body.querySelector(".child-background");
// console.log(obstacle);
let background = document.body.querySelector(".background");

let i=0;

//Bird is drone
let drone = document.body.querySelector(".drone");

let droneTilt=0;
domain = 50
p = 1/50;
function rotator(time) {

    // droneTilt = 1-p*p*p;
    // p = p+(1/50);
    droneTilt = droneTilt+((1-p*p*p));
    drone.style.transform = `rotate(${droneTilt}deg)`;
    requestAnimationFrame(rotator)
    console.log(time,p,droneTilt);
    
}
drone.addEventListener('click',()=>{
    requestAnimationFrame(rotator);
})



// _______________________ObstacleEngg________________________\\
const obstacleWidth = obstacle.getBoundingClientRect().width;
const playWidth = playground.getBoundingClientRect().width;
console.log(playWidth+obstacleWidth);
function obstacle_append(time) {

    const obj = document.createElement('div');
    obj.setAttribute('class','obstacle');
    playground.append(obj);

    objectArr.push({
        element: obj,
        x:0
    })
}

let objectArr =[{
    element:obstacle,
    x:0
}];
let v = 5;


function obstacle_displacer() {
    for (let i = 0; i < objectArr.length; i++) {
        
        objectArr[i].x += v;     
        objectArr[i].element.style.transform = `translate(${-objectArr[i].x}px)`;
        
        if (objectArr[i].x > (playWidth+obstacleWidth)) {
        objectArr[i].element.remove();
        objectArr.shift();
    }}
}

let lastTime, tInit;
function timer(timeRn) {

    if(lastTime == undefined){

        lastTime = timeRn;
        tInit = timeRn;

        requestAnimationFrame(timer);
        return;
    }
    
    if (timeRn > tInit+3000) {
        tInit = timeRn;
        obstacle_append();
    }
    obstacle_displacer();
    requestAnimationFrame(timer)
}
requestAnimationFrame(timer)