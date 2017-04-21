var game = new Phaser.Game(1600, 900, Phaser.AUTO, 'phaser-learning', { preload: preload, create: create, update: update });

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

    balls.createMultiple(100, 'ball');
    //balls.setAll('collideWorldBounds', true);
    //balls.setAll('checkWorldBounds', true);
    //balls.setAll('outOfBoundsKill', true);
    balls.setAll('setCircle', 45);
}

var fromPos = new Phaser.Point();
var toPos = new Phaser.Point();

var balls;

function update() {
	if (game.input.activePointer.isDown) {
		toPos = game.input.activePointer.position.clone();

		g.clear();

    	g.lineStyle(2, 0xffffff, 1);
    	g.moveTo(fromPos.x, fromPos.y);
    	g.lineTo(toPos.x, toPos.y);
	} else {
		g.clear();
	}

	game.physics.arcade.collide(balls, balls);

	game.debug.text('update', 100, 100);
	game.debug.text('Left Button: ' + game.input.activePointer.isDown, 100, 132);
	game.debug.text('formPos: ' + fromPos.x + ', ' + fromPos.y, 100, 164);
	game.debug.text('toPos: '+ toPos.x + ', ' + toPos.y, 100, 196);
}

function mouseDown() {
	fromPos = game.input.activePointer.position.clone();
}

function mouseUp() {
	if (balls.countDead() == 0)
    {
    	balls.getRandom().kill();
    }
    
    var ball = balls.getFirstDead();
    
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
    ball.body.bounce.setTo(0.95, 0.95);
    ball.body.collideWorldBounds = true;

    ball.reset(toPos.x, toPos.y);
    ball.body.velocity.set(toPos.x-fromPos.x, toPos.y-fromPos.y);
}
