var Human = function (_game, x,y, zombies) {
    Phaser.Sprite.call(this, _game, x, y, 'zombie');
    this.anchor.setTo(0.5);
    _game.add.existing(this);
    this.game = _game;
    this.speed = 0;
    this.updateCycles = 50;
    this.updateDelay = 0;
    this.direction = 'right';
    this.zombies = zombies;
};

Human.prototype = Object.create(Phaser.Sprite.prototype);
Human.prototype.constructor = Human;

Human.prototype.move = function () {
	let x = this.x;
	let y = this.y;
	let angle = this.angle;

	switch (this.direction) {
        case 'right':
            x += squareSize;
            angle = 90;
            break;
        case 'left':
            x -= squareSize;
            angle = -90;
            break;
        case 'up':
            y -= squareSize;
            angle = 0;
            break;
        case 'down':
            y += squareSize;
            angle = 180;
            break;
    }
    if (this.zombies.isHere(x,y)) {
    	//cant move here
    } else if (x>=1024 || x<0 || y>=640 || y<0) {
    	//there is a wall. cant move here
    } else {
    	this.x = x;
    	this.y = y;
    	this.angle = angle;
    }
};

Human.prototype.chooseDirection = function () {
	var directions = ['right', 'left', 'up', 'down'];
	this.direction = directions[Math.floor(Math.random()*directions.length)];
};

Human.prototype.update = function () {
	this.updateDelay++;
	if (this.updateDelay == (this.updateCycles - this.speed)) {
		this.chooseDirection();
		this.move();
		this.updateDelay = 0;
	}
};