Zombipede = {
	//global vars
	score: 0,
	snake: {},
	human: {},
	speed: 0
};

Zombipede.Boot = function (game) {
	//this.game = game;
	//return this;
	this;
};

Zombipede.Boot.prototype = {
	preload: function () {
		this.game.load.image('logo', './assets/images/logo.png');
		this.game.load.image('loadingBar', './assets/images/loading.png');
	},

	create: function () {
		this.state.start('Preloader');
		//TODO orientation and scaling for mobile -- see phaser example projects
	}
};

Zombipede.saveHighScore = function(score) {
    let highScore = localStorage.getItem('highscore');
    if(highScore === null || score > highScore){
        localStorage.setItem('highscore', score);
        highScore = score;
    }
    return highScore;
};

Zombipede.getHighScore = function() {
    let highScore = localStorage.getItem('highscore');
    return highScore || 0;
};