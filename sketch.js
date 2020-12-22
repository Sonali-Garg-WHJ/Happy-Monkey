var monkey, monkey_running, monkey_collide, ground;
var banana, bananaImage, obstacle, obstacleImage, cloud, cloudImage;
var bananaGroup, obstacleGroup, cloudGroup;
var score = 0;
var gameState = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_collide = loadAnimation("sprite_7.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  cloudImage = loadImage("cloud1.jpg");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80, 355, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide", monkey_collide);
  monkey.scale = .15;
  
  /*ground = createSprite(0,360,600,10);
  ground.velocityX = -8;*/

  edges = createEdgeSprites();

  obstacleGroup = new Group();
  bananaGroup = new Group();
  cloudGroup = new Group();

}


function draw() {
  background("white");

  console.log(monkey.y);

  if (gameState === "play") {
    if (keyDown("space") && monkey.y > 353) {
      monkey.velocityY = -15;
    }

    monkey.velocityY = monkey.velocityY + .5;

    if (monkey.isTouching(obstacleGroup)) {

      gameState = "end";
    }
    if (monkey.isTouching(bananaGroup)) {

      score = score + 1;
      bananaGroup.destroyEach();
    }
    spawnObstacle();
    spawnBanana();
    spawnCloud();

  } else if (gameState === "end") {
    textSize(40);
    text("Game Over", 200, 200);
    score = 0;

    monkey.changeAnimation("collide", monkey_collide);

    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    monkey.velocityY = 0;

    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
  }

  monkey.collide(edges[3]);
  
  /*if (ground.x ===300){
    ground.x = ground.x+600;
  }*/
  
  textSize(20);
  text(score+" Bananas, still hungry. FEED ME MORE!", 100, 150);


  drawSprites();
}

// 1.Spawn obstacle
function spawnObstacle() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(Math.round(random(500, 600)), 370, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -8;
    obstacle.scale = .13;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }
}

// 2. Spawn Banana
function spawnBanana() {
  if (frameCount % 150 === 0) {
    banana = createSprite(Math.round(random(200, 600)), Math.round(random(330, 380)), 20, 20);
    banana.addImage(bananaImage);
    banana.velocityX = -10;
    banana.scale = .12;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }

}

// 3.Spawn Clouds
function spawnCloud() {
  if (frameCount % 50 === 0) {
    cloud = createSprite(500, Math.round(random(0, 100)), 20, 20);
    cloud.addImage(cloudImage);
    cloud.velocityX = -8;
    cloud.scale = .2;
    cloud.lifetime = 100;
    cloudGroup.add(cloud);
  }
}