const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;


var fruit_con,fruit_con_2,fruit_con_3,fr,fruit,ground;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var canw,canh

var rope,rope2,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
 var mobile = / iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
 if (mobile) {
  canw = displayWidth
  canh = displayHeight
 createCanvas(displayWidth + 80,displayHeight);} else {
 canw = windowWidth
 canh = windowHeight
 createCanvas(windowWidth,windowHeight);}
  

  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.06);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  buttonl = createImg('cut_btn.png');
  buttonl.position(360,200);
  buttonl.size(50,50);
  buttonl.mouseClicked(drop1);

  buttonll = createImg('cut_btn.png');
  buttonll.position(330,35);
  buttonll.size(50,50);
  buttonll.mouseClicked(drop2);


  button1 = createImg('balloon.png');
  button1.position(10,250);
  button1.size(150,100);
  button1.mouseClicked(airblow);

  button2 = createImg('mute.png');
  button2.position(450,20);
  button2.size(50,50);
  button2.mouseClicked(mute);

  
  rope = new Rope(9,{x:40,y:30});
  rope2 = new Rope(3,{x:400,y:225});
  rope3 = new Rope(6,{x:370,y:40});
  ground = new Ground(200,canh,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,canh - 80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3= new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth + 80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
    //sad_sound.play()
    
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play()
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    fruit=null;
     
   }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
  cut_sound.play()
}

function drop1()
{
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
  cut_sound.play()
}

function drop2()
{
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
  cut_sound.play()
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
  air.play()
}

function mute(){
  if (bk_song.isPlaying()) {
    bk_song.stop()
  }else{
    bk_song.play()
  }
}
