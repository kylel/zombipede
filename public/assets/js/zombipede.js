var Snake = function (game, food) {
    this.segments = [];
    this.game = game;
    for(let i = 0; i < 3; i++){
        this.segments[i] = this.game.add.sprite(256-i*64 + 64/2, 256 + 64/2, 'zombie');
        this.segments[i].anchor.setTo(.5); 
        this.segments[i].angle = 90;         
        this.segments[i].frame = 0; 
        this.segments[i]._startFrame_ = 0; 
        this.segments[i]._endFrame_ = 2; 
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
    this.addFrame = 0;
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
        let target = this.segments[i-1];
        let seg = this.segments[i];
        seg.x = target.x;
        seg.y = target.y;
        seg.angle = target.angle;
        //if (i==3) {console.log(seg.frame);}
        seg.frame++; 
        //if (i==3) {console.log('now' + seg.frame);}
        if (seg.frame == seg._endFrame_ || seg.frame == 0) {
            seg.frame = seg._startFrame_;
            //if (i==3) {console.log('->' + seg.frame);}
        }
    }
    //move the head
    let head = this.segments[0];
    switch (this.direction) {
        case 'right':
            head.x += squareSize;
            head.angle = 90;
            break;
        case 'left':
            head.x -= squareSize;
            head.angle = -90;
            break;
        case 'up':
            head.y -= squareSize;
            head.angle = 0;
            break;
        case 'down':
            head.y += squareSize;
            head.angle = 180;
            break;
    }
    head.frame++; 
    if (head.frame == head._endFrame_) {//TODO?
        head.frame = head._startFrame_;
    }
};

Snake.prototype.getSegment = function (segmentNum) {
    return this.segments[segmentNum];
};

Snake.prototype.getLength = function () {
    return this.segments.length;
};

Snake.prototype.addSegment = function (frame) {
    let spr = this.game.add.sprite(this.oldLastCellx, this.oldLastCelly, 'zombie');
    spr.anchor.setTo(.5);
    spr.angle = this.oldLastCellAngle;
    spr.frame = 2*this.addFrame;
    spr._startFrame_ = spr.frame;
    spr._endFrame_ = spr.frame + 2;
    this.segments.push(spr);
    this.addNew = false;
    this.speed = Math.min(40, Math.floor(score/2));
};

Snake.prototype.update = function () {
    this.checkInput();
    this.updateDelay++;

    if (this.updateDelay == (30 - this.speed)) {
        //TODO: make this generic - its the same for human
        this.move();
        this.appleCollision();
        this.selfCollision(this.segments[0]);
        this.wallCollision(this.segments[0]);
        if(this.addNew){
            this.addSegment(this.addFrame);
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
        //tweetscore();
        this.game.state.start('GameOver');
    }
};

Snake.prototype.appleCollision = function() {
    if (this.segments[0].x == this.food.x && this.segments[0].y == this.food.y) {
        this.addNew = true;
        this.addFrame = this.food.shirt.frame;
        this.food.shirt.destroy();
        this.food.destroy();
        this.food = this.game.generateHuman(this.game, this);//TODO fix this global var shiz
        human = this.food;
        score++;
        scoreTextValue.text = score.toString();
    }
};