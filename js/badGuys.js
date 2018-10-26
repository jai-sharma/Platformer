const totalBadGuys = 4;

const badGuySpeed = 70;
const badGuyGravity = 1000;
const badGuyBounce = 0.2;

var badGuys;

//Creates all the bad guys and sets their properties.
function createBadGuys() {
    badGuys = game.add.group();
    badGuys.enableBody = true;

    for (var i = 0; i < totalBadGuys; i++) {
        var badGuy = badGuys.create(game.world.width - randomInt(0, 500), game.world.height - randomInt(128, 500), 'baddie');
        game.physics.arcade.enable(badGuy);
        badGuy.body.bounce.y = badGuyBounce;
        badGuy.body.gravity.y = badGuyGravity;
        badGuy.body.collideWorldBounds = true;
        badGuy.anchor.setTo(0, .5, 1);
        badGuy.animations.add('left', [0, 1], 10, true);
        badGuy.animations.add('right', [2, 3], 10, true);

        badGuy.body.onCollide = new Phaser.Signal();
        badGuy.body.onCollide.add(changeBadGuyDirection, this, badGuy);
    }

    badGuys.update = () => { updateBadGuys(); };
}

//called per frame to update the badguys.
function updateBadGuys() {
    moveBadGuys();
}

//Moves all the enemies.
function moveBadGuys() {
    badGuys.forEach(function (badGuy) {
        speed = badGuy.body.velocity.x;

        if (speed > 0)
            speed = badGuySpeed;
        else
            speed = -1 * badGuySpeed;

        badGuy.body.velocity.x = speed;
        if (speed > 0)
            badGuy.animations.play('right');
        else
            badGuy.animations.play('left');
    });
}

//Changes the direction of movement of an enemy if the enemy collides with the world bounds.
function changeBadGuyDirection(baddie) {
    if (baddie.body.blocked.left) {
        baddie.body.velocity.x = badGuySpeed;
    }
    else if (baddie.body.blocked.right) {
        baddie.body.velocity.x = -1 * badGuySpeed;
    }
}

//Kills all the badguys in the scene.
function killAllBadGuys() {
    badGuys.forEach(function (badGuy) {
        badGuy.kill();
    });
    badGuys.length = 0;
}