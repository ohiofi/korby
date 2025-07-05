/*global ambientMaterial, imgs,sfx, objectArray, score, scoreDisplay, ellipsoid,ceil, specularMaterial, directionalLight, shininess, texture, gameobject, bark, leaves, coconut, createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Coin extends GameObject{
  constructor(_x, _z) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.position.y = -120;
    this.isActive = true;
    this.minimumDistance = 50;
  } 
  getMesh() {
    if(this.isActive == false) {
      return false;
    } 
    push();
    noStroke();
    shininess(50);
    specularMaterial(255,223,0);
    translate(0,-40,0);
    //ellipsoid(5, 15, 15);
    rotateX(90);
    cylinder(15, 3);
    pop();
  }
  update() {
    if(this.isActive == true) {
      this.transform.position.y += sin(frameCount * 2) * 1;
      this.transform.rotation.y += 3;
    } else {
      return false;
    }
    
  }
}