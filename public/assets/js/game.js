var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value, human;

var lastCell, oldLastCellx, oldLastCelly;
var squareSize = 64;
//TODO: remove these globals !!!


function generateApple(_game, snake){
        //TODO: make sure apple doesnt appear on the snake or too near it

        var randomX = Math.floor(Math.random() * 1024/squareSize ) * squareSize + squareSize/2,
            randomY = Math.floor(Math.random() * 640/squareSize ) * squareSize + squareSize/2;

        return new Human(_game, randomX, randomY, snake);

}

Zombipede.Game = function (game) {
    //this.game = game;
};

Zombipede.Game.prototype = {
    
    preload : function() {
        //preload
    },

    create : function() {
        //this.humans = this.add.group();

        snake = new Snake(this, human);
        human = generateApple(this, snake);
        snake.food = human;
        
        score = 0; 
        speed = 0; 
 
        this.stage.backgroundColor = '#061f27';

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };


        this.add.text(30, 20, "SCORE", textStyle_Key);
        scoreTextValue = this.add.text(90, 18, score.toString(), textStyle_Value);

        this.add.text(500, 20, "SPEED", textStyle_Key);
        speedTextValue = this.add.text(558, 18, speed.toString(), textStyle_Value);

    },

    update: function() {
        //human.update();
        snake.update();
        speedTextValue.text = '' + snake.speed;
    }

};

