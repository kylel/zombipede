Zombipede.GameOver = function (game) {
};

Zombipede.GameOver.prototype = {

    preload : function() {
    },

    create : function() {

        this.add.button(0, 0, 'gameOverScreen', this.startGame, this);

        this.add.text(235, 350, "LAST SCORE: " + Zombipede.score.toString(), 
            { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        //this.add.text(350, 348, Zombipede.score.toString(), 
        //    { font: "bold 20px sans-serif", fill: "#fff", align: "center" });

        

        this.add.button(this.world.centerX + 60, 500, 'tweetButton', this.tweetScore, this);

        let highScore = Zombipede.saveHighScore(Zombipede.score);

        this.add.text(235, 370, "HIGH SCORE: " + highScore.toString(), 
            { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});
        //this.add.text(350, 368, highScore, 
        //    { font: "bold 20px sans-serif", fill: "#fff", align: "center" });
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

