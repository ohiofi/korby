/*global GameObject,sheepFur,objectArray, imgs, cam,camera, player, texture ,cos, sin,movedX,movedY,abs,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class Sheep extends GameObject {
  constructor(_x, _z) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.rotation.y = random(0,360);
    this.transform.scale.x = random(0.5, 1);
    this.transform.scale.y = random(0.5, 1);
    this.transform.scale.z = random(0.5, 1);
    this.skinColor = color(random(0,255)); // remember that color is rgb
    this.legColor = color(random(0,255)); // remember that color is rgb
    this.sheepState = "standing";
    
  }
  getMesh() {
    noStroke()
    rotateY(-90);
    // body
    push();
    
    //texture(imgs.sheepFur);
    //fill(this.skinColor);
    translate(0,-30,0)
    box(30,20);
    pop();

    // head
    push();
    fill(this.skinColor);
    translate(-20,-35,0);
    box(15,15);
    pop();

    // right back leg leg
    push();
    fill(this.legColor);
    if(this.sheepState == "standing") {
      translate(13,-15,-10);
    } else if(this.sheepState == "walking") {
      translate(13,-15 - sin(frameCount * 5) * 7,-10);
    }
    
    box(5,20,5);
    // hoof
    push();
    fill(0);
    translate(0,12,0)
    box(5,5);
    pop();
    pop();

    // left back leg
    push();
    fill(this.legColor);
    if(this.sheepState == "standing") {
      translate(13,-15,10);
    } else if(this.sheepState == "walking") {
      translate(13,-15 + sin(frameCount * 5) * 7,10);
    }
    box(5,20,5);
    // hoof
    push();
    fill(0);
    translate(0,12,0)
    box(5,5);
    pop();
    pop();

    // right front leg
    push();
    fill(this.legColor);
    if(this.sheepState == "standing") {
      translate(-10,-15,-10);
    } else if(this.sheepState == "walking") {
      translate(-10,-15 + sin(frameCount * 5) * 7,-10);
    }
    box(5,20,5);
    // hoof
    push();
    fill(0);
    translate(0,12,0)
    box(5,5);
    pop();
    pop();

    // left front leg
    push();
    fill(this.legColor);
    if(this.sheepState == "standing") {
      translate(-10,-15,10);
    } else if(this.sheepState == "walking") {
      translate(-10,-15 - sin(frameCount * 5) * 7,10);
    }
    box(5,20,5);
    // hoof
    push();
    fill(0);
    translate(0,12,0)
    box(5,5);
    pop();
    pop();
    rotateY(-90);
  }
  
  update(){
    
    this.randomInt = random();
    if(this.randomInt >= 0.99 && this.sheepState == "walking") {
      this.sheepState = "standing";
    } else if(this.randomInt <= 0.01 && this.sheepState == "standing") {
      this.sheepState = "walking";
    }
    if (this.randomInt >= 0.5 && this.randomInt <= 0.51) {
      this.transform.rotation.y += random(0,360);
    }
    
    if(this.sheepState == "walking") {
      this.walk();
    }  else if(this.sheepState == "standing") {
      return;
    }  
    
  }
  walk() {
    this.transform.rotation.y += random(-1,1); // fill-the-blank! change the Y transform rotation += random -1 to +1
    var moveSpeed = random(3);
    if(this.isOutOfBounds()){
      this.transform.rotation.y += this.getAngle(0,0);
      moveSpeed = 6;
    }
     // 1 is just a suggestion
    // this next line is either -sin or +sin, I'm not sure
    var newX = this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
    // this next line is either -cos or +cos, I'm not sure
    var newZ = this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
    if(this.checkForCollisions(newX,this.transform.position.y,newZ)){
      this.transform.rotation.y += random(-1,1); // fill-the-blank! change Y transform rotation += random -1 to 1
      this.transform.position.x += random(-1,1);// fill-the-blank! change X transform position += random -1 to 1
    }else{
      this.transform.position.x = newX // fill-the-blank! set the actual x position to newX
      this.transform.position.z = newZ// fill-the-blank! set the actual z position to newZ
       
    }
    
  } 
  
}