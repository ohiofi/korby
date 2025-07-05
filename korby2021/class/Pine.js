/*global GameObject,treeTexture, imgs pineWood, treeTexture1, treeTexture2, cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Pine extends GameObject {
  constructor(_x, _z) {
    super();
    this.transform.scale.x = random(2, 3);
    this.transform.scale.y = random(1, 3.7);
    this.transform.scale.z = random(2, 3);
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.rotation.y = random(0, 359);
    this.yHeight = 500;
    
    
  }
  getMesh() {
    noStroke();
    
    // tree trunk
    push();
    texture(imgs.pineWood);
    translate(0,-25,0);
    cylinder(5,50);
    pop();
    
    // first layer
    push();
    texture(imgs.treeTexture1);
    translate(0,-75,0);
    rotateX(180);
    cone(30,70);
    pop();
    
    // second layer
    push();
    texture(imgs.treeTexture1);
    translate(0,-100,0);
    rotateX(180);
    cone(25,70);
    pop();
    
    // third layer
    push();
    texture(imgs.treeTexture1);
    translate(0,-125,0);
    rotateX(180);
    cone(20,70);
    pop();
  }
}