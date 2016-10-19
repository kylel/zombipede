var Snake = function (game, food) {
    this.segments = [];
    this.game = game;
    for(let i = 0; i < 3; i++){
        this.segments[i] = this.game.add.sprite(256-i*64 + 64/2, 256 + 64/2, 'zombie');
        this.segments[i].anchor.setTo(.5); 
        this.segments[i].angle = 90;         
        this.segments[i].frame = 0; 
    }
    
    this.speed = 0;
    this.direction = 'right';
   
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.updateDelay = 0;
    this.oldLastCellx = 0;
    this.oldLastCelly = 0;
    this.oldLastCellAngle = 0;
    this.addNew = false;
    
    this.food = food;
    this.newDirection = null;
};

Snake.prototype = Object.create(Object);
Snake.prototype.constructor = Snake;

Snake.prototype.checkInput = function () {
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

Snake.prototype.isHere = function (x,y) {
    let len = this.segments.length;
    for (let i=0; i<len; i++) {
        if (this.segments[i].x == x && this.segments[i].y == y) {
            return true;
        }
    }
    return false;
};

Snake.prototype.move = function () {
    if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
    }
    
    let len = this.segments.length;
    //save old last cell info
    this.oldLastCellx = this.segments[len-1].x;
    this.oldLastCelly = this.segments[len-1].y;
    this.oldLastCellAngle = this.segments[len-1].angle;
    //move all of the segments other that the head
    for (let i=len-1; i>0; i--) {
        this.segments[i].x = this.segments[i-1].x;
        this.segments[i].y = this.segments[i-1].y;
        this.segments[i].angle = this.segments[i-1].angle;
        this.segments[i].frame+=1; 
        if (this.segments[i].frame == 4) {
            this.segments[i].frame = 0;
        }
    }
    //move the head
    switch (this.direction) {
        case 'right':
            this.segments[0].x += squareSize;
            this.segments[0].angle = 90;
            break;
        case 'left':
            this.segments[0].x -= squareSize;
            this.segments[0].angle = -90;
            break;
        case 'up':
            this.segments[0].y -= squareSize;
            this.segments[0].angle = 0;
            break;
        case 'down':
            this.segments[0].y += squareSize;
            this.segments[0].angle = 180;
            break;
    }
    this.segments[0].frame+=1 ; 
    if (this.segments[0].frame == 4) {
        this.segments[0].frame = 0;
    }
};

Snake.prototype.addSegment = function () {
    let spr = this.game.add.sprite(this.oldLastCellx, this.oldLastCelly, 'zombie');
    spr.anchor.setTo(.5);
    spr.angle = this.oldLastCellAngle;
    spr.frame = 0;
    this.segments.push(spr);
    this.addNew = false;
    this.speed = Math.min(10, Math.floor(score/5));
};

Snake.prototype.update = function () {
    this.checkInput();
    this.updateDelay++;

    if (this.updateDelay == (40 - this.speed)) {
        //TODO: make this generic - its the same for human
        this.move();
        this.appleCollision();
        this.selfCollision(this.segments[0]);
        this.wallCollision(this.segments[0]);
        if(this.addNew){
            this.addSegment();
        }

        this.updateDelay = 0;
    }
};

Snake.prototype.selfCollision = function(head) {
   
    for(let i = 1; i < this.segments.length; i++){
        if(head.x == this.segments[i].x && head.y == this.segments[i].y){
   
            this.game.state.start('GameOver');
        }
    }
};

Snake.prototype.wallCollision = function(head) {
    if(head.x >= gameWidth || head.x < 0 || head.y >= gameHeight || head.y < 0){
        this.game.state.start('GameOver');
    }
};

Snake.prototype.appleCollision = function() {
    if (this.segments[0].x == this.food.x && this.segments[0].y == this.food.y) {
        this.addNew = true;
        this.food.destroy();
        this.food = generateApple(this.game, this);//TODO fix this global var shiz
        human = this.food;
        score++;
        scoreTextValue.text = score.toString();
    }
};