var snake, apple, score, speed,
    human;

//TODO: remove these globals !!!
Zombipede.Game = function (game) {
    //this.game = game;
};

Zombipede.Game.prototype = {
    
    preload : function() {
        this.rows = gameHeight/squareSize;
        this.cols = gameWidth/squareSize;
        this.positions = [];

        for (let i=0; i<this.rows; i++) {
            this.positions.push({
                x: squareSize/2,
                y: i*squareSize+squareSize/2
            });
            this.positions.push({
                x: gameWidth - squareSize/2,
                y: i*squareSize+squareSize/2
            });
        }

        for (let i=0; i<this.cols; i++) {
            this.positions.push({
                x: i*squareSize+squareSize/2,
                y: squareSize/2
            });
            this.positions.push({
                x: i*squareSize+squareSize/2,
                y: gameHeight - squareSize/2
            });
        }

        this.textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" }; 
        this.textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
    },

    create : function() {
        snake = new Snake(this, human);
        human = this.generateHuman(this, snake);
        snake.food = human;
        
        score = 0; 
        speed = 0; 
 
        this.stage.backgroundColor = '#061f27';

        this.add.text(30, 20, "SCORE", this.textStyle_Key);
        this.scoreTextValue = this.add.text(90, 18, score.toString(), this.textStyle_Value);

        this.add.text(500, 20, "SPEED", this.textStyle_Key);
        this.speedTextValue = this.add.text(558, 18, speed.toString(), this.textStyle_Value);

    },

    update: function() {
        //human.update();
        snake.update();
        this.speedTextValue.text = '' + snake.speed;
    },

    generateHuman: function(_game, snake) {
        let pos;
        let count = 0; // this is a bit of a hack:
        //if the snake gets long enough to cover the entire circumference of the screen
        //it may block the generation of a new human indefinitely and crash the game here
        // so we give it a timeout and spawn the human in the middle of the screen...
        //TODO: not sure what else to do about it...

        do {
            pos = this.positions[Math.floor(Math.random()*this.positions.length)];
            count++;
            if (count == 10) {
                    do {
                        pos.x = Math.floor(Math.random()*(this.cols-1))*squareSize+squareSize/2;
                        pos.y = Math.floor(Math.random()*(this.rows-1))*squareSize+squareSize/2;
                    } while (snake.isHere(pos.x, pos.y));
                break;
            }
        } while (snake.isHere(pos.x, pos.y));

        

        let apple = new Human(_game, pos.x, pos.y, snake);

        if (pos.x == squareSize/2) {
            apple.angle = 90;
            apple.shirt.angle = 90;
        } else if (pos.x == gameWidth - squareSize/2) {
            apple.angle = -90;
            apple.shirt.angle = -90;
        } else if (pos.y == squareSize/2) {
            apple.angle = 180;
            apple.shirt.angle = 180;
        } else {
            apple.angle = 0;
            apple.shirt.angle = 0;
        }

        return apple;
    }

};

