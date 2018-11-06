var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
       
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var turretSpace = 2;
var path;
var turrets;
var enemies;
var turretButton = false;
var gold = 300;
var goldText;
var life = 100;
var lifeText;
var startgame = false;
var gameOver = false;

var ENEMY_SPEED = 1/10000;

var BULLET_DAMAGE = 50;

var map =  [[ 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];


function preload() {    
    //this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('mapOne', 'assets/MapOne.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('tower', 'assets/tower.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('towerOneButton', 'assets/towerOneButton.png');
    this.load.image('uibar', 'assets/bottombar.png');
    this.load.image('startButton', 'assets/startbutton.png');

   
   

};

function create() {
    this.add.image(400,300, 'mapOne');
  // this graphics element is only for visualization,
  // its not related to our path
  var graphics = this.add.graphics();
  drawGrid(graphics);

  // the path for our enemies
  // parameters are the start x and y of our paths
  path = this.add.path(160, -32);
  path.lineTo(160, 192);
  path.lineTo(480, 192);
  path.lineTo(480, 620);

  graphics.lineStyle(3, 0xffffff, 1);
  //visualize the path
  path.draw(graphics);

  enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true});
  this.nextEnemy = 0;

  turrets = this.add.group({ classType: Turret, runChildUpdate: true});

  this.input.on('pointerdown', placeTurret);
  bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});

  this.physics.add.overlap(enemies, bullets, damageEnemy);
  this.add.image(400,600, 'uibar');
  const turretOneButton = this.add.image(40, 568, 'towerOneButton');
    turretOneButton.setInteractive();
   
    turretOneButton.on('pointerdown', () => { turretButton = true; });
    
    goldText = this.add.text(630, 565, 'Gold: ' + gold, { fontSize: '28px', fill: '#000' });
    lifeText = this.add.text(630,30, 'Life: ' + life, {fontSize: '28px', fill: '#999' });

    const startButton = this.add.image(400, 300, 'startButton');
    startButton.setInteractive();
    startButton.on('pointerdown', () => { startgame = true });
 
}




function damageEnemy(enemy, bullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

function drawGrid(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(var i = 0; i < 19; i++) {
        graphics.moveTo(0, i * 32);
        graphics.lineTo(800, i * 32);
    }
    for(var j = 0; j < 25; j++) {
        graphics.moveTo(j * 32, 0);
        graphics.lineTo(j * 32, 600);
    }
    graphics.strokePath();
}

function update(time, delta) { 

    if(gameOver) {
        return;
    }
    // if its time for the next enemy

    if (time > this.nextEnemy && enemies.children.entries.length < 5)
    {
        var enemy = enemies.get();
        
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);

            // place the enemy at the start of the path
            enemy.startOnPath();

            this.nextEnemy = time + 500;
        }       
    // } else if (enemies.children.entries.length === 5 && this.enemy.children.entries.active === false) {
    //     enemies.children.entries = [];
    // }
    }

    for (var i=0; i < enemies.children.entries.length; i++) {
        if (enemies.children.entries[i].active === false) {
            enemies.children.entries.shift();
        }
    }
    endGame();
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}



function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

function endGame() {
    if (life <= 0 ) {
    gameOver = true;
    //we need to insert a pop up Game Over, button with refresh to start over
    }
}

