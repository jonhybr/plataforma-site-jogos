const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");

canvas.style.backgroundColor = "#1f1f1f"

canvas.width = 704;
canvas.height = 416;

class InputHandler {
    constructor() {
        this.key = ""

        addEventListener("keydown", (e) => {
            this.key = e.key
        })
    }
}

class Snake {
    constructor(game) {
        this.game = game;
        this.input = new InputHandler();
        this.direction = ""
        this.moveCooldown = 8;
        this.counter = this.moveCooldown;
        this.size = this.game.tileSize
        this.alive = true
        this.body = {
            head: {
                x: this.size * 3,
                y: this.size
            },
            body: [{ x: this.size * 2, y: this.size }, { x: this.size, y: this.size }],
            size: this.game.tileSize
        }

        this.controls = {
            "w": this.move_up,
            "a": this.move_left,
            "s": this.move_down,
            "d": this.move_right,
            "arrowright": this.move_right,
            "arrowleft": this.move_left,
            "arrowdown": this.move_down,
            "arrowup": this.move_up,
        }
    }

    move_up() {
        this.body.head.y -= this.size
    }
    move_left() {
        this.body.head.x -= this.size
    }
    move_down() {
        this.body.head.y += this.size
    }
    move_right() {
        this.body.head.x += this.size
    }

    checkEat() {
        let posSnake = this.body.head
        let posApple = this.game.apple.config

        if (posSnake.x + this.size > posApple.x && posSnake.x < posApple.x + posApple.size &&
            posSnake.y + this.size > posApple.y && posSnake.y < posApple.y + posApple.size) {
            this.body.body.push({ x: -this.size, y: -this.size })
            this.game.apple.generateApple()
        }
    }

    checkBodyCollision() {
        this.body.body.forEach((b) => {
            if (b.x == this.body.head.x && b.y == this.body.head.y) {
                this.alive = false
            }
        })
    }

    checkScreenCollision() {
        if (this.body.head.x + this.game.tileSize > this.game.width ||
            this.body.head.x < 0 ||
            this.body.head.y + this.game.tileSize > this.game.height ||
            this.body.head.y < 0) {

            this.alive = false
        }
    }

    draw(ctx) {
        ctx.fillStyle = "green"
        Object.entries(this.body).forEach((b) => {
            if (b[0] == "head") {
                ctx.fillStyle = "green"
                ctx.fillRect(b[1].x, b[1].y, this.size, this.size)
            }
            if (b[0] == "body") {
                ctx.fillStyle = "green"
                b[1].forEach((c) => {
                    ctx.fillRect(c.x, c.y, this.size, this.size)
                })
            }
        })
    }

    update() {

        this.input.key = this.input.key.toLowerCase()
        if (this.input.key in this.controls && this.counter >= this.moveCooldown) {
            let change = true;
            if (this.controls[this.input.key] == this.move_up && this.controls[this.direction] == this.move_down ||
                this.controls[this.input.key] == this.move_down && this.controls[this.direction] == this.move_up) {
                    change = false
            }
            if (this.controls[this.input.key] == this.move_right && this.controls[this.direction] == this.move_left ||
                this.controls[this.input.key] == this.move_left && this.controls[this.direction] == this.move_right) {
                    change = false
            }
            if (change) {
                this.direction = this.input.key.toLowerCase()
            }
        }

        if (this.counter >= this.moveCooldown && this.direction && this.alive) {
            this.bodyUpdate()
            this.controls[this.direction].call(this)
            this.counter = 0
        } else {
            this.counter++
        }
        
        this.checkEat()
        this.checkScreenCollision()
        this.checkBodyCollision()
    }

    bodyUpdate() {
        let atualPos = [this.body.head.x, this.body.head.y]
        this.body.body.forEach((b) => {
            let newPos = [b.x, b.y]
            b.x = atualPos[0]
            b.y = atualPos[1]
            atualPos = newPos
        })
    }
}

class Apple {
    constructor(game) {
        this.game = game
        this.size = this.game.tileSize - (this.game.tileSize / 2)
        this.config = {
            size: this.game.tileSize - (this.game.tileSize / 2),
            x: (this.game.tileSize / 2 - this.size / 2) + (this.game.tileSize * 8),
            y: (this.game.tileSize / 2 - this.size / 2) + this.game.tileSize
        }
    }

    generateApple() {
        const maxSizeX = this.game.width / this.game.tileSize
        const maxSizeY = this.game.height / this.game.tileSize

        let newPosX = Math.floor(Math.random() * maxSizeX)
        let newPosY = Math.floor(Math.random() * maxSizeY)

        this.game.snake.body.body.forEach((obj) => {
            if (obj.x == newPosX * 32 && obj.y == newPosY * 32) {
                while (obj.x == newPosX * 32 && obj.y == newPosY * 32) {
                    newPosX = Math.floor(Math.random() * maxSizeX)
                    newPosY = Math.floor(Math.random() * maxSizeY)
                }
            }
        })

        this.config.x = (this.game.tileSize / 2 - this.size / 2) + (this.game.tileSize * newPosX)
        this.config.y = (this.game.tileSize / 2 - this.size / 2) + (this.game.tileSize * newPosY)

    }

    draw(ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(this.config.x, this.config.y, this.size, this.size)
    }
}

class Game {
    constructor() {
        this.width = canvas.width;
        this.height = canvas.height;
        this.tileSize = 32;
        this.snake = new Snake(this);
        this.apple = new Apple(this);
    }
    draw(ctx) {
        this.snake.draw(ctx)
        this.apple.draw(ctx)
    }
    update() {
        this.snake.update()
    }
}

const game = new Game();

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    game.draw(ctx)
    requestAnimationFrame(run)
}

run()