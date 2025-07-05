/*global cam,camera, player, cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
let distanceBehindPlayer = 200;
let distanceAbovePlayer = 100;
let horizontalTiltSpeed = 0.05;
let verticalTiltSpeed = 0.01;
let moveSpeed = 5;
let rotationSpeed = 5;
const blocker = document.getElementById("blocker");
const instructions = document.getElementById("instructions");
let isPointerLocked = false;

function updateCamera() {
  cam.setPosition(
    player.transform.position.x -
      distanceBehindPlayer * sin(player.transform.rotation.y),
    -distanceAbovePlayer,
    player.transform.position.z -
      distanceBehindPlayer * cos(player.transform.rotation.y)
  );
  cam.lookAt(
    player.transform.position.x +
      distanceBehindPlayer * sin(player.transform.rotation.y),
    distanceAbovePlayer - player.transform.rotation.x * 10,
    player.transform.position.z +
      distanceBehindPlayer * cos(player.transform.rotation.y)
  );
}



instructions.addEventListener("click", function() {
  instructions.style.display = "none";
  blocker.style.display = "none";
});

// document.addEventListener('pointerlockchange', (event) => {
//   alert(isPointerLocked)
//   isPointerLocked = !isPointerLocked;
//   if(!isPointerLocked){
//     instructions.style.display = "block";
//     blocker.style.display = "block";
//   }
// });
