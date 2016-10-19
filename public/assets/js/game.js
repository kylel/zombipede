var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value, human;

var lastCell, oldLastCellx, oldLastCelly;


//TODO: remove these globals !!!


function generateApple(_game, snake){
        //TODO: make sure apple doesnt appear on the snake or too near it
        let rows = gameHeight/squareSize;
        let cols = gameWidth/squareSize;
        let positions = [];

        for (let i=0; i<rows; i++) {
            positions.push({
                x: squareSize/2,
                y: i*squareSize+squareSize/2
            });
        }

        for (let i=0; i<rows; i++) {
            positions.push({
                x: gameWidth - squareSize/2,
                y: i*squareSize+squareSize/2
            });
        }

        for (let i=0; i<cols; i++) {
            positions.push({
                x: i*squareSize+squareSize/2,
                y: squareSize/2
            });
        }

        for (let i=0; i<cols; i++) {
            positions.push({
                x: i*squareSize+squareSize/2,
                y: gameHeight - squareSize/2
            });
        }

        let pos;

        do {
            pos = positions[Math.floor(Math.random()*positions.length)];
        } while (snake.isHere(pos.x, pos.y));

        

        let apple = new Human(_game, pos.x, pos.y, snake);

        if (pos.x == squareSize/2) {
            apple.angle = 90;
        } else if (pos.x == gameWidth - squareSize/2) {
            apple.angle = -90;
        } else if (pos.y == squareSize/2) {
            apple.angle = 180;
        } else {
            apple.angle = 0;
        }

        return apple;
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

