
Zombipede.GameOver = function (game) {
    //this.game = game;
};

Zombipede.GameOver.prototype = {

    preload : function() {
        //game.load.image('gameover', './assets/images/gameover01.png');
    },

    create : function() {

        this.add.button(0, 0, 'gameOverScreen', this.startGame, this);

        this.add.text(235, 350, "LAST SCORE", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        this.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
        this.add.button(this.world.centerX + 60, 500, 'tweetButton', this.tweetScore, this);

    },

    startGame: function () {
        this.state.start('MainMenu');
    },

    tweetScore: function () {
        var tweetbegin = 'http://twitter.com/home?status=';        
        var tweettxt = 'I scored '+score+' in Zombipede! How long can you get? -' + window.location.href + '.';        
        var finaltweet = tweetbegin +encodeURIComponent(tweettxt);        
        window.open(finaltweet,'_blank');    
    }

};




