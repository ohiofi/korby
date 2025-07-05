/*global GameObject,waterFrame1,sheepFur,objectArrays,waterFrames, cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class WaterBarrier extends GameObject {
  constructor(_x, _z, _waterFramesArray) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.scale.x = random(0.9, 1);
    this.transform.scale.y = random(0.9, 1);
    this.transform.scale.z = random(0.9, 1);
    this.xDepth = 150;
    this.yDepth = 1;
    this.zDepth = 1500;
    this.currentFrame = 0;
    this.frames = _waterFramesArray;
  }
  getMesh() {
    push();
    noStroke()
    texture(this.frames[this.currentFrame]);
    translate(0,-this.yDepth,0);
    box(this.xDepth,this.yDepth,this.zDepth);
    //cylinder(this.xDepth,this.yDepth)
    pop();
  }
  update() {
    this.stateCheck();
    this.isTouching();
  }
  stateCheck() {
    if(frameCount % 6 == 0) {
      this.currentFrame++;
      if(this.currentFrame >= this.frames.length) {
        this.currentFrame = 0;   
      }
    }
    
    
  }
} 
