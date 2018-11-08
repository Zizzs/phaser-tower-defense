var Turret = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    
    initialize:

    function Turret (scene)
    {
        
            Phaser.GameObjects.Image.call(this, scene, 0, 0,'tower');
            this.nextTic = 0;
            gold -= 100;
            goldText.setText('Gold: '+ gold);  
        
        
    },

    
    // we will place the turret according to the grid
    place: function(i, j) {            
        this.y = i * 32 + 32/2;
        this.x = j * 32 + 32/2;
        map[i][j] = 1;            
    },
    
    fire: function() {
        // turret.distance for enemy targeting
        var enemy = getEnemy(this.x, this.y, 400);
        var robert = getRobert(this.x, this.y, 300);
        var dragon = getDragon(this.x, this.y, 300);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }

        else if(robert) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, robert.x, robert.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        else if(dragon) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, dragon.x, dragon.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }

    },
    update: function (time, delta)
    {
        // time to shoot, turret.speed interval for bullets
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 900;
        }
        // if(gameOver== true){
        //     turret.destroy();
        // }
        
    }
});



var ArrowTurret = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    
    initialize:
    function ArrowTurret (scene)
    {
        
            Phaser.GameObjects.Image.call(this, scene, 0, 0,'tower2');
            this.nextTic = 0;
            gold -= 200;
            goldText.setText('Gold: '+ gold); 
        
    },

    
    // we will place the turret according to the grid
    place: function(i, j) {            
        this.y = i * 32 + 32/2;
        this.x = j * 32 + 32/2;
        map[i][j] = 1;            
    },
    
    fire: function() {
        // turret.distance for enemy targeting
        
        
        var enemy = getEnemy(this.x, this.y, 500);
        var robert = getRobert(this.x, this.y, 700);
        var dragon = getDragon(this.x, this.y, 600);
        
        if(dragon) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, dragon.x, dragon.y);
            addArrow(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        else if(robert) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, robert.x, robert.y);
            addArrow(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }

        else if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addArrow(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        
    },

    update: function (time, delta)
    {
        // time to shoot, turret.speed interval for Arrows
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
       
    }

});

var FastTurret = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    
    initialize:

    function Turret (scene)
    {
        
            Phaser.GameObjects.Image.call(this, scene, 0, 0,'tower3');
            this.nextTic = 0;
            gold -= 500;
            goldText.setText('Gold: '+ gold);  
        
        
    },

    
    // we will place the turret according to the grid
    place: function(i, j) {            
        this.y = i * 32 + 32/2;
        this.x = j * 32 + 32/2;
        map[i][j] = 1;            
    },
    
    fire: function() {
        // turret.distance for enemy targeting
        var enemy = getEnemy(this.x, this.y, 175);
        var robert = getRobert(this.x, this.y, 175);
        var dragon = getDragon(this.x, this.y, 200);

        if(dragon) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, dragon.x, dragon.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
        else if(robert) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, robert.x, robert.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        } 
        else if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addBullet(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }

        

    },
    update: function (time, delta)
    {
        // time to shoot, turret.speed interval for bullets
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 100;
        }
        // if(gameOver== true){
        //     turret.destroy();
        // }
        
    }
});




// aiming turrets at enemies
function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {      
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 
//aiming turrets at roberts
function getRobert(x, y, distance) {
    var robertUnits = roberts.getChildren();
    for(var i = 0; i < robertUnits.length; i++) {      
        if(robertUnits[i].active && Phaser.Math.Distance.Between(x, y, robertUnits[i].x, robertUnits[i].y) < distance)
            return robertUnits[i];
    }
    return false;
} 

//aiming turrets at dragons
function getDragon(x, y, distance) {
    var dragonUnits = dragons.getChildren();
    for(var i = 0; i < dragonUnits.length; i++) {      
        if(dragonUnits[i].active && Phaser.Math.Distance.Between(x, y, dragonUnits[i].x, dragonUnits[i].y) < distance)
            return dragonUnits[i];
    }
    return false;
} 


//place arrow turrets
function placeTurret2(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j) && turret2Button ==true && gold >= 200) {
        var arrowTurret = arrowTurrets.get();
        if (arrowTurret)
        {
            arrowTurret.setActive(true);
            arrowTurret.setVisible(true);
            arrowTurret.place(i, j);
            turret2Button = false;
            turretTwoButton.tint = 0xffffff;

        }   
    }
}

//place bullet turrets
function placeTurret(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j) && turretButton ==true && gold >= 100) {
        var turret = turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
            turretButton = false;
            turretOneButton.tint = 0xffffff;
        }   
    }
}

//place fast turrets
function placeTurret3(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j) && turret3Button ==true && gold >= 500) {
        var fastTurret = fastTurrets.get();
        if (fastTurret)
        {
            fastTurret.setActive(true);
            fastTurret.setVisible(true);
            fastTurret.place(i, j);
            turret3Button = false;
            turretThreeButton.tint = 0xffffff;

        }   
    }
}