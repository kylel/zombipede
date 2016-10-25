Zombipede.MainMenu = function (game) {
	this.game = game;
},

Zombipede.MainMenu.prototype = {

	preload : function() {
	},

	create: function () {
		this.add.image(0, 0, 'menuScreen',this);
		let but = this.add.button(this.world.centerX, 400, 'classicButton', this.startGame, this);
		but.anchor.setTo(0.5);
		//this.music = this.add.audio('menuSound');
		//this.music.play();
		let txt = this.add.text(this.world.width, this.world.height, "Version 0.5", 
		{ font: "bold 16px sans-serif", fill: "#46c0f9", align: "right"});
		txt.anchor.setTo(1,1);
	},

	startGame: function () {
		// Change the state to the actual game.
		this.state.start('Game');
	}

};