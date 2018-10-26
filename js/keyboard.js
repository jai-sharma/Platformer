var cursors;

var keySpace;
var keyX;
var keyP;

function initializeKeyboard()
{
    cursors = game.input.keyboard.createCursorKeys();

    keySpace = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    keyX = game.input.keyboard.addKey(Phaser.Keyboard.X);
    keyP = game.input.keyboard.addKey(Phaser.Keyboard.P);

    keyX.onDown.add(restartGame, this);
    keyP.onDown.add(togglePause, this);
}