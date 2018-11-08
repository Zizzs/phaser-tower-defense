var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1600,
    height: 1200,
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
var roberts;
var dragons;
var turretButton = false;
var turret2Button = false;
var turret3Button = false;
var gold = 200;
var goldText;
var life = 100;
var lifeText;
var startgame = false;
var gameOver = false;
var killCounter;
var kills = 0;
var level = 1;
var levelText;
var bulletSound;
var arrowSound;
var fastBulletSound;
var deathSound;
var upgrade = 1;



var ENEMY_SPEED = 1/40000;
var ROBERT_SPEED = 1/120000;
var DRAGON_SPEED = 1/160000;



var map =  [[ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                       -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                               -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                               -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                               -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,             -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1,   0, 0, -1, -1, -1,         0, 0, 0, 0, 0, 0, -1, -1, 0, 0, -1],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,       -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, 0, -1, -1, 0, -1, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,        -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, -1, 0, -1, -1, 0, -1, 0, 0, 0, -1, -1],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, 0, 0,      0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, 0, -1, -1, -1, -1, 0, 0, 0, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, 0, 0, -1, -1, -1, -1, -1, -1, -1,      0, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,                -1, -1, -1, -1, -1, 0],
            [ 0,-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,      -1, -1, -1, -1, -1, -1, 0,   0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,                -1, -1, -1, -1, -1, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]];
function preload() {    
    // load images
    this.load.image('mapOne', 'assets/updatedMap.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('tower', 'assets/tower.png');
    this.load.image('tower2', 'assets/tower2.png');
    this.load.image('tower3', 'assets/fastTower.png');
    this.load.image('enemy', 'assets/enemy.gif');
    this.load.image('robert', 'assets/robert1.png');
    this.load.image('dragon', 'assets/dragon.png');
    this.load.image('towerOneButton', 'assets/towerOneButton.png');
    this.load.image('towerTwoButton', 'assets/towerTwoButton.png');
    this.load.image('towerThreeButton', 'assets/fastTowerButton.png');
    this.load.image('uibar', 'assets/bottombar.jpg');
    this.load.image('startButton', 'assets/title.png');
    this.load.image('gameOver', 'assets/gameover.jpg');
    this.load.image('upgrade', 'assets/upgradeButton.png');
    
    // load audio
    this.load.audio('arrow', '/audio/arrow.mp3');
    this.load.audio('bullet', '/audio/bullet.mp3');
    this.load.audio('fastbullet', '/audio/fastbullet.mp3');
    this.load.audio('death', '/audio/death.mp3');

};


function create() {
    game.scene.pause("main");
    mapOne = this.add.image(800,600, 'mapOne');
  // this graphics element is only for visualization,
  // its not related to our path
  var graphics = this.add.graphics();
  drawGrid(graphics);

  // the path for our enemies
  // parameters are the start x and y of our paths
  path = this.add.path(200, -25);
  path.lineTo(200, 300);
  path.lineTo(400, 300);
  path.lineTo(400, 600);
  path.lineTo(100, 600);
  path.lineTo(100, 1000);
  path.lineTo(600, 1000);
  path.lineTo(600, 200);
  path.lineTo(800, 200);
  path.lineTo(800, 1000);
  path.lineTo(1500, 1000);
  path.lineTo(1500, 700);
  path.lineTo(1000, 700);
  path.lineTo(1000, 300);
  path.lineTo(1400, 300);
  path.lineTo(1400, -25);

  
  this.add.image(400,1180, 'uibar');

  graphics.lineStyle(3, 0xffffff, 1);
  //visualize the path
  

  //enemies
  enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true});
  this.nextEnemy = 0;
  roberts = this.physics.add.group({ classType: Robert, runChildUpdate: true});
  this.nextRobert = 0;
  dragons = this.physics.add.group({ classType: Dragon, runChildUpdate: true});
  this.nextDragon = 0;

  //turrets
  turrets = this.add.group({ classType: Turret, runChildUpdate: true});
  arrowTurrets = this.add.group({ classType: ArrowTurret, runChildUpdate: true});
  fastTurrets = this.add.group({ classType: FastTurret, runChildUpdate: true});

  turretOneButton = this.add.image(40, 1170, 'towerOneButton');
  turretOneButton.setInteractive();
  turretOneButton.on('pointerdown', () => { turretButton = true; turret2Button = false; turret3Button = false;
        turretOneButton.tint = 0xfff132;
        turretTwoButton.tint = 0xffffff;
        turretThreeButton.tint = 0xffffff;
      });
  this.input.on('pointerdown', placeTurret);

  turretTwoButton = this.add.image(120, 1170, 'towerTwoButton');
  turretTwoButton.setInteractive();
  turretTwoButton.on('pointerdown', () => { turret2Button = true; turretButton = false; turret3Button = false;
    turretTwoButton.tint = 0xfff132;
    turretOneButton.tint = 0xffffff;
    turretThreeButton.tint = 0xffffff;});
  this.input.on('pointerdown', placeTurret2);

  turretThreeButton = this.add.image(200, 1170, 'towerThreeButton');
  turretThreeButton.setInteractive();
  turretThreeButton.on('pointerdown', () => { turret3Button = true; turret2Button = false; turretButton = false;
    turretThreeButton.tint = 0xfff132;
    turretTwoButton.tint = 0xffffff;
    turretOneButton.tint = 0xffffff;});
  this.input.on('pointerdown', placeTurret3);
  const upgradeButton = this.add.image(400, 1170, 'upgrade');
  upgradeButton.setInteractive();
      upgradeButton.on('pointerdown', function() {
        if (gold >= 2000) {
          upgrade += 1;
          gold -= 2000;
          goldText.setText('Gold: '+ gold);
        }
  })

  
  bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
  arrows = this.physics.add.group({classType: Arrow, runChildUpdate: true});
  fastbullets = this.physics.add.group({classType:FastBullet, runChildUpdate: true});

  this.physics.add.overlap(enemies, bullets, damageEnemyBullet);
  this.physics.add.overlap(enemies, arrows, damageEnemyArrow);
  this.physics.add.overlap(enemies, fastbullets, damageEnemyFastBullet);
  this.physics.add.overlap(roberts, bullets, damageRobertBullet);
  this.physics.add.overlap(roberts, arrows, damageRobertArrow);
  this.physics.add.overlap(roberts, fastbullets, damageRobertFastBullet);
  this.physics.add.overlap(dragons, bullets, damageDragonBullet);
  this.physics.add.overlap(dragons, arrows, damageDragonArrow);
  this.physics.add.overlap(dragons, fastbullets, damageDragonFastBullet);


    
    goldText = this.add.text(700, 1155, 'Gold: ' + gold, { fontSize: '28px', fill: '#FFD700' });
    lifeText = this.add.text(1000 ,1155, 'Life: ' + life, {fontSize: '28px', fill: '#000' });
    killCounter = this.add.text(1300, 1155, 'Kills: ' + kills, { fontSize: '28px',fill: '#000'});
    levelText = this.add.text(710, 30, 'Level: ' + level, {fontSize: '56px', fill: '#ff8200' });

    const startButton = this.add.image(800, 600, 'startButton');
    startButton.setInteractive();
    startButton.on('pointerdown', function() {
        startgame = true;
        startButton.destroy();
    })
 
     // add sounds
     bulletSound = this.sound.add('bullet');
     arrowSound = this.sound.add('arrow');
     deathSound = this.sound.add('death');
     fastBulletSound = this.sound.add('fastbullet');
  
}


