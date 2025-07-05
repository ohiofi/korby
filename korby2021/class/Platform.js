 /*global GameObject,sheepFur,objectArray, cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
class Platform extends GameObject {
  constructor(_x, _y, _z, _width, _height, _depth, _texture) {
    super();
    this.transform.position.x = _x;
    this.transform.position.y = _y;
    this.transform.position.z = _z;
    this.xWidth = _width;
    this.yHeight = _height;
    this.zDepth = _depth;
    this.texture = _texture;
  }
  getMesh() {
    push();
    noStroke();
    texture(this.texture);
    translate(0, this.yHeight, 0);
    box(this.xWidth, this.yHeight, this.zDepth);
    pop();
  }
  isTouching() {
    return false;
  }
}