const start = document.getElementById('startGenius');

const colors = document.querySelectorAll('.rect')

var pattern = ['red', 'green', 'yellow', 'blue']
var pressed = ""

start.onclick = () => {
    addEventListener('mouseup', () => {
        colors.forEach((color) => {
            if (color.matches(':hover')){
                if (color.classList.contains('red')){
                    pressed = 'red'
                }
                else if (color.classList.contains('green')){
                    pressed = 'green'
                }
                else if (color.classList.contains('blue')){
                    pressed = 'blue'
                }
                else if (color.classList.contains('yellow')){
                    pressed = 'yellow'
                }
            }
        })
    })
    game()
}


function game(){
    colors.forEach((btn) => {
        pattern.forEach((color) => {
            if (btn.classList.contains(color)){
                btn.style.webkitFilter = "brightness(250%)";
            }
        })
    })
    requestAnimationFrame(game);
}