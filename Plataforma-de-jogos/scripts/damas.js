const gridDamas = document.getElementById('damas')

const gridRows = getComputedStyle(gridDamas).getPropertyValue("grid-template-rows").split(" ").length
const gridColumns = getComputedStyle(gridDamas).getPropertyValue("grid-template-columns").split(" ").length

const playerPretas = document.getElementById('playerPretas')
const playerBrancas = document.getElementById('playerBrancas')

const gridArray = new Array()

let atualPlayer = 'brancas'

let c = 0
for (let y = 0; y < gridColumns; y++) {
    const row = new Array()
    for (let x = 0; x < gridRows; x++) {
        const div = document.createElement('div')
        row.push(div)
        if ((x + y) % 2 == 0) {
            div.classList.add('white')
        } else {
            div.classList.add('black')
            if (y < 3) {
                const peca = document.createElement('div')
                peca.classList.add('damaPreta')
                peca.classList.add('dama')
                div.appendChild(peca)
            }
            if (y > gridColumns - 4) {
                const peca = document.createElement('div')
                peca.classList.add('damaBranca')
                peca.classList.add('dama')
                div.appendChild(peca)
            }
        }
        gridDamas.appendChild(div)
    }
    gridArray.push(row)
}

const pecasPretas = document.getElementsByClassName('damaPreta');
const pecasBrancas = document.getElementsByClassName('damaBranca');

addEventListener('mousemove', () => {
    if (atualPlayer == 'brancas'){
        playerBrancas.style.outline = "8px solid yellow"
        playerPretas.style.outline = "none"
    } else {
        playerPretas.style.outline = "8px solid yellow"
        playerBrancas.style.outline = "none"
    }    
    
    document.body.style.cursor = "default"
    for (const p of pecasPretas) {
        if (p.matches(':hover')) {
            document.body.style.cursor = "pointer"
        }
    }
    for (const b of pecasBrancas) {
        if (b.matches(':hover')) {
            document.body.style.cursor = "pointer"
        }
    }
})

let selection = {
    selected: "" /*DIV*/,
    enemy: [[], []] /*DIVS - [ene], [pos]*/,
    options: [] /*DIVS*/,
    color: "" /*RGB*/
}

function changeColor(div){
    selection.color = getComputedStyle(div).getPropertyValue('background-color')
    selection.options.push(div)
    div.style.backgroundColor = "blue"  
}

function addEnemy(enemy, nextStep){
    selection.enemy[0].push(enemy)
    selection.enemy[1].push(nextStep)
}

function drawWalkTo(tipo, indexY, indexX, topLeft=false, topRight=false, bottomLeft=false, bottomRight=false){
    selection.selected = gridArray[indexY][indexX]    
    if (topLeft){
        if (gridArray[indexY - 1][indexX - 1]){
            let testWalk = gridArray[indexY - 1][indexX - 1]
            if (!testWalk.querySelector('.dama')){
                changeColor(testWalk)
            } else if (gridArray[indexY - 2][indexX - 2]){
                if (!gridArray[indexY - 2][indexX - 2].querySelector('.dama') && !gridArray[indexY - 1][indexX - 1].querySelector(tipo)) {
                    let nextStep = gridArray[indexY - 2][indexX - 2]
                    addEnemy(testWalk, nextStep)
                    changeColor(nextStep)
                }
            }            
        }
    }
    if (topRight){
        if (gridArray[indexY - 1][indexX + 1]){
            let testWalk = gridArray[indexY - 1][indexX + 1]
            if (!testWalk.querySelector('.dama')){
                changeColor(testWalk)
            } else if (gridArray[indexY - 2][indexX + 2]) {
                if (!gridArray[indexY - 2][indexX + 2].querySelector('.dama') && !gridArray[indexY - 1][indexX + 1].querySelector(tipo)) {
                    let nextStep = gridArray[indexY - 2][indexX + 2]
                    addEnemy(testWalk, nextStep)
                    changeColor(nextStep)
                }
            }
            
        }
    }
    if (bottomLeft){
        if (gridArray[indexY + 1][indexX - 1]){
            let testWalk = gridArray[indexY + 1][indexX - 1]
            if (!testWalk.querySelector('.dama')){
                changeColor(testWalk)
            } else if (gridArray[indexY + 2][indexX - 2]) {
                if (!gridArray[indexY + 2][indexX - 2].querySelector('.dama') && !gridArray[indexY + 1][indexX - 1].querySelector(tipo)) {
                    let nextStep = gridArray[indexY + 2][indexX - 2]
                    addEnemy(testWalk, nextStep)
                    changeColor(nextStep)
                }
            }
        }
    }
    if (bottomRight){
        if (gridArray[indexY + 1][indexX + 1]){
            let testWalk = gridArray[indexY + 1][indexX + 1]
            if (!testWalk.querySelector('.dama')){
                changeColor(testWalk)
            } else if (gridArray[indexY + 2][indexX + 2]){
                if (!gridArray[indexY + 2][indexX + 2].querySelector('.dama') && !gridArray[indexY + 1][indexX + 1].querySelector(tipo)) {
                    let nextStep = gridArray[indexY + 2][indexX + 2]
                    addEnemy(testWalk, nextStep)
                    changeColor(nextStep)
                }
            }
        }
    }
}

addEventListener('mouseup', () => {
    gridArray.forEach((y, indexY) => {
        y.forEach((x, indexX) => {
            if (x.matches(':hover')) {
                if (x.querySelector('.dama')){
                    selection.options.forEach((div) => {div.style.backgroundColor = selection.color})
                    if (x.querySelector('.damaBranca') && atualPlayer == 'brancas'){                        
                        drawWalkTo(".damaBranca", indexY, indexX, topLeft=true, topRight=true)
                    }
                    if (x.querySelector('.damaPreta') && atualPlayer == "pretas"){
                        drawWalkTo(".damaPreta", indexY, indexX, false, false, bottomLeft=true, bottomRight=true)
                    }
                }
                if (getComputedStyle(x).getPropertyValue('background-color') == "rgb(0, 0, 255)"){
                    if (atualPlayer == "brancas"){
                        atualPlayer = "pretas"
                    } else {
                        atualPlayer = "brancas"
                    }
                    if (selection.enemy[0].length > 0 && selection.enemy[1].includes(x)){
                        selection.enemy[0][selection.enemy[1].indexOf(x)].children[0].remove()
                        selection.enemy = [[], []]
                    }
                    x.appendChild(selection.selected.children[0])
                    selection.options.forEach((div) => {div.style.backgroundColor = selection.color})
                }
            }
        })
    })
})