class Enemy extends GameObject{
  constructor(_x, _z, _rotationY) {
    super();
    this.transform.position.x = _x;
    this.transform.position.z = _z;
    this.transform.rotation.y = _rotationY;
    
  }
  getMesh(){
    push()
    box(100)
    pop()
  }
  update(){
    var moveSpeed = random(5);
    var newX = this.transform.position.x - sin(this.transform.rotation.y) * moveSpeed;
    var newZ = this.transform.position.z - cos(this.transform.rotation.y) * moveSpeed;
    if(this.checkForCollisions(newX,this.transform.position.y,newZ)){
      this.transform.rotation.y += 180 + random(-5,5);
    }else{
      this.transform.position.x = newX;
      this.transform.position.z = newZ;
    }
    if(abs(this.transform.position.x)>worldSize||abs(this.transform.position.z)>worldSize){
      this.transform.rotation.y += 180 + random(-5,5);
    }
  }
  
}