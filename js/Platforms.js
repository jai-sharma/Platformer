const allowJumpFromBottom = false; //true if player can jump on the platforms from bottom.

//Creates ground and platforms and set them immovable.
//set the positions of platforms to random locations.
function createPlatforms() {
    platforms = game.add.group();
    platforms.enableBody = true;

    let ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var sideToss = randomInt(0, 1);
    var firstTileXPos = 400;
    var secondTileXPos = -75;
    if(sideToss == 1)
    {
        firstTileXPos = -75;
        secondTileXPos = 400;
    }

    let ledge = platforms.create(firstTileXPos, randomInt(380, 400), 'ground');
    if (allowJumpFromBottom)
        ledge.body.checkCollision.down = false;
    ledge.body.immovable = true;

    var ledgePosY = randomInt(220, 300);
    ledge = platforms.create(secondTileXPos, ledgePosY, 'ground');
    if (allowJumpFromBottom)
        ledge.body.checkCollision.down = false;
    ledge.body.immovable = true;

    var instantiationChance = randomInt(0, 1);

    if (instantiationChance == 1) {
        ledge = platforms.create(firstTileXPos, ledgePosY - randomInt(100, 150), 'ground');
        if (allowJumpFromBottom)
            ledge.body.checkCollision.down = false;
        ledge.body.immovable = true;
    }
}