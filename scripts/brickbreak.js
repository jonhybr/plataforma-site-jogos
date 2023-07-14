const canvas = document.getElementById('brickBreakCanvas');
const ctx = canvas.getContext('2d');

const pontos = document.getElementById('pontos');
const nivel = document.getElementById('nivel');
const vidas = document.getElementById('vidas');

canvas.width = 610
canvas.height = 420
canvas.style.border = "2px dotted #1F1F1F;"

class Bricks {
    constructor(game) {
        this.game = game
        this.width = 80
        this.height = 23
        this.bricks = []
        this.colors = ['#50fa25', '#298dff', '#7931ff', '#f831ff', 'red', 'orange', 'yellow']
        this.camadas = this.colors.length
    }
    createBricks(camadas = this.camadas) {
        this.bricks = []
        for (let y = 0; y < camadas; y++) {
            let row = []
            for (let x = 0; x < (this.game.width - 50) / this.width; x++) {
                row.push({ width: this.width, height: this.height, x: x * this.width + 20, y: y * this.height + 20 })
            }
            this.bricks.push(row)
        }
    }
    draw(ctx) {
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
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
        this.speed = { x: 0, y: 0 };
    }
    resetPos() {
        this.speed.y = 0
        this.speed.x = 0
        this.x = (this.game.width / 2) - (this.width / 2) + (Math.floor(Math.random() * 100) + Math.floor(Math.random() * -100));
        this.y = this.game.height - this.game.player.height - 50 + (Math.floor(Math.random() * 10) + Math.floor(Math.random() * -10));
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.roundRect(this.x, this.y, this.width, this.height, [50]);
        ctx.fill();
    }
    update() {
        this.x += this.speed.x;
        this.checkCollisions('x');
        this.y += this.speed.y;
        this.checkCollisions('y');
    }

    checkCollisions(dir) {
        this.checkScreenCollision(dir)
        if (this.y > this.game.height / 2) {
            this.checkPlayerCollision(dir)
        } else {
            this.checkBrickCollision(dir)
        }
    }

    checkPlayerCollision(dir) {
        let player = this.game.player
        if (this.x + this.width >= player.x + player.move && this.x <= player.x + player.width + player.move &&
            this.y + this.height >= player.y && this.y <= player.y + player.height) {
            if (dir == "x") {
                this.speed[dir] *= -1
                this[dir] += this.speed[dir]
            } else {
                this.speed.y *= -1
                this.speed.x = ((player.x + player.move + (player.width / 2)) - (this.x + (this.width / 2))) / 6
            }

        }
    }

    checkScreenCollision(dir) {
        if (dir == "x") {
            if (this.x < 0) {
                this.speed.x *= -1
                this.x = 0
                return
            }
            else if (this.x + this.width > this.game.width) {
                this.speed.x *= -1
                this.x = this.game.width - this.width
                return
            }
        }
        else if (dir == "y") {
            if (this.y < 0) {
                this.speed.y *= -1
                this.y = 0
                return
            }
            else if (this.y + this.height > this.game.height) {
                this.game.player.lives -= 1
                vidas.children[vidas.children.length - 1].remove()
                if (this.game.player.lives > 0) {
                    this.resetPos()
                }
                return
            }
        }
    }

    checkBrickCollision(dir) {
        this.game.bricks.bricks.forEach((row, indexY) => {
            row.forEach((brick, indexX) => {
                if (this.x + this.width >= brick.x && this.x <= brick.x + brick.width &&
                    this.y + this.height >= brick.y && this.y <= brick.y + brick.height) {
                    this.game.bricks.bricks[indexY].splice(indexX, 1)
                    this.speed[dir] *= -1
                    this[dir] += this.speed[dir]
                    pontos.innerText = String(pontos.innerText.slice(0, 8 - (parseInt(pontos.innerText) + (10 * parseInt(nivel.innerText))).toString().length)) + (parseInt(pontos.innerText) + (10 * parseInt(nivel.innerText)))
                    return
                }
            })
        })
    }
}

class Player {
    constructor(game) {
        this.game = game
        this.width = 100
        this.height = 20
        this.lives = 3
        this.x = (this.game.width / 2) - (this.width / 2);
        this.y = this.game.height - this.height - 20
        this.color = '#d8e0e7'

        this.speed = 5
        this.move = 0
        this.key = ''

        this.controls = {
            'ArrowRight': this.moveRight,
            'ArrowLeft': this.moveLeft,
            'ArrowUp': this.startBallMove
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    update() {
        this.move = 0
        if (this.key in this.controls) {
            this.controls[this.key].call(this)
            if (this.checkScreenCollision()) {
                this.move = 0
            }
        }
        this.x += this.move
    }

    checkScreenCollision() {
        if (this.x + this.move + this.width >= this.game.width) {
            return true
        } else if (this.x + this.move <= 0) {
            return true
        }
        return false
    }

    moveLeft() {
        this.move = -this.speed
    }

    moveRight() {
        this.move = this.speed
    }
    startBallMove() {
        if (this.game.ball.speed.x == 0 && this.game.ball.speed.y == 0 && this.lives > 0) {
            this.game.ball.speed.y = -4
            this.game.ball.speed.x = 4
        }
    }
}

class Game {
    constructor() {
        this.width = canvas.width
        this.height = canvas.height

        this.player = new Player(this)
        this.ball = new Ball(this)
        this.bricks = new Bricks(this)

        this.bricks.createBricks(3)

        addEventListener('keydown', (evt) => {
            if (evt.key in this.player.controls) {
                this.player.key = evt.key
            }
        })
        addEventListener('keyup', (evt) => {
            if (this.player.key == evt.key) {
                this.player.key = ''
            }
        })
    }
    draw(ctx) {
        ctx.fillStyle = '#122231'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        this.player.draw(ctx)
        this.ball.draw(ctx)
        this.bricks.draw(ctx)
    }
    update() {
        this.player.update()
        this.ball.update()
        this.checkWin()
    }

    checkWin() {
        let ganhou = true
        this.bricks.bricks.forEach((arr) => {            
            if (arr.length != 0) {
                ganhou = false
                return
            }
        })
        if (ganhou) {            
            this.ball.resetPos()
            if (3 + parseInt(nivel.innerText) > this.bricks.colors.length - 1){
                this.bricks.createBricks(this.camadas)
            } else {
                this.bricks.createBricks(3 + parseInt(nivel.innerText))
            }
            nivel.innerText++
        }
    }
}


const game = new Game()

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.draw(ctx)
    game.update()
    requestAnimationFrame(run)
}
run()
