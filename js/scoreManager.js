var score = 0;
var scoreText;

//Creates the scoreText and sets it to 0.
function createScore()
{
    scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#242424' });
    setScore(0);
    createInfoText();
}

//increase the current score by value provided.
//changes the scoreText accordingly.
function increaseScore(score)
{
    this.score += score;
    setScoreText(this.score);
}

//Changes the value of current score to the value provided.
//changes the scoreText accordingly.
function setScore(score)
{
    this.score = score;
    setScoreText(this.score);
}

//Changes the scoreText according to the value provived.
function setScoreText(score)
{
    scoreText.text = "Score: " + score;
}

function createInfoText()
{
    var infoText = game.add.text(game.world.width / 2, 16, 'arrow keys: movement\nspace\\ up arrow: jump \nx: restart\np:pause\\ resume', { fontSize: '8px', fill: '#242424' });
    infoText.anchor.setTo(0.5, 0);
    infoText.lineSpacing = -5;
}