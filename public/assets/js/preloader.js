Zombipede.Preloader = function (game) {
	//this.game = game;
};

Zombipede.Preloader.prototype = {
	preload: function () {
		this.logo = this.add.sprite(this.world.centerX, 200, 'logo');
		this.logo.scale.setTo(.5);
		this.logo.anchor.setTo(.5);
		this.loadingBar = this.add.sprite(this.world.centerX, 380, 'loadingBar');
		this.loadingBar.anchor.setTo(.5);
		this.loadImages();
		this.load.audio('menuSound', './assets/sounds/menusound.mp3');
		this.load.audio('zombieAttack-00', './assets/sounds/zombie-attack-00.wav');
		this.load.audio('zombieAttack-01', './assets/sounds/zombie-attack-01.ogg');
		this.load.setPreloadSprite(this.loadingBar);
	},

	loadImages: function () {
		this.load.image('menuScreen', './assets/images/menu.png');
		this.load.image('classicButton', './assets/images/classicbutton.png');
		this.load.image('tweetButton', './assets/images/tweetbutton.png');
		this.load.image('gameOverScreen', './assets/images/gameover01.png');
		this.load.spritesheet('zombie', './assets/images/zombie-shirts.png', 64, 64);
		this.load.spritesheet('human', './assets/images/human-anim.png', 64, 64);
		this.load.spritesheet('human-shirts', './assets/images/human-shirts.png', 64, 64);
	},
	
	create: function () {
		this.state.start('MainMenu');
	}
};