//Damage creep functions

function damageEnemyBullet(enemy, bullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        var BULLET_DAMAGE = 125 * upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

function damageEnemyArrow(enemy, arrow) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && arrow.active === true) {
        // we remove the bullet right away
        var ARROW_DAMAGE = 200 * upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(ARROW_DAMAGE);
    }
}

function damageEnemyFastBullet(enemy, fastbullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && fastbullet.active === true) {
        // we remove the bullet right away
        var FASTBULLET_DAMAGE = 70 * upgrade;
        fastbullet.setActive(false);
        fastbullet.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(FASTBULLET_DAMAGE);
    }
}

function damageRobertBullet(robert, bullet) {  
    // only if both robert and bullet are alive
    if (robert.active === true && bullet.active === true) {
        // we remove the bullet right away
        var BULLET_DAMAGE = 80 * upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(BULLET_DAMAGE);
    }
}



 function damageRobertArrow(robert, arrow) {  

    // only if both robert and bullet are alive
    if (robert.active === true && arrow.active === true) {
        // we remove the bullet right away
        var ARROW_DAMAGE = 350 * upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(ARROW_DAMAGE);
    }
}

function damageRobertFastBullet(robert, fastbullet) {  

    // only if both robert and bullet are alive
    if (robert.active === true && fastbullet.active === true) {
        // we remove the bullet right away
        var FASTBULLET_DAMAGE = 70 * upgrade;
        fastbullet.setActive(false);
        fastbullet.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(FASTBULLET_DAMAGE);
    }
}

