var Human = function (_game, x,y, zombies) {
    Phaser.Sprite.call(this, _game, x, y, 'human');
    this.anchor.setTo(0.5);
    _game.add.existing(this);
    this.game = _game;
    this.speed = 0;
    this.updateCycles = 60;
    this.updateDelay = 0;
    this.direction = 'right';
    this.zombies = zombies;
    this.frame = 0;
    this.alarmed = false;
    this.shirt = _game.add.sprite(x,y,'human-shirts');
    this.shirt.anchor.setTo(0.5);
    this.shirt.frame = Math.floor(Math.random() * 4);;
};

Human.prototype = Object.create(Phaser.Sprite.prototype);
Human.prototype.constructor = Human;

Human.prototype.move = function () {
	let x = this.x;
	let y = this.y;
	let angle = this.angle;

	let step = 0;

	let snakeLength = this.zombies.getLength();
    for (let i=0; i<snakeLength; i++) {
    	//console.log(i);
    	let dist = Phaser.Point.distance(this, this.zombies.getSegment(i), true);
    	if (dist < squareSize*4) {
    		step = squareSize;
    		this.alarmed = true;
    		this.frame = 3;
    	}
    }



	switch (this.direction) {
        case 'right':
            x += step;
            angle = 90;
            break;
        case 'left':
            x -= step;
            angle = -90;
            break;
        case 'up':
            y -= step;
            angle = 0;
            break;
        case 'down':
            y += step;
            angle = 180;
            break;
    }
    if (this.zombies.isHere(x,y)) {
    	//cant move here
    } else if (x>=gameWidth || x<0 || y>=gameHeight || y<0) {
    	//there is a wall. cant move here
    } else {
    	this.x = x;
    	this.y = y;
    	this.angle = angle;
    	this.shirt.x = x;
    	this.shirt.y = y;
    	this.shirt.angle = angle;
    }
    if (this.alarmed) {
    	this.frame+=1;
    	if (this.frame > 7) {
    		this.frame = 4;
    	}
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