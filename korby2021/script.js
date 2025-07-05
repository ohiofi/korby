/*global createCamera, pineWood, Platform, Building, shininess, treeTexture1, treeTexture2, Bat, CameraObject,specularMaterial, Coin,texture, WaterBarrier, Sheep, ambientLight, directionalLight, Pine, PlayerObject, GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
const GRAVITY = 0.1;
let worldSize = 2000;
let objectArray
let waterFrames = [];
const scoreDisplay = document.getElementById("scoreDiv");
let score = 0;
let myFont,cam,player;
let daylightAmplitude = 100;
let daylightFrequency = 0.1; // This is too fast.
let totalFps = 0;
let fpsArray = [];

let treeTexture;
let avatarFace;
let sheepFur;
let grass;

let gameState = "title";

let sfx = {}; 
var imgs = {};


function preload(){
  for (let i=0;i<120;i++){
    fpsArray.push(60)
  }
  myFont = loadFont("./PressStart2P.ttf");
  sfx.coin = new Audio("./assets/Coin-pick-up-sound-effect.mp3");
  imgs.avatarFace = loadImage("./assets/download.jpg");
  imgs.treeTexture1 = loadImage("./assets/800px_COLOURBOX30036537.jpg");
  imgs.treeTexture2 = loadImage("./assets/treeLeaves.bmp");
  imgs.metal = loadImage("./assets/guerd-alberts-metalpanelwip.jpg");
  imgs.sheepFur = loadImage("./assets/download.jpg");
  imgs.pineWood = loadImage("./assets/th.jpg");
  imgs.batFace = loadImage("./assets/9c8f554844641fa79434e9562709e496.jpg");
  imgs.batWing = loadImage("./assets/download.jpg");
  imgs.bldg1 = loadImage("./assets/building01.jpg");
  imgs.bldg2 = loadImage("./assets/building02.jpg");
  imgs.bldg3 = loadImage("./assets/building03.jpg");
  imgs.bldg4 = loadImage("./assets/building04.jpg");
  imgs.bldg5 = loadImage("./assets/building05.jpg");
  imgs.bldg6 = loadImage("./assets/building06.jpg");
  imgs.bldg7 = loadImage("./assets/building07.jpg");
  imgs.bldg8 = loadImage("./assets/building08.jpg");
  imgs.grass = loadImage("./assets/dylan-papp-pg-v3-base-color.jpg");
  imgs.waterFrame1 = loadImage("./assets/water%20frame%201.png");
  imgs.waterFrame2 = loadImage("./assets/water%20frame%202.png");
  imgs.waterFrame3 = loadImage("./assets/water%20frame%203.png");
  imgs.waterFrame4 = loadImage("./assets/water%20frame%204.png");
  imgs.waterFrame5 = loadImage("./assets/water%20frame%205.png");
  imgs.waterFrame6 = loadImage("./assets/water%20frame%206.png");
  imgs.waterFrame7 = loadImage("./assets/water%20frame%207.png");
  imgs.waterFrame8 = loadImage("./assets/water%20frame%208.png");
  waterFrames.push(imgs.waterFrame1, imgs.waterFrame2, imgs.waterFrame3, imgs.waterFrame4, imgs.waterFrame5, imgs.waterFrame6, imgs.waterFrame7, imgs.waterFrame8)
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight - 20, WEBGL);
  setAttributes("antialias", true);
  cam = new CameraObject();
  
}
function reset() {
  objectArray = [];
  score = 0;
  scoreDisplay.innerHTML = score;
  //randomBuildings();
  for (let i = 0; i < 15; i++) {
    objectArray.push(
      new Platform(
        random(-worldSize-100,worldSize-100), //x
        -110, //y
        random(-worldSize-100,worldSize-100), // zed
        100, // x axis
        20, // y axis
        100, // zed axis
        imgs.metal // image
      )
    );
  }
  objectArray.push(player = new PlayerObject(100,-500,100,0));
  
  for (let i = 0; i < 55; i++) {
    objectArray.push(
      new Pine(
        random(-worldSize-100,worldSize-100),
        random(-worldSize-100,worldSize-100),
        random(360)
      )
    );
  }
  for (let i = 0; i < 16; i++) {
    objectArray.push(new Sheep(random(-worldSize-100,worldSize-100),random(-worldSize-100,worldSize-100),random(360)))
  }
  for (let i = 0; i < 1; i++) {
    objectArray.push(
      new WaterBarrier(
        random(-worldSize-100,worldSize-100),
        random(-worldSize-100,worldSize-100),
        waterFrames
      )
    );
  }
  for (let i = 0; i < 5; i++) {
    objectArray.push(new Coin(random(-worldSize-100,worldSize-100),random(-worldSize-100,worldSize-100),random(360)));
  }
  for (let i = 0; i < 16; i++) {
    objectArray.push(new Bat(random(-worldSize-100,worldSize-100),worldSize));
  }
  
  checkAllForInitialCollisions();
  
  // draw floor
  objectArray.push(new Platform(0,0,0,worldSize*2,10,worldSize*2,imgs.grass));
  
}
function checkAllForInitialCollisions() {
  for(let i = 1; i < objectArray.length; i++){
    let tempy = objectArray[i].transform.position.y;
    let tempx = objectArray[i].transform.position.x;
    let tempz = objectArray[i].transform.position.z;

    while(objectArray[i].checkForCollisions(tempx,tempy,tempz) || player.checkForCollisions(player.transform.position.x,player.transform.position.y,player.transform.position.z)) {
      objectArray[i].transform.position.x = random(-worldSize-100,worldSize-100);
      objectArray[i].transform.position.z = random(-worldSize-100,worldSize-100);
      tempx = objectArray[i].transform.position.x;
      tempz = objectArray[i].transform.position.z;
    }
  }
}

function draw() {
  if(gameState == "title"){
    title();
  }
  else if(gameState == "ingame"){
    ingame();
  }
  else if(gameState == "win"){
    win();
  }
  else if(gameState == "lose"){
    lose();
  }
}

function title() {
  background(0);
  push();
  textAlign(CENTER);
  fill(100);
  textFont(myFont);
  textSize(36);
  push();
  translate(-sin(frameCount * 10) * 10,-100,0);
  text("P5 WebGL Game",0,0);
  pop();
  textSize(20);
  translate(0,100,0)
  text("by J Riley",0,0);
  fill(random(100,255),random(100,255),random(100,255));
  translate(0,140,0)
  text("Press ENTER To Play",0,0);
  pop();
  if (keyIsDown(13)) {
    reset();
    gameState = "ingame"; 
  }
}
function ingame() {
  //totalFps += frameRate();
  //document.getElementById("fpsDiv").innerHTML = round(totalFps / frameCount);
  fpsArray.push(frameRate());
  fpsArray.shift();
  document.getElementById("fpsDiv").innerHTML = round(fpsArray.reduce((a, b) => a + b, 0)/120)
  ambientLight( sin(frameCount/12 * daylightFrequency) * daylightAmplitude + 100);
  directionalLight(255,255,255,1,1,1);
  directionalLight(0,0,128,-1,-1,-1);
  background(220);
  cam.update();
  drawObjects();
  drawSkybox();
  checkForFalling();
  if (score >= 5) {
    gameState = "win";
  } 
}
function win() {
  cam = new CameraObject();
  background(220);
  push();
  textAlign(CENTER);
  fill(0,255,0);
  textFont(myFont);
  textSize(36);
  translate(-sin(frameCount * 10) * 10,-100,0);
  text("YOU WIN!",0,0);
  fill(random(100,255),random(100,255),random(100,255));
  translate(0,140,0)
  text("Press ENTER To Play again",0,0);
  pop();
  if (keyIsDown(13)) {
    reset();
    gameState = "ingame";
  }
}
function lose() {
  cam = new CameraObject();
  background(220);
  push();
  textAlign(CENTER);
  fill(255,0,0);
  textFont(myFont);
  textSize(36);
  text("YOU LOSE",0,0);
  fill(random(100,255),random(100,255),random(100,255));
  translate(0,140,0)
  text("Press ENTER To Play",0,0);
  pop();
  if (keyIsDown(13)) {
    reset();
    gameState = "ingame"; 
  }
}



function drawObjects() {
  // let boxSize = ??
  for(let i = 0; i < objectArray.length; i++) {
    objectArray[i].show();
    objectArray[i].update();
  } 
}

function drawText(mytext){
  push();
  textAlign(CENTER);
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  translate(0,-100,1000);
  rotateY(180);
  text(mytext,0,0);
  pop();
}
function buildBuildings(){
  for (let i = -1000; i < 1500; i+=500) {
    // east wall of buildings
    objectArray.push(new Building(i,1250,270));
  }
  for (let i = -1000; i < 1500; i+=500) {
    // north wall of buildings
    objectArray.push(new Building(1250,i,270));
  }
  for (let i = -1000; i < 1500; i+=500) {
    // west wall of buildings
    objectArray.push(new Building(i,-1250,90));
  }
  for (let i = -1000; i < 1500; i+=500) {
    // south wall of buildings
    objectArray.push(new Building(-1250,i,90));
  }
}
function drawSkybox() {
  push();
  noStroke();
  shininess(20);
  specularMaterial(sin(frameCount/12 * daylightFrequency) * daylightAmplitude + 40,sin(frameCount/12 * daylightFrequency) * daylightAmplitude + 40,sin(frameCount/12 * daylightFrequency) * daylightAmplitude + 150);
  sphere(worldSize+1000);
  pop();
}
function checkForFalling() {
  if (player.transform.position.y > 500) {
    player.velocityY = 0;
    player.transform.position.x = 0;
    player.transform.position.y = 0;
    player.transform.position.z = 0;
  }
  
}
function randomBuildings() {
  for (let i = 0; i < 3; i++) {
    objectArray.push(new Building(random(-worldSize-100,worldSize-100),random(-worldSize-100,worldSize-100),random(360)));
  }   
}
