/*global createCamera,GameObject,abs,updateCamera,checkPlayerControls,requestPointerLock,scale,loadFont,setAttributes,PI,round,camera,sphere,torus,cone,cylinder,plane,rotateX,rotateY,rotateZ,frameCount,normalMaterial,translate,angleMode,background,beginShape,box,CENTER,color,cos,createCanvas,curveVertex,DEGREES,displayHeight,displayWidth,dist,DOWN_ARROW,ellipse,endShape,fill,floor,frameRate,height,image,keyCode,keyIsDown,LEFT,LEFT_ARROW,line,loadImage,loadSound,mouseIsPressed,mouseX,mouseY,noFill,noStroke,p5,pointLight,pop,push,RADIANS,random,RIGHT,RIGHT_ARROW,rotate,rotateX,rotateY,shuffle,sin,stroke,strokeWeight,text,textAlign,textFont,textSize,translate,triangle,UP_ARROW,WEBGL,width,windowHeight,windowWidth*/

class GameObject {
  
  constructor() {
    this.transform = {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      }
    };
    this.color = { r: 150, g: 150, b: 150 };
    this.outline = { r: 0, g: 0, b: 0 };
    this.xWidth = 50;
    this.yHeight =50;
    this.zDepth =50;
    this.minimumDistance = 5;
  }

  show() {
    push();
    translate(
      this.transform.position.x,
      this.transform.position.y,
      this.transform.position.z
    );
    rotateZ(this.transform.rotation.z);
    rotateY(this.transform.rotation.y);
    rotateX(this.transform.rotation.x);
    scale(
      this.transform.scale.x,
      this.transform.scale.y,
      this.transform.scale.z
    );
    this.getMesh();
    pop();
  }

  getMesh() {
    // When you create subclasses from GameObject, you MIGHT only need to override the getMesh method and not the show method
    fill(this.color.r, this.color.g, this.color.b);
    stroke(this.outline.r, this.outline.g, this.outline.b); // sets the color of the stroke outline
    // noFill(); // this would create a shape with transparent walls
    // noStroke(); // this would turn off the stroke outline
    box(50);
  }

  update() {
    // When you create subclasses from GameObject, you can move things, change velocities, apply gravity, change
  }
  isTouching(otherX,otherY,otherZ){
    var buffer = this.minimumDistance; // a little extra space so things aren't inside of a wall
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
    var frontZEdge = this.transform.position.z - this.zDepth/2;
    if(otherZ < frontZEdge - buffer){ 
      return false;
    }
    var backZEdge = this.transform.position.z + this.zDepth/2;
    if(otherZ > backZEdge + buffer){ 
      return false;
    }
    return true;
  }
  isBeneath(otherX,otherY,otherZ){
    return this.isTouching(otherX,otherY,otherZ)
  }
  checkForCollisions(newX,newY,newZ){
    for(let i=0;i<objectArray.length;i++){
      if(objectArray[i]==this){ // skip when you find yourself
        continue
      }
      if(objectArray[i].isTouching(newX,newY,newZ)){
        
        return true
      }
    }
    return false
  }
}
