/*global createCamera,GameObject,texture,imgs,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/


class SphereTree extends GameObject{
  constructor(_x, _z){
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.rotation.y = random(0,360);
    this.yHeight = 500;
    this.leafXWidth = random(20,75)
    this.leafZDepth = random(20,75)
  }
  getMesh(){
    //trunk
    push();
    noStroke()
    translate(0,-50,0);
    texture(imgs.treeTrunk);
    cylinder(10,100)
    pop();
    //leaves
    push();
    noStroke()
    translate(0,-190,0);
    texture(imgs.treeLeaves);
    ellipsoid(this.leafXWidth,100,this.leafZDepth)
    pop();
  }
  
}