const timer = document.getElementById('timer');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

import { cronometro } from "./cronometro.js";

canvas.width = 800
canvas.height = 400

// CONFIG PILARES
const start = 0
const pilar_width = 50
const pilar_height = 200
const pilars = [{pos: [], circles: [], width: pilar_width, height: pilar_height},
				{pos: [], circles: [], width: pilar_width, height: pilar_height},
				{pos: [], circles: [], width: pilar_width, height: pilar_height}]

for (let x = 0; x < pilars.length; x++){
    pilars[x].pos.push((canvas.width / pilars.length) * (x + 1) - (canvas.width / pilars.length / 2) - (pilar_width / 2), canvas.height - pilar_height)    
}

// CONFIG CIRCULOS
const circles_height = 30
const circles = [{color: 'purple', width: 200, height: circles_height, pos: [], selected: false},
				{color: 'green', width: 180, height: circles_height, pos: [], selected: false},
				{color: 'cyan', width: 160, height: circles_height, pos: [], selected: false},
				{color: 'yellow', width: 140, height: circles_height, pos: [], selected: false},
				{color: 'grey', width: 120, height: circles_height, pos: [], selected: false},
				{color: 'red', width: 100, height: circles_height, pos: [], selected: false}]
 
let y = canvas.height;
for (let x of circles){
    x.pos.push(pilars[start].pos[0] - (x.width / 2) + pilar_width / 2, canvas.height - x.height)
    pilars[start].circles.push(x)
    y -= x.height    
}

addEventListener('click', (evt) => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = evt.clientX - rect.left;
    let mouseY = evt.clientY - rect.top;
    
    let remove = '';
    for (let p of pilars){	
		if (mouseX > p.pos[0] && mouseX < p.pos[0] + p.width && mouseY > p.pos[1] && mouseY < p.pos[1] + p.height){
			for (let x of circles){
				if (x.selected){
					if (p.circles.length > 0){					
						if (x.width < p.circles[p.circles.length - 1].width){
							x.pos = [p.pos[0] + (p.width / 2) - (x.width / 2), 0]
							x.selected = false		    
							remove = [p, x]
							p.circles.push(x)
						}
					} else {
						x.pos = [p.pos[0] + (p.width / 2) - (x.width / 2), 0]
						x.selected = false		    
						remove = [p, x]
						p.circles.push(x)
					}
					
				}
			}
		}
    }
    if (remove){
		for (let p of pilars){
			if (remove[0] != p){
				if (p.circles.includes(remove[1])){
					p.circles.splice(p.circles.indexOf(remove[1]), 1)
					return
				}
			}
		}
    }
    
    for (let x of circles){
	x.selected = false;
		if (mouseX > x.pos[0] && mouseX < x.pos[0] + x.width && mouseY > x.pos[1] && mouseY < x.pos[1] + x.height){
			for (let y of pilars){
				if (x == y.circles[y.circles.length - 1]){
					x.selected = true;		
				}
			}	
		}
    }    
})

let ganhou = false

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let x of pilars){		
		if (x != pilars[start] && x.circles.length == circles.length && !ganhou){
			alert('GANHOU')
			ganhou = true;
		}
		ctx.fillStyle = 'orange';
        ctx.fillRect(x.pos[0], x.pos[1], x.width, x.height)
		let altura = canvas.height - circles_height;
	for (let y of x.circles){
	    y.pos[1] = altura
	    if (y.selected){
			ctx.fillStyle = 'black'
			ctx.fillRect(y.pos[0] - 2, y.pos[1] - 2, y.width + 4, y.height + 4)
		}
		ctx.fillStyle = y.color;
		ctx.fillRect(y.pos[0], y.pos[1], y.width, y.height)
		altura -= y.height
		}
    }
	requestAnimationFrame(draw);
}
draw()

let tempo = 0
setInterval(() => {
	tempo = cronometro(tempo, timer)
}, 1000)