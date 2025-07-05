/*global createCamera,Building, player, Coin,texture, WaterBarrier, Sheep, ambientLight, directionalLight, Pine, PlayerObject, GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

function mouseClicked() {
  requestPointerLock();
  console.log(requestPointerLock());
}
class CameraObject extends GameObject {
  constructor(){
    super();
    this.cam = createCamera();
    this.distanceBehindPlayer = 200; // you can increase/decrease
    this.distanceAbovePlayer = 100; // you can increase/decrease
    this.lookAtY = -130; // sets point on Y axis that cam is looking at
  }
  update() {
    this.cam.setPosition(
      player.transform.position.x - this.distanceBehindPlayer * sin(player.transform.rotation.y),
      player.transform.position.y - this.distanceAbovePlayer,
      player.transform.position.z - this.distanceBehindPlayer * cos(player.transform.rotation.y));
    this.cam.lookAt(
      player.transform.position.x + this.distanceBehindPlayer * sin(player.transform.rotation.y),
      this.lookAtY - player.transform.rotation.x * 10,
      player.transform.position.z + this.distanceBehindPlayer * cos(player.transform.rotation.y));
  }
}