// Enemies our player must avoid

var RandomInteger = function (min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Enemy = function() {
    this.initial();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed;
    if (this.x > 505) {
        this.initial();
    }
    else if (this.y === player.y) {
        if ((this.x + 35 > player.x) && (this.x < player.x + 35)) {
            player.initial();
        }
    }
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.initial = function() {
    this.x = -100;
    this.y = (RandomInteger(1,3) * 83);
    this.speed = RandomInteger(2,10);  
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   this.initial();
   this.sprite = 'images/char-horn-girl.png';
}

Player.prototype.update = function(dt) {
    if (this.x < 0) {
        this.x = 0;
    } 
    else if (this.x > 4 * 101) {
        this.x = 4 * 101;
    }
    else if (this.y < 0) {
        this.initial();
    }
    else if (this.y > 5 * 83) {
        this.y = 5 * 83;
    }
    
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(allowedKeys){
    if (allowedKeys === 'left') {
        this.x-= 101;
    } 
    else if (allowedKeys === 'right') {
        this.x+=101;
    }
    else if (allowedKeys === 'up') {
        this.y-=83;
    }
    else if (allowedKeys === 'down') {
        this.y+=83;
    }
}

Player.prototype.initial = function(){
    this.x = 2 * 101; 
    this.y = 5 * 83; 
    this.speed = 83;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i<6; i++) {
    allEnemies.push(new Enemy());
}


var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

