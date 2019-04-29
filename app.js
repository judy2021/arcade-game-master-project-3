// Enemies our player must avoid
let Enemy = function(y,x,speed) {
    this.enemyY =y;
    this.enemyX=x;
    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
    this.enemyY = this.enemyY + this.speed * dt;
// reset bugs position when hit border 
    if (this.enemyY > 500){
        this.enemyY = -50;
    }
    // reset player position when collide with enemy-bug
    if (player.y >(this.enemyY -50)&& player.y <(this.enemyY+50)&&player.x>(this.enemyX -50)&&player.x<(this.enemyX+50)){
        player.resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.enemyX, this.enemyY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const initialPlayerY= 200;
const initialPlayerX = 400;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function(){
    // set player initial location
    this.y = initialPlayerY;
    this.x = initialPlayerX;
// load player image
    this.sprite ='images/char-cat-girl.png';
};
// alert when player reach water and reset player position
Player.prototype.update =function(){
    if (this.x <=0){
        alert("congratulation");
        this.resetPlayer();
    }
};
// draw the player on the screen
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite),this.y,this.x);
};

Player.prototype.resetPlayer =function(){
    this.y = initialPlayerY;
    this.x = initialPlayerX;
};
// moves the player up, down, left, right
Player.prototype.handleInput =function(keyup){
    if (keyup === 'left'&& this.y >0 )
        this.y = this.y -101;
    else if(keyup === 'right'&& this.y < 400)
         this.y = this.y +101;
    else if (keyup === 'up'&& this.x > -50)
        this.x = this.x -80;
    else if (keyup === 'down'&& this.x < 400)
        this.x = this.x +80;

}
Enemy.prototype.render =function(){
    ctx.drawImage(Resources.get(this.sprite), this.enemyY,this.enemyX);
}

var allEnemies=[];
// Instantiate all 3 enemies with random speed - one enemy for each row
for (var z = 0; z < 3 ;z ++){
    var randSpeed = Math.floor(Math.random()* 4 + Math.random()*4 )*90 + 100;
    allEnemies.push(new Enemy(-50,(75 * z) + 50, randSpeed));
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        87: 'up',
        83: 'down',
        65: 'left',
        68: 'right',

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
// Place the player object in a variable called player
var player = new Player();
