/*global Mouse,PlayerObject,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
let objectArray = [];
let scoreDisplay = document.getElementById("scoreDiv");
let score = 0;
let myFont,cam;
let imgs = {};
let player = new PlayerObject(100,100,90);
let totalFps = 0;
let sfx = {};
let gameState = "title";
let worldSize = 2000


function preload(){
  sfx.coin = new Audio("./assets/Bag-of-Coins.mp3");
  myFont = loadFont(
    "./assets/PressStart2P.ttf"
  );
  imgs.sky = loadImage("./assets/blueSkyGradient.jpg");
  imgs.rainbowCookie = loadImage("./assets/rainbowCookie.png");
  imgs.treeTrunk =     loadImage("./assets/barkStructure.jpg");
  imgs.treeLeaves =    loadImage("./assets/pixelTreeLeaves.png");
  imgs.bldg1 = loadImage("./assets/building01.jpg");
  imgs.bldg2 = loadImage("./assets/building02.jpg");
  imgs.bldg3 = loadImage("./assets/building03.jpg");
  imgs.bldg4 = loadImage("./assets/building04.jpg");
  imgs.bldg5 = loadImage("./assets/building05.jpg");
  imgs.bldg6 = loadImage("./assets/building06.jpg");
  imgs.bldg7 = loadImage("./assets/building07.jpg");
  imgs.bldg8 = loadImage("./assets/building08.jpg");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight - 20, WEBGL);
  setAttributes("antialias", true);
  // setup the camera
  //cam = createCamera()
  cam = new CameraObject();
  
  
    
  
  //buildFloor()
  //objectArray.push(player);
}

function reset(){
  objectArray.push(player);
  
  //buildBuildings()
  //randomBuildings()
  
  // add some trees to objectArray
  for(let i=0;i<10;i++){
    objectArray.push(new Enemy(random(-900,900),random(-900,900),random(360)))
    objectArray.push(new SphereTree(random(-900,900),random(-900,900)))
    objectArray.push(new Mouse(random(-900,900),random(-900,900),random(360)))
    objectArray.push(new Rabbit(random(-900,900),random(-900,900),random(360)))
    objectArray.push(new Coin(random(-900,900),random(-900,900)))
    objectArray.push(
      new Platform(
        random(-900, 900),
        random(-1, -20) * 5,
        random(-900, 900),
        100,
        10,
        100
      )
    );
  }
  
  //checkForInitialCollisions()
  
  // draw floor
  objectArray.push(new Platform(0,0,0,worldSize*2,10,worldSize*2));
}

// function checkForInitialCollisions(){
//   for(let i=1;i<objectArray.length;i++){
//     let tempx = objectArray[i].transform.position.x;
//     let tempy = objectArray[i].transform.position.y;
//     let tempz = objectArray[i].transform.position.z;
//     while(objectArray[i].checkForCollisions(tempx,tempy,tempz) || player.checkForCollisions(player.transform.position.x,player.transform.position.y,player.transform.position.z)){
//       objectArray[i].transform.position.x = random(-worldSize,worldSize);
//       objectArray[i].transform.position.z = random(-worldSize,worldSize);
//       tempx = objectArray[i].transform.position.x;
//       tempz = objectArray[i].transform.position.z;
//     }
//   }
// }

function draw() {
  if(gameState == "title"){
    title()
  }
  else if(gameState == "ingame"){
    ingame();
  }
  else if(gameState == "win"){
    title()
  }
  else if(gameState == "lose"){
    
  }
}

function title(){
  background(0,100,220);
    push()
    textAlign(CENTER);
    fill('#ED225D');
    textFont(myFont);
    textSize(36);
    translate(0+sin(frameCount)*50,-100+sin(frameCount)*10,0+cos(frameCount)*50);
    text("WELCOME!",0,0);
    pop()
    push()
    textAlign(CENTER);
    fill(random(255),random(255),random(255));
    textFont(myFont);
    textSize(36);
    translate(0,-50,0);
    text("press enter",0,0);
    pop()
    if(keyIsDown(13)){
      reset()
      gameState="ingame"
    }
}
  
function ingame(){
  ambientLight(100+sin(frameCount*.1)*50);
  directionalLight(128,128,128,0,1,0)
  directionalLight(255,255,128,1,1,1)
  background(220);
  //checkPlayerControls()
  //updateCamera();
  cam.update();
  //drawFloor();
  //drawTree();
  drawObjects();
  drawText("p5js")
  drawSkybox();
  //player.update();
  //player.show();
  totalFps += frameRate()
  document.getElementById("fpsDiv").innerHTML = round(totalFps/frameCount)
  if(score==10){
    cam = new CameraObject();
    gameState="title"
  }
}

// function drawTree(){
//   //trunk
//   push();
//   noStroke()
//   translate(400,-50,400);
//   texture(imgs.treeTrunk);
//   cylinder(10,100)
//   pop();
//   //leaves
//   push();
//   noStroke()
//   translate(400,-190,400);
//   texture(imgs.treeLeaves);
//   sphere(100)
//   pop();
// }

function buildBuildings(){
  for (let i = -750; i < 1250; i+=500) {
    // east wall of buildings
    objectArray.push(new Building(i,1250,0));
  }
  for (let i = -750; i < 1250; i+=500) {
    // north wall of buildings
    objectArray.push(new Building(1250,i,0));
  }
  for (let i = -750; i < 1250; i+=500) {
    // west wall of buildings
    objectArray.push(new Building(i,-1250,0));
  }
  for (let i = -750; i < 1250; i+=500) {
    // south wall of buildings
    objectArray.push(new Building(-1250,i,0));
  }
}

function randomBuildings(){
  for (let i = 0; i < 5; i++) {
    objectArray.push(new Building(random(-1000,1000),random(-1000,1000),random(360)));
  }
}


function drawSkybox(){
  push()
  noStroke();
  //texture(imgs.sky)
  specularMaterial(sin(frameCount*.1)*100,sin(frameCount*.1)*100,155+sin(frameCount*.1)*100)
  //ambientMaterial(100,250,255)
  //fill(150,255,255)
  //normalMaterial()
  translate(player.transform.position.x,player.transform.position.y,player.transform.position.z)
  sphere(5000)
  //player.transform.rotation.y += .5
  pop()
}

function drawObjects() {
  // let boxSize = ??
  // for loop
  // push();
  // translate(600, -10, 0);
  // fill("red");
  // box(20);
  // pop();
  for(let i =0;i<objectArray.length;i++){
    objectArray[i].update();
    objectArray[i].show();
    
  }
  for(let i =0;i<objectArray.length;i++){
    
    
  }
  
}

function drawFloor() {
  //let tileSize = 100;
  // for (let row = -1000; row < 1000; row+=100) {
  //   for (let col = -1000; col < 1000; col+=100) {
  //     objectArray.push(new Platform(row+50,col+50));
  //   }
  // }
  // tile floor
  // for (let row = 0; row < 20; row++) {
  //   for (let col = 0; col < 20; col++) {
      push();
      // translate(
      //   row * tileSize + tileSize / 2,
      //   0,
      //   col * tileSize + tileSize / 2
      // );
      // fill(255);
      // stroke(0);
      texture(imgs.treeLeaves)
      //fill(0,50,0)
      box(2000, 1, 2000);
      pop();
    //}
  //}
}
function drawText(mytext){
  push();
  textAlign(CENTER);
  fill('#ED225D');
  textFont(myFont);
  textSize(36);
  translate(0,-100,999);
  rotateY(180);
  text(mytext,0,0);
  pop();
}

