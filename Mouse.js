/*global movedX,movedY,PlayerObject,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Mouse extends GameObject {
  constructor(_x, _z, _rotationY) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.rotation.y = _rotationY;
    
  }
  getMesh(){
    //body
    push()
    noStroke()
    translate(0,-5,0)
    fill(140,100,20)
    sphere(5)
    pop()
    // face
    push()
    noStroke()
    translate(0,-5,-11)
    rotateX(-75)
    fill(140,100,20)
    cone(5,17)
    pop()
    //back l paw
    push()
    noStroke()
    translate(-5,-2,5)
    fill(150,110,30)
    sphere(2)
    pop()
    //back r paw
    push()
    noStroke()
    translate(5,-2,5)
    fill(150,110,30)
    sphere(2)
    pop()
    //frnt l paw
    push()
    noStroke()
    translate(-5,-2,-5)
    fill(150,110,30)
    sphere(2)
    pop()
    //frnt r paw
    push()
    noStroke()
    translate(5,-2,-5)
    fill(150,110,30)
    sphere(2)
    pop()
    //frnt l paw
    push()
    noStroke()
    translate(-5,-7,-5)
    fill(150,110,30)
    sphere(2)
    pop()
    //r ear
    push()
    noStroke()
    translate(5,-11,-5)
    rotateX(90)
    fill(150,110,30)
    cylinder(3)
    pop()
    //l ear
    push()
    noStroke()
    translate(-5,-11,-5)
    rotateX(90)
    fill(150,110,30)
    cylinder(3)
    pop()
    push()
    noFill();
    beginShape();
    curveVertex(0,0, 0);
    curveVertex(0,-3, 0);
    curveVertex(0,-7, 5);
    curveVertex(0,-3, 15);
    curveVertex(0,-9, 22);
    curveVertex(0,-21, 25);
    endShape();
    pop()
  }
  update(){
    this.transform.rotation.y += random(-5,5)
    var moveSpeed = random(2);
    var newX = this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
    var newZ = this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
    if(this.checkForCollisions(newX,this.transform.position.y,newZ)){
      this.transform.rotation.y++;
    }else{
      this.transform.position.x = newX;
      this.transform.position.z = newZ;
    }
    if(abs(this.transform.position.x)>worldSize||abs(this.transform.position.z)>worldSize){
      this.transform.rotation.y += 180 + random(-5,5);
    }
  }
  
}