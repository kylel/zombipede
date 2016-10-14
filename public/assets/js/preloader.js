Zombipede.Preloader = function (game) {
	//this.game = game;
};

Zombipede.Preloader.prototype = {
	preload: function () {
		this.logo = this.add.sprite(this.world.centerX, 200, 'logo');
		this.loadingBar = this.add.sprite(this.world.centerX, 380, 'loadingBar');
		this.loadImages();
		this.load.audio('menuSound', './assets/sounds/menusound.mp3');
		this.load.setPreloadSprite(this.loadingBar);
	},

	loadImages: function () {
		this.load.image('menuScreen', './assets/images/menu.png');
		this.load.image('classicButton', './assets/images/classicbutton.png');
		this.load.image('gameOverScreen', './assets/images/gameover01.png');
		this.load.image('zombie', './assets/images/snake02.png');
		this.load.image('human', './assets/images/apple.png');
	},
	
	create: function () {
		this.state.start('MainMenu');
	}
};