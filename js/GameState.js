const width = 800;
const height = 600;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.image('sky', './assets/sky.png');
    game.load.image('ground', './assets/platform.png');
    game.load.image('gem', './assets/diamond.png');
    game.load.spritesheet('player', './assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', './assets/baddie.png', 32, 32);
    game.load.image('star', './assets/star.png');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    createBackground();
    
    createPlatforms();
    
    createBadGuys();
    
    createGems();
    
    createStars();
    
    createPlayer();    
    
    createScore();
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(badGuys, platforms);
    game.physics.arcade.collide(player, stars);
    game.physics.arcade.overlap(player, gems, collectGems, null, this);
    game.physics.arcade.collide(gems, platforms, bounceBackGem, null, this);
    game.physics.arcade.overlap(player, badGuys, collidedWithBaddie, null, this);
}

function createBackground() {
    game.add.sprite(0, 0, 'sky');
}