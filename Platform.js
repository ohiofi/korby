/*global ambientMaterial, directionalLight, texture, gameobject, bark, leaves, coconut, createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Platform extends GameObject{
  constructor(_x,_y,_z,_w,_h,_d){
    super();
    this.transform.position.x = _x;
    this.transform.position.y = _y;
    this.transform.position.z = _z;
    this.transform.rotation.y = floor(random(4))*90
    this.xWidth = _w;
    this.yHeight = _h;
    this.zDepth = _d;
    this.texture = imgs.treeLeaves;
  }
  getMesh() {
    push();
    noStroke();
    texture(this.texture)
    
    translate(0, this.yHeight, 0);
    box(this.xWidth, this.yHeight, this.zDepth);
    pop();
  }
  isBeneath(otherX,otherY,otherZ){
    var buffer = 5; // a little extra space so things aren't inside of a wall
    var leftXEdge = this.transform.position.x - this.xWidth/2;
    if(otherX < leftXEdge - buffer){
      return false;
    }
    var rightXEdge = this.transform.position.x + this.xWidth/2;
    if(otherX > rightXEdge + buffer){
      return false;
    }
    var bottomYEdge = this.transform.position.y + this.yHeight/2;
    if(otherY > bottomYEdge + buffer){ 
      return false;
    }
    var topYEdge = this.transform.position.y - this.yHeight/2;
    if(otherY < topYEdge - buffer){ 
      return false;
    }
    var frontZEdge = this.transform.position.z + this.zDepth/2;
    if(otherZ > frontZEdge + buffer){ 
      return false;
    }
    var backZEdge = this.transform.position.z - this.zDepth/2;
    if(otherZ < backZEdge - buffer){ 
      return false;
    }
    return true;
  }
  isTouching(x,y,z){
    return false
  }
}