function damageDragonBullet(dragon, bullet) {  
    // only if both robert and bullet are alive
    if (dragon.active === true && bullet.active === true) {
        // we remove the bullet right away
        var BULLET_DAMAGE = 80 * upgrade;
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        dragon.receiveDamage(BULLET_DAMAGE);
    }
}
  function damageDragonArrow(dragon, arrow) {  
     // only if both robert and bullet are alive
    if (dragon.active === true && arrow.active === true) {
        // we remove the bullet right away
        var ARROW_DAMAGE = 250 * upgrade;
        arrow.setActive(false);
        arrow.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        dragon.receiveDamage(ARROW_DAMAGE);
    }
}
function damageDragonFastBullet(dragon, fastbullet) {  

    // only if both robert and bullet are alive
    if (dragon.active === true && fastbullet.active === true) {
        // we remove the bullet right away
        var FASTBULLET_DAMAGE = 100 * upgrade;
        fastbullet.setActive(false);
        fastbullet.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        dragon.receiveDamage(FASTBULLET_DAMAGE);
    }
}

function drawGrid(graphics) {
    graphics.lineStyle(1, 0x000000, 0.45);
    for(var i = 0; i < 38; i++) {
        graphics.moveTo(0, i * 32);
        graphics.lineTo(1600, i * 32);
    }
    for(var j = 0; j < 50; j++) {
        graphics.moveTo(j * 32, 0);
        graphics.lineTo(j * 32, 1200);
    }
    graphics.strokePath();


   
}

function update(time, delta) { 
   
    if(gameOver) {
        const gameOverButton = this.add.image(700, 400, 'gameOver');
        mapOne.tint = 0xbc0505;
        gameOverButton.setInteractive();
        gameOverButton.on('pointerdown', function() {
            mapOne.tint = 0xbc0505;
            gameOverButton.destroy();
            location.reload();
        return;
        })
    }
    

    if (time > this.nextEnemy &&  startgame ===true)
    {
        var enemy = enemies.get();
        
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);

            // place the enemy at the start of the path
            enemy.startOnPath();

            this.nextEnemy = time + (5000/(1+(1.2*level)));

        }
    }       

    if (time > this.nextRobert && roberts.children.entries.length < 5 && startgame ===true && kills >20)
    {
        var robert = roberts.get();
        
        if (robert)
        {
            robert.setActive(true);
            robert.setVisible(true);

            // place the robert at the start of the path
            robert.startOnPath();
 
            this.nextRobert = time + (10000/(1+(0.7*kills)));
        }
    }

    if (time > this.nextDragon && dragons.children.entries.length < 1 && startgame ===true && kills >400)
    {
        var dragon = dragons.get();
        
        if (dragon)
        {
            dragon.setActive(true);
            dragon.setVisible(true);
             // place the robert at the start of the path
            dragon.startOnPath();
 
            this.nextDragon = time + (10000/(1+(0.3*kills)));
        }
    }
    

    for (var i=0; i < enemies.children.entries.length; i++) {
        if (enemies.children.entries[i].active === false) {
            enemies.children.entries.splice(i, 1);
        }
    }

    for (var i=0; i < roberts.children.entries.length; i++) {
        if (roberts.children.entries[i].active === false) {
            roberts.children.entries.splice(i, 1);
        }
    }

    for (var i=0; i < dragons.children.entries.length; i++) {
        if (dragons.children.entries[i].active === false) {
            dragons.children.entries.splice(i, 1);
        }
    }


    level = Math.ceil(time/40000);
    levelText.setText("Level: " + level);

    this.input.keyboard.on('keydown_A', function(event) {
        turretButton = true;
        turret2Button = false;
        turret3Button = false;
      });
      this.input.keyboard.on('keydown_S', function(event) {
        turret2Button = true;
        turretButton = false;
        turret3Button = false;
      });
      this.input.keyboard.on('keydown_D', function(event) {
        turret3Button = true;
        turretButton = false;
        turret2Button = false;

      });


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

function addArrow(x, y, angle) {
    var arrow = arrows.get();
    if (arrow)
    {
        arrow.fire(x, y, angle);
    }
}


function addFastBullet(x, y, angle) {
    var fastbullet = fastbullets.get();
    if (fastbullet)
    {
        fastbullet.fire(x, y, angle);
    }
}


function endGame() {
    if (life <= 0 ) {
    gameOver = true;
    }
}