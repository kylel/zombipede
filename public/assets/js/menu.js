Zombipede.MainMenu = function (game) {
    this.game = game;
},

Zombipede.MainMenu.prototype = {

    preload : function() {
        // Load all the needed resources for the menu.
        //game.load.image('menu', './assets/images/menu.png');
	   //game.load.image('classicbutton', './assets/images/classicbutton.png');
	   //game.load.audio('menusound', './assets/sounds/menusound.mp3');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
	   this.add.image(0, 0, 'menuScreen',this);
	   let but = this.add.button(this.world.centerX, 400, 'classicButton', this.startGame, this);
       but.anchor.setTo(0.5);
	   this.music = this.add.audio('menuSound');
	   this.music.play();
       let txt = this.add.text(this.world.width, this.world.height, "Version 0.2", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "right"});
       txt.anchor.setTo(1,1);
    },

    startGame: function () {
        // Change the state to the actual game.
        this.state.start('Game');
    }

};