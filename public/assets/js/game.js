var snake, apple, squareSize, score, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, 
    textStyle_Key, textStyle_Value;
var lastCell, oldLastCellx, oldLastCelly;
var squareSize = 15;
//TODO: remove these globals !!!


function generateApple(_game){
        //TODO: make sure apple doesnt appear on the snake or too near it

        var randomX = Math.floor(Math.random() * 40 ) * squareSize + squareSize/2,
            randomY = Math.floor(Math.random() * 30 ) * squareSize + squareSize/2;

        return new Human(_game, randomX, randomY);

}

Zombipede.Game = function (game) {
    //this.game = game;
};

Zombipede.Game.prototype = {
    
    preload : function() {
        //game.load.image('snake', './assets/images/snake02.png');
        //game.load.image('apple', './assets/images/apple.png');
        //console.log(this);
    },

    create : function() {

        apple = generateApple(this);
        snake = new Snake(this, apple);
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
        snake.update();
    }

};

var Human = function (_game, x,y) {
    Phaser.Sprite.call(this, _game, x, y, 'human');
    this.anchor.setTo(0.5);
    _game.add.existing(this);
};

Human.prototype = Object.create(Phaser.Sprite.prototype);
Human.prototype.constructor = Human;

Human.update = function () {

};

var Snake = function (game, food) {
    this.segments = [];
    this.game = game;
    for(var i = 0; i < 10; i++){
        this.segments[i] = this.game.add.sprite(150+i*squareSize + squareSize/2, 150 + squareSize/2, 'zombie');  // Parameters are (X coordinate, Y coordinate, image)
        this.segments[i].anchor.setTo(.5); 
        this.segments[i].angle = 90;         
    }
    
    this.speed = 0;
    this.direction = 'right';
    this.lastSegment = {};
    this.firstSegment = {};
    
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //this.score = 0;
    this.updateDelay = 0;
    this.oldLastCellx = 0;
    this.oldLastCelly = 0;
    this.addNew = false;
    
    this.food = food;

    
};

Snake.prototype = Object.create(Object);
Snake.prototype.constructor = Snake;

Snake.prototype.update = function () {
    let newDirection = null;

    if (this.cursors.right.isDown && this.direction!='left')
    {
        this.newDirection = 'right';
    }
    else if (this.cursors.left.isDown && this.direction!='right')
    {
        this.newDirection = 'left';
    }
    else if (this.cursors.up.isDown && this.direction!='down')
    {
        this.newDirection = 'up';
    }
    else if (this.cursors.down.isDown && this.direction!='up')
    {
        this.newDirection = 'down';
    }


    this.speed = Math.min(10, Math.floor(score/5));

    speedTextValue.text = '' + this.speed;


    this.updateDelay++;


    this.firstCell = this.segments[this.segments.length - 1];
    if (this.updateDelay % (10 - this.speed) == 0) {



            this.firstCell = this.segments[this.segments.length - 1];
            this.lastCell = this.segments.shift();
            this.oldLastCellx = this.lastCell.x;
            this.oldLastCelly = this.lastCell.y;

        if(this.newDirection){
            this.direction = this.newDirection;
            this.newDirection = null;
        }



        if(this.direction == 'right'){

            this.lastCell.x = this.firstCell.x + squareSize;
            this.lastCell.y = this.firstCell.y;
            this.lastCell.angle = 90;
        }
        else if(this.direction == 'left'){
            this.lastCell.x = this.firstCell.x - squareSize;
            this.lastCell.y = this.firstCell.y;
            this.lastCell.angle = -90;
        }
        else if(this.direction == 'up'){
            this.lastCell.x = this.firstCell.x;
            this.lastCell.y = this.firstCell.y - squareSize;
            this.lastCell.angle = 0;
        }
        else if(this.direction == 'down'){
            this.lastCell.x = this.firstCell.x;
            this.lastCell.y = this.firstCell.y + squareSize;
            this.lastCell.angle = 180;
        }


        this.segments.push(this.lastCell);
        this.firstCell = this.lastCell;

    }

        if(this.addNew){
            let spr = this.game.add.sprite(this.oldLastCellx, this.oldLastCelly, 'snake');
            spr.anchor.setTo(.5);
            this.segments.unshift(spr);
            this.addNew = false;
        }

        this.appleCollision();

        this.selfCollision(this.firstCell);

        this.wallCollision(this.firstCell);
        
};

Snake.prototype.selfCollision = function(head) {
   
    for(let i = 0; i < this.segments.length - 1; i++){
        if(head.x == this.segments[i].x && head.y == this.segments[i].y){
   
            this.game.state.start('GameOver');
        }
    }
};

Snake.prototype.wallCollision = function(head) {
    if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){
   
        this.game.state.start('GameOver');
    }
};

Snake.prototype.appleCollision = function() {
   
    for(let i = 0; i < this.segments.length; i++){
        if(this.segments[i].x == this.food.x && this.segments[i].y == this.food.y){
   
            addNew = true;
   
            this.food.destroy();
   
            this.food = generateApple(this.game);
            apple = this.food;
   
            score++;
   
            scoreTextValue.text = score.toString();
        }
    }
};