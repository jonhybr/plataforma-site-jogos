const start = document.getElementById('startGenius');
const buttons = document.querySelectorAll('.rect');
const pontos = document.getElementById('pontos');

import { shuffle } from "./shuffle.js";

var playing = false

class Game {
    constructor() {
        this.colors = ['red', 'green', 'yellow', 'blue']        
        this.pattern = []
        this.pressed = []

        this.play = false

        this.atual = 0
        this.level = 1

        this.timer = 50
        this.time = 50

        this.buttonListener()
        this.addToPattern()
    }

    update() {
        this.drawPattern()
        if (this.timer < 0){
            buttons.forEach((btn) => {
                btn.style.filter = "brightness(100%)"
            })
            if (this.timer == -1){
                this.timer = this.time
            }
            this.timer++
        }
        if (this.timer > 0) {  
            this.timer--
        } 
        if (this.timer == 0) {
            if (this.atual < this.pattern.length) {
                this.timer = -10
                this.atual++
                if (this.atual == this.pattern.length){
                    this.timer = 0
                }
            } else {
                this.play = true

                buttons.forEach((btn) => this.checkHover(btn))

                if (this.pattern[this.pressed.length - 1] == this.pressed[this.pressed.length - 1]) {                    
                    if (this.pattern.length == this.pressed.length){                        
                        pontos.innerText++
                        this.addToPattern()
                        this.pressed = []
                        this.atual = 0
                        this.timer = -50
                    } 
                } else {
                    this.restart()
                }
            }
        }
    }

    restart(){        
        pontos.innerText = 0
        this.pattern = []                    
        this.addToPattern()
        this.pressed = []
        this.atual = 0
        this.timer = this.time
    }

    checkAnswer() {
        buttons.forEach((btn) => {
            if (this.checkHover(btn)) {
                this.pressed.push(btn.classList[0])
            }
        })
    }

    addToPattern() {
        let newColor = shuffle(this.colors)
        this.pattern.push(newColor[0])
    }

    drawPattern() {
        buttons.forEach((btn) => {
            if (btn.classList.contains(this.pattern[this.atual])) {
                btn.style.filter = "brightness(250%)"
            } else {
                btn.style.filter = "brightness(100%)"
            }
        })
    }

    checkHover(btn) {
        if (btn.matches(':hover')) {
            btn.style.filter = "brightness(250%)"
            return true
        }
    }

    buttonListener() {
        addEventListener('mouseup', () => {
            if (this.play) {
                this.checkAnswer()
            }
        })
    }
}

const game = new Game()

start.onclick = () => {
    if (!playing){
        playing = true        
        function run() {
            game.update()
            requestAnimationFrame(run)
        }
        run()
    } else {
        game.restart()
    }
}

function checkCursor(){
    for (const btn of buttons){
        if (btn.matches(':hover') && game.atual == game.pattern.length){
            document.body.style.cursor = "pointer"
            return
        } else {
            document.body.style.cursor = "inherit"
        }
    }
}

setInterval(checkCursor, 100)

