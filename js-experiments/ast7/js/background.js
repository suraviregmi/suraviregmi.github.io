class Background{
    constructor(x,y,w,h,speed){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
    }
  draw(){
   
      ctx.drawImage(background,this.x,this.y,this.w,this.h);
     
  }
  update(){
      this.x -= this.speed;

      if(this.x<=-650){
          this.x = 650;
      }
  }
}