Zombipede.Game = function (game) {

};

Zombipede.Game.prototype = {
    
    preload : function() {
        this.rows = gameHeight/squareSize;
        this.cols = gameWidth/squareSize;
        this.textStyle_Key = { font: "bold 14px sans-serif", fill: "#46c0f9", align: "center" }; 
        this.textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };
    },

    create : function() {
        Zombipede.snake = new Snake(this, Zombipede.human);
        Zombipede.human = this.generateHuman(this, Zombipede.snake);
        Zombipede.snake.food = Zombipede.human;
        
        Zombipede.score = 0; 
        Zombipede.speed = 0; 
 
        this.stage.backgroundColor = '#061f27';

        this.add.text(30, 20, "SCORE", this.textStyle_Key);
        this.scoreTextValue = this.add.text(90, 18, Zombipede.score.toString(), this.textStyle_Value);

        this.add.text(500, 20, "SPEED", this.textStyle_Key);
        this.speedTextValue = this.add.text(558, 18, Zombipede.speed.toString(), this.textStyle_Value);

    },

    update: function() {
        Zombipede.snake.update();
        this.speedTextValue.text = '' + Zombipede.snake.speed;
    },

    generateHuman: function(_game) {
        let pos = {
            x:squareSize/2,
            y:squareSize/2
        };
        let count = 0;

        do {
            pos.x = Math.floor(Math.random()*(this.cols-1))*squareSize+squareSize/2;
            pos.y = Math.floor(Math.random()*(this.rows-1))*squareSize+squareSize/2;
            count++;
            if (count == 30) {
                break;
            }
        } while (Zombipede.snake.isHere(pos.x, pos.y));

        let apple = new Human(_game, pos.x, pos.y, Zombipede.snake);

        if (pos.x == squareSize/2) {
            apple.angle = 90;
            //apple.shirt.angle = 90;
        } else if (pos.x == gameWidth - squareSize/2) {
            apple.angle = -90;
            //apple.shirt.angle = -90;
        } else if (pos.y == squareSize/2) {
            apple.angle = 180;
            //apple.shirt.angle = 180;
        } else {
            apple.angle = 0;
            //apple.shirt.angle = 0;
        }

        return apple;
    }

};

