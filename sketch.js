
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"
var score = 0


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  // spookySound.play();
  spookySound.loop()
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);

}


function draw() {
  background(rgb(166, 52, 35));
  if (tower.y > 600) {
    tower.y = 300
  }

  if (gameState === "start") {
    textSize(25)
    fill("white")
    text("Jump on the platforms to gain score.\nAvoid touching the bottom of the platform \nor else you will lose! ", 100, 200)


  }

  if (keyDown("enter") &&gameState==="start") {
    gameState = "play"

  }


  if (gameState === "play") {


    if (keyDown("left")) {
      ghost.x = ghost.x - 3;

      // write a code to move left when left arrow is pressed
    }
    if (keyDown("right")) {

      ghost.x = ghost.x + 3;

      // write a code to move left when right arrow is pressed

    }
    if (keyDown("space")) {

      ghost.velocityY = -10;

      // write a code to move up when space arrow is pressed

    }

    ghost.velocityY = ghost.velocityY + 0.8;


    //write a condition for infinte scrolling tower

    spawnDoors();


    //write a code to make invisibleBlockGroup collide with ghost destroy the ghost and make gamestate to end.
    for (var i = 0; i < climbersGroup.length;i++){
      if (climbersGroup.get(i).isTouching(ghost)) {
        ghost.velocityY = 0;
        score = score+1
        climbersGroup.destroyEach()
        doorsGroup.destroyEach()
        invisibleBlockGroup.destroyEach()
      }

    }
    
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy()
      gameState = "end"
    }


    drawSprites();
    textSize(30)
    fill("black")
    text("Score: "+score,75,50)
  }
  if (gameState === "end") {
    background("black")
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250)
    text("This is your final score: "+score,180,280)
    spookySound.stop()
  }
}

function spawnDoors() {
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 15);
    var invisibleBlock = createSprite(200, 30);
    invisibleBlock.collide(ghost)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //add the random function
    door.x = Math.round(random(100, 600))
    invisibleBlock.x = door.x
    climber.x = door.x
    door.addImage(doorImg);
    climber.addImage(climberImg);

    //door.velocityY = 1;
    climber.velocityY = Math.round(random(1,3));
    //invisibleBlock.velocityY = 1;

    door.velocityY = climber.velocityY
    invisibleBlock.velocityY = climber.velocityY

    //change the depth of the ghost and door


    ghost.depth = door.depth;
    ghost.depth += 1;

    //assign lifetime for the  door, climber and invisible block

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    //add each obstacle to the group obstaclesGroup.add(obstacle);here  obstacle are door, climber and invisible block

    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

