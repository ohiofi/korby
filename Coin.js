/*global movedX,movedY,PlayerObject,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Coin extends GameObject {
  constructor(_x, _z) {
    super();
    this.transform.position.x = _x;
    this.transform.position.y = -150;
    this.transform.position.z = _z;
    this.transform.rotation.y = random(360);
    this.transform.rotation.x += random(360);
    this.transform.rotation.y += random(6);
    this.transform.rotation.z += random(360);
    this.isActive = true;
    this.minimumDistance = 50;
  }
  getMesh(){
    if(!this.isActive){
      return
    }
    push();
    noStroke();
    //noFill()
    specularMaterial(255,200,100);
    //texture(imgs.rainbowCookie);
    //box(20,20,0)
    cylinder(20,3)
    pop();
  }
  update(){
    var frequency = 5;
    var amplitude = .75;
    this.transform.position.y += sin(frameCount * frequency) * amplitude;
    this.transform.rotation.y += random(6);
  }
  
}