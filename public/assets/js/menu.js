var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        game.load.image('menu', './assets/images/menu.png');
	   game.load.image('classicbutton', './assets/images/classicbutton.png');
	   game.load.audio('menusound', './assets/sounds/menusound.mp3');
    },

    create: function () {

        // Add menu screen.
        // It will act as a button to start the game.
	game.add.image(0, 0, 'menu',this);
	this.add.button(116, 293, 'classicbutton', this.startGame, this);
	music = game.add.audio('menusound');
	music.play();
    },

    startGame: function () {

        // Change the state to the actual game.
        this.state.start('Game');

    }

};