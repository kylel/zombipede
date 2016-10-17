var Snake = function (game, food) {
    this.segments = [];
    this.game = game;
    for(var i = 0; i < 3; i++){
        this.segments[i] = this.game.add.sprite(256+i*64 + 64/2, 256 + 64/2, 'zombie');
        this.segments[i].anchor.setTo(.5); 
        this.segments[i].angle = 90;         
    }
    this.firstCell = this.segments[this.segments.length - 1];    
    this.lastCell = this.segments[0];
    this.speed = 0;
    this.direction = 'right';
   
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.updateDelay = 0;
    this.oldLastCellx = 0;
    this.oldLastCelly = 0;
    this.addNew = false;
    
    this.food = food;
    this.newDirection = null;
};

Snake.prototype = Object.create(Object);
Snake.prototype.constructor = Snake;

Snake.prototype.checkInput = function () {
    //this.newDirection = null;

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
};

Snake.prototype.move = function () {
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

    for(let i = 0; i < this.segments.length; i++){
        this.segments[i].scale.x *= -1;
    }

    this.segments.push(this.lastCell);
    this.firstCell = this.lastCell;
};

Snake.prototype.addSegment = function () {
    let spr = this.game.add.sprite(this.oldLastCellx, this.oldLastCelly, 'zombie');
    spr.anchor.setTo(.5);
    this.segments.unshift(spr);
    this.addNew = false;
    this.speed = Math.min(10, Math.floor(score/5));
};

Snake.prototype.update = function () {
    this.checkInput();
    this.updateDelay++;

    if (this.updateDelay % (20 - this.speed) == 0) {//TODO: make this generic - its the same for human
        this.move();
        this.updateDelay = 0;
    }

    if(this.addNew){
        this.addSegment();
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
    if(head.x >= 1024 || head.x < 0 || head.y >= 640 || head.y < 0){
   
        this.game.state.start('GameOver');
    }
};

Snake.prototype.appleCollision = function() {
   
    for(let i = 0; i < this.segments.length; i++){
        if(this.segments[i].x == this.food.x && this.segments[i].y == this.food.y){
   
            this.addNew = true;
   
            this.food.destroy();
   
            this.food = generateApple(this.game);
            human = this.food;
   
            score++;
   
            scoreTextValue.text = score.toString();
        }
    }
};