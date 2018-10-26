const maxGemCount = 12;
var gemCount = 0;
var gemsRemaining;
const gemValue = 10;

var gems;

//Creates all the gems and initializes them.
function createGems()
{
    gems = game.add.group();
    gems.enableBody = true;

    gemCount = randomInt(5, maxGemCount);
    for (var i = 0; i < gemCount; i++) {
        let gem = gems.create(i * 70, randomInt(0, 500), 'gem');
        gem.body.gravity.y = 1000;
        gem.body.bounce.y = 0.3 + Math.random() * 0.2;
        gem.anchor.setTo(0.5, 0.5);
        gem.body.collideWorldBounds = true;
        gem.update = () => {
            gem.angle += 1;
        };
    }
    gemsRemaining = gemCount;
}

//Bounces a gem whenever it hits  an obstacle. 
function bounceBackGem(gem, platform) {
    if (gem.body.touching.down)
        gem.body.velocity.y = -400 - Math.random() * 150;
}