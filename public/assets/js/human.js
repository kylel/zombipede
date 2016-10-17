var Human = function (_game, x,y) {
    Phaser.Sprite.call(this, _game, x, y, 'zombie');
    this.anchor.setTo(0.5);
    _game.add.existing(this);
    this.game = _game;
    this.speed = 0;
    this.updateCycles = 50;
    this.updateDelay = 0;
};

Human.prototype = Object.create(Phaser.Sprite.prototype);
Human.prototype.constructor = Human;

Human.prototype.move = function () {
	this.x += squareSize;
	//TODO: add random movement
};

Human.prototype.update = function () {
	/*this.updateDelay++;
	if (this.updateDelay % (this.updateCycles - this.speed) == 0) {
		this.move();
		this.updateDelay = 0;
	}*/
};