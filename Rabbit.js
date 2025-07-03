/*global PlayerObject,texture,createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/
// by June Yang

class Rabbit extends GameObject {
  constructor(_x, _z, _rotation) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.position.y = 0;
    this.transform.scale.x = random(1.6, 1.9);
    this.transform.scale.y = random(1.6, 1.9);
    this.transform.scale.z = random(1.6, 1.9);
    this.rabbitState = "walking";
  }
  getMesh() {
    rotateY(90); // test out different values to see what make the rabbits walk the correct direction. For example, maybe 90 or -90
    //left leg
    push();
    noStroke();
    fill("grey");
    if (this.rabbitState == "standing") {
      translate(-3, 0, -1);
    }
    if (this.rabbitState == "walking") {
      translate(-3, -2 + sin(frameCount * 5) * 2, -1);
      rotateX(2 + sin(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //right leg
    push();
    noStroke();
    fill("grey");
    if (this.rabbitState == "standing") {
      translate(-3, 0, 1);
    }
    if (this.rabbitState == "walking") {
      translate(-3, -2 + cos(frameCount * 5) * 2, 1);
      rotateX(2 + cos(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //body
    push();
    noStroke();
    translate(0, -5, 0);
    //texture(Bfur);
    rotateZ(90);
    sphere(4.5, 8);
    pop();
    //left arm
    push();
    noStroke();
    fill("grey");
    if (this.rabbitState == "standing") {
      translate(4, 0, -1);
    }
    if (this.rabbitState == "walking") {
      translate(4, -2 + cos(frameCount * 5) * 2, -1);
      rotateX(2 + cos(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //right arm
    push();
    noStroke();
    fill("grey");
    if (this.rabbitState == "standing") {
      translate(4, 0, 1);
    }
    if (this.rabbitState == "walking") {
      translate(4, -2+sin(frameCount * 5) * 2, 1);
      rotateX(2 + sin(frameCount * 5) * 40);
    }
    box(3, 1, 1);
    pop();
    //head
    push();
    noStroke();
    //texture(Bfur);
    translate(5, -10, 0);
    rotateY(-90);
    sphere(4);
    pop();
    //tail
    push();
    noStroke();
    //texture(Bfur);
    translate(-5, -4, 0);
    sphere(2);
    pop();
    //left ear
    push();
    noStroke();
    //texture(Bfur);
    translate(5, -15, -2.5);
    rotateX(35);
    box(1, 7, 2);
    pop();
    //right ear
    push();
    noStroke();
    //texture(Bfur);
    translate(5, -15, 2.5);
    rotateX(-35);
    box(1, 7, 2);
    pop();
    //left eye
    push();
    noStroke();
    fill("black");
    translate(8, -12, -1);
    sphere(0.5);
    pop();
    //right eye
    push();
    noStroke();
    fill("black");
    translate(8, -12, 1);
    sphere(0.5);
    pop();
    //month
    push();
    noStroke();
    fill("black");
    translate(9, -9, 0);
    box(0.5, 1, 2);
    pop();
  }
  update() {
    if (this.rabbitState == "walking") {
      this.walk();
      var randomNum = random(0, 1);
      if (randomNum <= 0.01) {
        this.rabbitState = "standing"; // set to standing! == only checks for equality
      }
    } else if (this.rabbitState == "standing") {
      var randomNum = random(0, 1);
      if (randomNum <= 0.01) {
        this.rabbitState = "walking"; // set to walking! == only checks for equality
      }
    }
  }


  walk() {
    this.transform.rotation.y += random(-1, 1); // fill-the-blank! change the Y transform rotation += random -1 to +1
    var moveSpeed = random(1); // 1 is just a suggestion
    // this next line is either -sin or +sin, I'm not sure
    var newX =
      this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
    // this next line is either -cos or +cos, I'm not sure
    var newZ =
      this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
    if (this.checkForCollisions(newX, newZ)) {
      this.transform.rotation.y += random(-1, 5); // fill-the-blank! change Y transform rotation += random -1 to 1
      this.transform.position.x += random(-1, 1); // fill-the-blank! change X transform position += random -1 to 1
    } else {
      this.transform.position.x = newX; // fill-the-blank! set the actual x position to newX
      this.transform.position.z = newZ; // fill-the-blank! set the actual z position to newZ
    }
  }
}