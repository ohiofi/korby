 /*global GameObject,sheepFur,objectArray,worldSize, imgs, gameState, batFace, Platform,cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
class Bat extends GameObject {
  constructor(_x, _z) {
    super();
    this.transform.scale.x = random(0.5, 1);
    this.transform.scale.y = random(0.5, 1);
    this.transform.scale.z = random(0.5, 1);
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.color = random(10,50)+random(10,50)
    this.flappingSpeed = random(5,20)+random(5,20)
  }
  getMesh() {
    
    // bat drawing
    noStroke();
    // body
    fill(this.color)
    push();
    
    //texture(imgs.batFace);
    translate(0,-40,0);
    sphere(20,15,2);
    pop();
    
    // right leg
    push();
    fill(100);
    translate(15,-30,0);
    cylinder(5, 10);
    pop();
    
    // left leg
    push();
    fill(100);
    translate(-15,-30,0);
    cylinder(5, 10);
    pop();
    
    // left wing
    push();
    //texture(imgs.batWing);
    rotateX(30);
    rotateY(20);
    //translate(-30,-50,30);
    translate(-30, -50 + -sin(frameCount * this.flappingSpeed) * 10,30);

    cylinder(20,10, 1);
    pop();

    // right wing
    push();
    //texture(imgs.batWing);
    rotateX(30);
    rotateY(-20);
    //translate(30,-50,30);
    translate(30, -50 + sin(frameCount * this.flappingSpeed) * 10,30);
    cylinder(20,10, 1);
    pop();
    
    
  } 
  update() {
    var moveSpeed = random(7)+this.flappingSpeed/10;
    if(this.isOutOfBounds()){
      this.transform.rotation.y += this.getAngle(0,0);
      moveSpeed = 14;
    }
    var newX = this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
    var newZ = this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
     if(this.checkForCollisions(newX,this.transform.position.y,newZ)){
      this.transform.rotation.y += random(-180,180);
    }else{
      this.transform.position.x = newX;
      this.transform.position.z = newZ;
    }
    // if (abs(this.transform.position.x) >= worldSize || abs(this.transform.position.z >= worldSize)) {
    //   this.transform.rotation.y += random(-180,180);
    // }
  }
  checkForCollisions(newX,newZ){
    for(let i=0;i<objectArray.length;i++){
      if(objectArray[i]==this){ // skip when you find yourself
        continue
      }
      if(objectArray[i].isTouching(newX,newZ)){
        if (objectArray[i] == player) {
          //gameState = "lose";
        return true
        }
      }
    }
    return false
  }
}
 
 