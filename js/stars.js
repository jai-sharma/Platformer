const starValue = 50;

var stars;


//create group of stars.
function createStars()
{
    stars = game.add.group();
    stars.enableBody = true;
}

//Generates a star on the position of the badGuy if its killed.
function createStar(badGuy) {

    var star = stars.create(badGuy.x, badGuy.y, 'star');
    star.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(star);
    star.body.onCollide = new Phaser.Signal();
    star.body.onCollide.add(collectStar, this, star);
}
