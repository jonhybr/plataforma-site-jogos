const canvas = document.getElementById('brickBreakCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600
canvas.height = 400

class Bricks {
    constructor(game) {
        this.game = game
        this.width = 80
        this.height = 20
        this.bricks = []

        this.createBricks()

    }
    createBricks(){
        for (let y = 0; y < (this.game.height / 2) / this.height; y++){
            for (let x = 0; x < (this.game.width - 50) / this.width; x++){
                this.bricks.push({width: this.width, height: this.height, x: x * this.width + 20, y: y * this.height + 20})
            }
        }        
    }
    draw(ctx){
        this.bricks.forEach((brick, index) => {
            ctx.beginPath()
            ctx.fillStyle = 'red'           
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
            ctx.beginPath()
            ctx.fillStyle = 'black'
            ctx.rect(brick.x, brick.y, brick.width, brick.height)
            ctx.lineWidth = 2
            ctx.stroke()            
        })
    }
}


class Ball {
    constructor(game){
        this.game = game
        this.width = 20
        this.height = 20
        this.x = (this.game.width / 2) - (this.width / 2)
        this.y = this.game.height - this.game.player.height - 50
    }
    draw(ctx){
        ctx.beginPath()
        ctx.fillStyle = '#1f1f1f'
        ctx.roundRect(this.x, this.y, this.width, this.height, [50])
        ctx.fill()
    }
    update(){

    }
}

class Player{
    constructor(game){
        this.game = game
        this.width = 100
        this.height = 20        
        this.x = (this.game.width / 2) - (this.width / 2);
        this.y = this.game.height - this.height - 20
        this.color = '#1f1f1f'

        this.speed = 5
        this.key = ''

        this.controls = {
            'ArrowRight': this.moveRight,
            'ArrowLeft': this.moveLeft
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
        ctx.fillStyle = '#315779'        
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
