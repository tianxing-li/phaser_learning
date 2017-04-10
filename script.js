var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-pacman', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('ball', 'assets/pics/wizball.png');
}

var g;

function create() {
	// set up
	game.stage.backgroundColor = '#000000';
	
	game.input.mouse.capture = true;
	game.input.onDown.add(mouseDown, this);
	game.input.onUp.add(mouseUp, this);

	g = game.add.graphics(0,0);

	// world physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 300;

	// game objects
	balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.ARCADE;

    balls.createMultiple(10, 'ball');
    balls.setAll('checkWorldBounds', true);
    balls.setAll('outOfBoundsKill', true);
    balls.setAll('collideWorldBounds', true);
    balls.setAll('bounce', 0.9);
    balls.setAll('setCircle', 45);
}

var fromPos = new Phaser.Point();
var toPos = new Phaser.Point();

var balls;

function update() {
	game.debug.text('update', 100, 100);
	game.debug.text('Left Button: ' + game.input.activePointer.isDown, 100, 132);
	game.debug.text('formPos: ' + fromPos.x + ', ' + fromPos.y, 100, 164);
	game.debug.text('toPos: '+ toPos.x + ', ' + toPos.y, 100, 196);

	

	if (game.input.activePointer.isDown) {
		toPos = game.input.activePointer.position.clone();

		g.drawRect(0, 0, game.with, game.height);

		g.beginFill(0x0000ff);
    	g.lineStyle(2, 0x00ff00, 1);

    	g.moveTo(fromPos.x, fromPos.y);
    	g.lineTo(toPos.x, toPos.y);
    	g.endFill();
	}
}

function mouseDown() {
	fromPos = game.input.activePointer.position.clone();
}

function mouseUp() {
	

	if (balls.countDead() > 0)
    {
        var ball = balls.getFirstDead();
        console.log(ball.body);
        ball.anchor.x = 0.5;
        ball.anchor.y = 0.5;

        ball.reset(toPos.x, toPos.y);

        //game.physics.arcade.moveToPointer(balls, 300);
    }
}