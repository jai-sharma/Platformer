const playerMoveSpeed = 150;
const playerJumpStrength = 850;
const playerGravity = 2000;
const playerBounce = 0.2;
const canKillEnemy = true;
const startLives = 3;

var player;
var lives = startLives;
var isGamePaused = false;

var livesText;
var pauseText;

//Creates a player and initializes it.
function createPlayer() {
    player = game.add.sprite(32, game.world.height - 150, 'player');
    isGamePaused = false;
    game.physics.arcade.enable(player);
    player.body.bounce.y = playerBounce;
    player.body.gravity.y = playerGravity;
    player.body.collideWorldBounds = true;
    player.anchor.setTo(0.5, 1);
    player.update = () => {
        updatePlayer();
    };

    player.animations.add('left', [0, 3], 10, true);
    player.animations.add('right', [5, 8], 10, true);

    initLives();
    initializePauseText();

    initializeKeyboard();
}

//This function is called perframe.
function updatePlayer() {
    movePlayer();
}

//This function handles the input and moves the player accordingly
//Left arrow for left horizontal movement.
//Right arrow for right horizontal movement.
//Up arrow for jumping if the character is grounded.
function movePlayer() {
    player.body.velocity.x = 0;
    //if (!player.body.touching.down)
    //player.animations.stop();

    if (cursors.left.isDown) {
        player.body.velocity.x = -playerMoveSpeed;
        //if (player.body.touching.down)
        player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = playerMoveSpeed;
        //if (player.body.touching.down)
        player.animations.play('right');
    }
    else {
        player.animations.stop();
    }

    if (cursors.up.isDown || keySpace.isDown) {
        jump();
    }

    relocatePlayer();
}

function jump() {
    if (player.body.touching.down) {
        player.body.velocity.y = -playerJumpStrength;
    }
}

//if player goes out of the screen, makes player come back from the opposite end.
//checks if player is not in air and is not colliding with any platform then only it allows to
//pass player through screen.
function relocatePlayer() {
    var collided = false;

    platforms.forEach(element => {
        if (checkOverlap(player, element)) {
            player.body.velocity.y = 400;
            collided = true;
            return null;
        }
    });

    if (!collided) {
        if (player.body.blocked.left) {
            player.x = game.world.width - player.body.halfWidth;
        }
        else if (player.body.blocked.right) {
            player.x = player.body.halfWidth;
        }
    }

}

//Checks if two sprites are overlapping with each other.
//takes 0.01 as an offset for the first sprite bounding box.
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    boundsA.x -= 0.001;
    boundsA.y -= 0.001;

    var result = Phaser.Rectangle.intersects(boundsA, boundsB);
    //var result = spriteB.getBounds().contains(spriteA.x, spriteA.y - spriteA.body.halfHeight);
    return result;
}

//Makes player collect a gem if the player collides with it.
//Destroys the gem and adds the value of the gem to the score.
function collectGems(player, gem) {
    gem.kill();
    gemsRemaining -= 1;

    increaseScore(gemValue);

    if (gemsRemaining <= 0) {
        levelComplete();
    }
}

//Collects a star and destroys it.
//adds the value of the star to the score.
function collectStar(star) {
    star.kill();
    increaseScore(starValue);
}

//Called whenever the player collides with an enemy
//if the player hits the enemy from the top then the enemy is destroyed
//and a star is provided to the player
//else the player gets killed and the game is started again.
function collidedWithBaddie(player, baddie) {
    if (canKillEnemy) {
        if (baddie.y - player.y >= baddie.height / 2) {
            createStar(baddie);
            baddie.kill();
        }
        else
            die();
    }
    else {
        die();
    }
}

//Pauses game if it's not paused.
//else resumes game.
function togglePause() {
    if (isGamePaused)
    {
        isGamePaused = false;
        setPauseText("");
    }
    else
    {
        isGamePaused = true;
        setPauseText("PAUSED");
    }

    game.paused = isGamePaused;
}

//Restarts the whole game and resets everything.
function restartGame() {
    score = 0;
    lives = startLives;
    isGamePaused = false;
    game.paused = false;
    setPauseText("");

    killAllBadGuys();
    game.state.start(game.state.current);
}

//deducts a live from the left lives.
//if no live is left then restarts the game.
function die() {
    //score = 0;
    //killAllBadGuys();
    //game.state.start(game.state.current);
    addLives(-1);
    if (lives > 0) {
        //alert("You Died!!!");
        player.body.velocity.y = 0;
        player.x = 32;
        player.y = game.world.height - 150;
        alert("You Died!!!");
    }
    else {
        alert("Game Over");
        restartGame();
    }
}

//Called when the player collects all the gems.
function levelComplete() {
    alert('You won');
    restartGame();
}

//initializes the lives text and sets it's default value.
function initLives() {
    livesText = game.add.text(game.world.width - 134, 16, '', { fontSize: '32px', fill: '#242424' });
    setLives(lives);
}

//sets the lives text according to the lives provided.
function setLivesText(lives) {
    livesText.text = "Lives: " + lives;
}

//changes the left lives of the player.
function setLives(lives) {
    this.lives = lives;
    setLivesText(this.lives);
}

//adds the delta value to the lives left.
function addLives(deltaLives) {
    lives += deltaLives;
    setLivesText(lives);
}


//creates pause text on screen.
function initializePauseText()
{
    pauseText = game.add.text(game.world.width /2, game.world.height/2, '', { fontSize: '64px', fill: '#242424' });
    pauseText.anchor.setTo(0.5, 0.5);
}

//changes the text of pauseText.
//to PAUSED if the game is paused.
//and to NULL if the game is resumed.
function setPauseText(value)
{
    pauseText.text = value;
}