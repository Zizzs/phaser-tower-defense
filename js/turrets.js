

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
        
        
        var enemy = getEnemy(this.x, this.y, 500);
        if(enemy) {
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
        
        
        var enemy = getEnemy(this.x, this.y, 1000);
        if(enemy) {
            var angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
            addArrow(this.x, this.y, angle);
            this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    },

    update: function (time, delta)
    {
        // time to shoot, turret.speed interval for bullets
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 2000;
        }
        // if(gameOver== true){
        //     turret.destroy();
        // }
    }

});



// aiming turrets
function getEnemy(x, y, distance) {
    var enemyUnits = enemies.getChildren();
    for(var i = 0; i < enemyUnits.length; i++) {      
        if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) < distance)
            return enemyUnits[i];
    }
    return false;
} 



function placeTurret2(pointer) {
    var i = Math.floor(pointer.y/32);
    var j = Math.floor(pointer.x/32);
    if(canPlaceTurret(i, j) && turret2Button ==true && gold >= 200) {
        var turret = turrets.get();
        if (turret)
        {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
            turret2Button = false;
        }   
    }
}

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
        }   
    }
}
