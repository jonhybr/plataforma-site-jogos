const canvas = document.getElementById('brickBreakCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = 400
canvas.style.border = "2px dotted #1F1F1F;"

class Bricks {
    constructor(game) {
        this.game = game
        this.width = 80
        this.height = 20
        this.bricks = []
        this.colors = ['#50fa25', '#298dff', '#7931ff', '#f831ff', 'red', 'orange', 'yellow']

        this.createBricks()

    }
    createBricks(){
        for (let y = 0; y < (this.game.height / 3) / this.height; y++){
            let row = []
            for (let x = 0; x < (this.game.width - 50) / this.width; x++){
                row.push({width: this.width, height: this.height, x: x * this.width + 20, y: y * this.height + 20})
            }
            this.bricks.push(row)
        }        
    }
    draw(ctx){
        this.bricks.forEach((row, index) => {
            row.forEach((brick) => {
                ctx.beginPath()
                ctx.fillStyle = this.colors[index]          
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
                ctx.beginPath()
                ctx.fillStyle = 'black'
                ctx.rect(brick.x, brick.y, brick.width, brick.height)
                ctx.lineWidth = 2
                ctx.stroke()            
            })            
        })
    }
}


class Ball {
    constructor(game){
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.moving = false;
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
        this.speed = {x: 0, y: 0};
    }
    resetPos(){
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.roundRect(this.x, this.y, this.width, this.height, [50]);
        ctx.fill();       
    }
    update(){
        this.x += this.speed.x;
        this.checkBrickCollision('x');
        this.checkPlayerCollision('x');
        this.y += this.speed.y;
        this.checkBrickCollision('y');
        this.checkPlayerCollision('y');

        this.checkScreenCollision();
    }

    checkPlayerCollision(dir){
        if (this.x + this.width >= this.game.player.x && this.x <= this.game.player.x + this.game.player.width &&
            this.y + this.height >= this.game.player.y && this.y <= this.game.player.y + this.game.player.height){
            this.speed[dir] *= -1
            this[dir] += this.speed[dir]
            return
        }
    }

    checkScreenCollision(){
        if (this.y < 0){
            this.speed.y *= -1
        }
        else if (this.y + this.height > this.game.height){
            this.speed.y = 0
            this.speed.x = 0            
            this.moving = false
            this.game.player.lives -= 1
            console.log(this.game.player.lives)
            if (this.game.player.lives > 0){
                this.resetPos()
            }            
        }
        else if (this.x < 0){
            this.speed.x *= -1
        }
        else if (this.x + this.width > this.game.width){
            this.speed.x *= -1
        }
    }

    checkBrickCollision(dir){
        this.game.bricks.bricks.forEach((row, indexY) => {
            row.forEach((brick, indexX) => {
                if (this.x + this.width >= brick.x && this.x <= brick.x + brick.width &&
                    this.y + this.height >= brick.y && this.y <= brick.y + brick.height){
                    delete this.game.bricks.bricks[indexY][indexX]
                    this.speed[dir] *= -1
                    this[dir] += this.speed[dir]
                    return
                }
            })
        })
    }
}

class Player{
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 20
        this.lives = 3
        this.x = (this.game.width / 2) - (this.width / 2);
        this.y = this.game.height - this.height - 20
        this.color = '#d8e0e7'

        this.speed = 5
        this.key = ''

        this.controls = {
            'ArrowRight': this.moveRight,
            'ArrowLeft': this.moveLeft,
            'ArrowUp': this.startBallMove
        }
    }

    draw(ctx){
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)        
    }
    update(){
        if (this.key in this.controls){
            this.controls[this.key].call(this, this.speed)
            if (this.checkScreenCollision()){
                this.controls[this.key].call(this, this.speed * -1)
            }
        }
        this.checkWin()
    }

    checkWin(){
        if (this.game.bricks.bricks.length == 0){

            this.game.bricks = new Bricks(this.game)
            this.game.ball = new Ball(this.game)
        }
    }

    checkScreenCollision(){
        if (this.x + this.width >= this.game.width){
            return true
        } else if (this.x <= 0){
            return true
        }
        return false
    }

    moveLeft(speed){
        this.x -= speed
    }

    moveRight(speed){
        this.x += speed
    }
    startBallMove(){
        if (!this.game.ball.moving && this.lives > 0){
            this.game.ball.speed.y = -4
            this.game.ball.speed.x = 4
        }
    }
}

class Game{
    constructor(){
        this.width = canvas.width
        this.height = canvas.height

        this.player = new Player(this)
        this.ball = new Ball(this)
        this.bricks = new Bricks(this)

        addEventListener('keydown', (evt) => {
            if (evt.key in this.player.controls){
                this.player.key = evt.key
            }            
        })
        addEventListener('keyup', (evt) => {
            if (this.player.key == evt.key){
                this.player.key = ''
            }
        })
    }
    draw(ctx){
        ctx.fillStyle = '#122231'        
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.player.draw(ctx)
        this.ball.draw(ctx)
        this.bricks.draw(ctx)
    }
    update(){
        this.player.update()
        this.ball.update()
    }
}


const game = new Game()

function run(){
    ctx.clearRect(0, 0, canvas.width ,canvas.height)    
    game.draw(ctx)
    game.update()
    requestAnimationFrame(run)
}
run()
