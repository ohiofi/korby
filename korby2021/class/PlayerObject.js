/*global PlayerObject, movedX, GRAVITY, Platform, imgs, movedY,score,scoreDisplay ,Coin, objectArray, sfx, GameObject,avatarFace ,cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class PlayerObject extends GameObject {
  constructor(_x, _y,_z, _rotationY){
    super();
    this.transform.position.x = _x;
    this.transform.position.y = _y;
    this.transform.position.z = _z;
    this.transform.rotation.y = _rotationY;
    this.playerState = "standing";
     } 
  getMesh(){
    
    this.drawShadow()
    noStroke();
    
    // body
    push();
      push();
        translate(0,-40,15);
        fill(219,79,144);
        sphere(30);
      pop();
    pop();
    
    // left arm
    push();
    fill(219,79,144);
    if (this.playerState == "standing") {
      translate(35,-30,0);
    } else if (this.playerState == "walking") {
      translate(35, -35 + -sin(frameCount * 15) * 5,0);
    }
    sphere(10);
    pop();
    
    // right arm
    push();
    fill(219,79,144);
    if (this.playerState == "standing") {
      translate(-35,-30,0);
    } else if (this.playerState == "walking") {
      translate(-35, -35 + sin(frameCount * 15) * 5,0);
    }
    sphere(10);
    pop();
    
    // right leg
    push();
    fill(219,79,144);
    if (this.playerState == "standing") {
      translate(-15,-10,0);
    } else if (this.playerState == "walking") {
      translate(-15, -15 + -sin(frameCount * 10) * 8,0);
    }
    sphere(10);
    pop();
    
    // left leg
    push();
    fill(219,79,144);
    if (this.playerState == "standing") {
      translate(15,-10,0);
    } else if (this.playerState == "walking") {
      translate(15, -15 + sin(frameCount * 10) * 8,0);
    }
    sphere(10);
    pop();
    
  }
  update() {
    this.checkPlayerControls();
    if(this.isGrounded()){
      this.velocityY = 0;
    } else {
      this.velocityY += GRAVITY;
    }
    this.transform.position.y += this.velocityY;
  }

  checkPlayerControls() {
    let horizontalTiltSpeed = 0.05;
    let verticalTiltSpeed = 0.01;
    let moveSpeed = 8;
    let rotationSpeed = 5;
    let keyPressCount = 0;
    // tilt up/down
    this.transform.rotation.x -= movedY * verticalTiltSpeed;

    // tilt left/right
    this.transform.rotation.y += -movedX * horizontalTiltSpeed;

    // right
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      this.playerState = "walking";
      keyPressCount++;
      requestPointerLock();
      let newX = this.transform.position.x -
        cos(this.transform.rotation.y - rotationSpeed) * moveSpeed;
      let newZ = this.transform.position.z +
        sin(this.transform.rotation.y - rotationSpeed) * moveSpeed;
      if(!this.checkForCollisions(newX,this.transform.position.y,newZ)){
        this.transform.position.x = newX;
        this.transform.position.z = newZ;
      }
    } 
    // left
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      this.playerState = "walking";
      keyPressCount++;
      requestPointerLock();
      let newX = this.transform.position.x + cos(this.transform.rotation.y + rotationSpeed) * moveSpeed;
      let newZ = this.transform.position.z - sin(this.transform.rotation.y + rotationSpeed) * moveSpeed;
      if(!this.checkForCollisions(newX,this.transform.position.y,newZ)){
        this.transform.position.x = newX;
        this.transform.position.z = newZ;
      }
    } 
    // reverse
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      this.playerState = "walking";
      keyPressCount++;
      requestPointerLock();
      let newX = this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
      let newZ = this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
      if(!this.checkForCollisions(newX,this.transform.position.y,newZ)){
        this.transform.position.x = newX;
        this.transform.position.z = newZ;
      }
    }
    // forward
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      this.playerState = "walking";
      keyPressCount++;
      requestPointerLock();
      let newX = this.transform.position.x + sin(this.transform.rotation.y) * moveSpeed;
      let newZ = this.transform.position.z + cos(this.transform.rotation.y) * moveSpeed;
      if(!this.checkForCollisions(newX,this.transform.position.y,newZ)){
        this.transform.position.x = newX;
        this.transform.position.z = newZ;
      }
    }
    //jumping
    if (keyIsDown(32) && this.isGrounded()) { 
      this.transform.position.y -= 15; 
      this.velocityY = -4; 
      
    }
    
    if (keyPressCount == 0) {
      this.playerState = "standing";
    } 
  }
  checkForCollisions(newX,newY,newZ){
    for (let i = 0; i < objectArray.length; i++){
      if (objectArray[i] == this){
        continue;
      }
       if (objectArray[i].isTouching(newX,newY,newZ)){
        this.collectCoin(i);
        return true;
      }
    }
    return false;
  }
  collectCoin(index) {
    if (objectArray[index] instanceof Coin){
      objectArray.splice(index,1);
      sfx.coin.play();
      score++; 
      scoreDisplay.innerHTML = score; 
    }
  } 
  isGrounded(){
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i] instanceof Platform && objectArray[i].isBeneath(this.transform.position.x,this.transform.position.y,this.transform.position.z)){
        this.transform.position.y = objectArray[i].transform.position.y - objectArray[i].yHeight/2;
        return true;
      }
    }
    
    return false;
  }
  drawShadow(){
    let shadowSize = 30; // you can adjust this to fit your avatar 
    let shadowY = abs(this.transform.position.y);
    let shadowColor = color(0,0,0);
    push();
    rotateX(-this.transform.rotation.x);
    fill(shadowColor);
    if(!this.isGrounded()){
      translate(0,shadowY-1,0)
    }
    rotateX(90)
    let x = 0;
    let y = 0;
    let w = shadowSize - shadowY * .1; 
    let h = w;
    let detail = 50;
    ellipse(x, y, w, h, detail)
    pop();
  }
}