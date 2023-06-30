const escolhas = document.getElementsByClassName('escolha');
const velhaGrid = document.getElementById('velhaDiv');

const vitorias = document.getElementsByClassName('vitorias')
const movimentos = document.getElementsByClassName('movimentos')

const playersDiv = document.getElementsByClassName('player')



const opcoes = []
const grid = []

let player1 = ""
let player2 = ""
let atualPlayer = player1

for (const lados of escolhas){
    for (const opc of lados.children){
        opcoes.push(opc)
    }
}

for (const div of velhaGrid.children){
    grid.push(div)
}

for (const opc of opcoes){
    opc.onclick = () => {
        if (!player1){
            if (opcoes.indexOf(opc) < 2){
                player1 = opc.innerText
                player2 = opcoes[opcoes.indexOf(opc) + 2].innerText
                if (opcoes.indexOf(opc) == 0){
                    opcoes[0].style.flexBasis = "100%"
                    opcoes[2].style.flexBasis = "100%"
                    opcoes[1].remove()
                    opcoes[3].remove()
                } else {            
                    opcoes[1].style.flexBasis = "100%"  
                    opcoes[3].style.flexBasis = "100%"
                    opcoes[0].remove()
                    opcoes[2].remove()
                }
                
                atualPlayer = player1            
                playersDiv[0].children[0].style.color = "yellow"
            } else {          
                player1 = opcoes[opcoes.indexOf(opc) - 2].innerText
                player2 = opc.innerText
                if (opcoes.indexOf(opc) == 2){
                    opcoes[0].style.flexBasis = "100%"
                    opcoes[2].style.flexBasis = "100%"
                    opcoes[1].remove()
                    opcoes[3].remove()
                } else {            
                    opcoes[1].style.flexBasis = "100%"  
                    opcoes[3].style.flexBasis = "100%"
                    opcoes[0].remove()
                    opcoes[2].remove()
                }
                
                atualPlayer = player2
                playersDiv[1].children[0].style.color = "yellow"
            }
        }
    }    
}

addEventListener('mousemove', () => {    
    document.body.style.cursor = "default"
    if (player1){
        for (const spot of velhaGrid.children){            
            if (spot.matches(':hover') && !spot.classList.contains('placed')){                                    
                spot.innerText = atualPlayer
                spot.style.color = "grey"
                document.body.style.cursor = "pointer"  
                spot.onclick = () => {                    
                    if (spot.style.color == "grey"){
                        spot.classList.add('placed')
                        spot.style.color = "black"                        
                        checkWin()
                        if (atualPlayer == player1){
                            movimentos[0].innerText++
                            atualPlayer = player2
                            playersDiv[1].children[0].style.color = "yellow"
                            playersDiv[0].children[0].style.color = "white"
                        } else {
                            movimentos[1].innerText++
                            atualPlayer = player1
                            playersDiv[0].children[0].style.color = "yellow"
                            playersDiv[1].children[0].style.color = "white"
                        }
                    }
                }
                
            } else {
                if (!spot.classList.contains('placed')){
                    spot.innerText = ""
                    spot.style.color = "black"
                }                
            }
        }
    }    
})



function checkWin(){
    let empate = 0
    for (const div of grid){
        if (div.innerText != ""){
            empate++
            if (empate == grid.length){
                for (const div of grid){
                    div.innerText = ""
                    div.className = "espaco"
                }
            }
        }
    }
    for (let y = 0; y < 3; y++){
        let ch = 0
        let cv = 0
        for (let x = 0; x < 3; x++){
            if (grid[y].innerText != ""){
                if (grid[y].innerText == grid[y + (3*x)].innerText){
                    cv++
                } else {
                    cv = 0
                }
                if (cv==3){
                    console.log('VERTICAL')
                    resetGame()
                }
            } else {
                cv = 0
            }
            if (grid[y*3].innerText != ""){
                if (grid[y * 3].innerText == grid[(y * 3) + x].innerText){
                    ch++
                } else {
                    ch = 0
                }
                if (ch == 3){
                    console.log('horizontal')
                    resetGame()
                } 
            } else {
                ch = 0
            }
            if (grid[0].innerText != ""){
                if (grid[0].innerText == grid[4].innerText && grid[4].innerText == grid[8].innerText){
                    resetGame()
                }
            }
            if (grid[2].innerText != ""){
                if (grid[2].innerText == grid[4].innerText && grid[4].innerText == grid[6].innerText){
                    resetGame()
                }
            }
        }
    }
}

function resetGame(){
    if (atualPlayer == player1){
        vitorias[0].innerText++
    } else {
        vitorias[1].innerText++
    }
    for (const div of grid){
        div.innerText = ""
        div.className = "espaco"
    }
}