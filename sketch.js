var show = false;
var bubbles = [];
var count;

var colorAngle;
function  setup() {
    createCanvas(700,600);
    background(0);
    count = 0;
    colorAngle = floor(random(300));
   
    //stroke(33,33,33);
    strokeWeight(2);
    //bubbles = new bubbles[100];
}

function draw() {
    //DRAWING PART
    
    background(255,255,255,2);
    if(show){
       //background(20,20,127);
        for(var i=0;i<bubbles.length;i++){
            bubbles[i].displayBall();
            bubbles[i].movUp();
            bubbles[i].detectEdge();
            bubbles[i].collideWithBubbles(bubbles);
        }
    }
    
    //LOGIC PART
    if(colorAngle > 359)
        colorAngle -= 360;


}

function mousePressed(){
    show = true;
    colorAngle+=floor(random(4,25));
    bubbles[count] = new Bubble(mouseX,mouseY,random(30,70),count,colorAngle);
    count++;
}

function keyPressed(){
    background(0);
    colorAngle = floor(random(0,359));
    show = false;
    bubbles = [];
    count=0;
}

function Bubble(_x,_y,_size,_index,_ColorAngle){
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.index = _index;
    this.movSpeed = random(1,2);
    //this.color = color(random(0,255),random(0,255),random(0,255),200);
    this.colorAngle = _ColorAngle;
    this.color = color('hsl('+this.colorAngle+', 100%, 40%)');
    this.newcolor;
    this.endsize;
    
    this.eye1offset = random(-1,1)*3;
    this.eye2offset = random(-1,1)*3;
    
    this.mouthTime = 0;
    this.displayBall = function(){
        
        if(this.mouthTime > 0)
            this.mouthTime -= 0.2;
        //this.newcolor=color(this.color.v1,this.color.v2,this.color.v3,this.color.alpha);
        fill(0);
        this.endsize = random(this.size/1.1,this.size);
        ellipse(this.x,this.y-3,this.endsize*0.96);
        fill(this.color);
        ellipse(this.x,this.y,this.endsize);   
        fill(color(255,255,255,200));
        //EYE
        noStroke();
        ellipse(this.x+this.size/7, this.y - this.size/7, random(this.size/5,this.size/4));
        ellipse(this.x-this.size/7, this.y - this.size/7, random(this.size/5,this.size/4));
        fill(0);
        //PUPIL
        ellipse(this.x+this.size/7 + this.eye1offset, this.y - this.size/7, random(this.size/10,this.size/7));
        ellipse(this.x-this.size/7 + this.eye2offset, this.y - this.size/7, random(this.size/10,this.size/7));
        //stroke(33,33,33);
        
        //MOUTH
        if(this.mouthTime <= 0){
        noFill();
        stroke(0);
        arc(this.x, this.y + this.size/20, this.size/6, this.size/6, 0, PI);
        noStroke();
        }
        else{
        fill(255,0,0);
        stroke(0);
        ellipse(this.x,this.y+this.size/18,this.size/5);
        noStroke();
        }
    } 
    this.movUp = function(){
        this.y -= this.movSpeed;
    }
    
    this.detectEdge = function(){
        if(this.y < -this.size/2)
            this.y = height + this.size;
    }
    
    this.collideWithBubbles = function(others){
        //print(this.mouthTime);
        for(var i=0; i<others.length; i++){
            if(this.index != others[i].index){ //CHECK IF THE BUBBLE IS NOT COLLIDING WITH ITSELF
               if(dist(this.x,this.y,others[i].x,others[i].y) < this.size/2 + others[i].size/2){ //ARE THEY COLLIDING?
                   if(this.x > others[i].x){
                       this.x += 1;
                       this.mouthTime = 1;
                   }
                    else{
                        this.x -= 1;
                        this.mouthTime = 1;
                    }
                }
            }      
        }
        
    }
    
}
