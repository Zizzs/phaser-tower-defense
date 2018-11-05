var Enemy = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'enemy');

        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        this.hp = 100;
    },

    startOnPath: function ()
    {   
        // set the t parameter at the start of the path
        this.follower.t = 0;
        this.hp = 100;
        
        // get x and y of the given t point
        path.getPoint(this.follower.t, this.follower.vec);
        
        // set the x and y of our enemy to the received from the previous step
        this.setPosition(this.follower.vec.x, this.follower.vec.y);            
    },
    receiveDamage: function(damage) {
        this.hp -= damage;           
        
        // if hp drops below 0 we deactivate this enemy
        if(this.hp <= 0) {
            this.setActive(false);
            this.setVisible(false); 
            gold += 25;
            goldText.setText('Gold: '+ gold);    
        }
    },
    update: function (time, delta)
    {
        if(gameOver){
            return;
        }
        // move the t point along the path, 0 is the start and 0 is the end
        this.follower.t += ENEMY_SPEED * delta;

        // get the new x and y coordinates in vec
        path.getPoint(this.follower.t, this.follower.vec);
        
        // update enemy x and y to the newly obtained x and y
        this.setPosition(this.follower.vec.x, this.follower.vec.y);

        // if we have reached the end of the path, remove the enemy
        if (this.follower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
            life -= 5;
            lifeText.setText("Life: " + life);
            removeEnemy = enemies.children.entries;
            removeEnemy.shift();
        }
    }

});