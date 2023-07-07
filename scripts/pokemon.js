const options = document.getElementsByClassName('opc');
const ataquesDiv = document.getElementById('ataques');
const statusDiv = document.getElementById('status')
const pokemonGrid = document.getElementById("pokemonGrid");
const choosePokemonGrid = document.getElementById("choosePokemonGrid");
const chooseRightDiv = document.getElementById('choose')
const playerPokemon = document.getElementById("playerPokemon");

import moves from "./pokemon.json" assert {type: "json"}

class Pokemon{
    constructor(pokemonSprite, pokemonMoves, typeOfPokemon){
        this.sprite = new Image()
        this.sprite.src = pokemonSprite
        this.type = typeOfPokemon        
        this.maxHealth = 20        
        this.level = 5
        this.health = 20
        this.moves = [
            pokemonMoves[0],
            pokemonMoves[0],
            pokemonMoves[0],
            pokemonMoves[0]
        ]
    }
}

const pikachu = new Pokemon("../imagens/pikachu.png", [moves.TACKLE], "ELETRIC")
const charmander = new Pokemon("../imagens/charmander.png", [moves.TACKLE], "ELETRIC")
const squirtle = new Pokemon("../imagens/squirtle.png", [moves.TACKLE], "ELETRIC")
const bulbasaur = new Pokemon("../imagens/bulbasaur.png", [moves.TACKLE], "ELETRIC")

class Player {
    constructor(){
        this.pokemon = [{name: "PIKACHU", pokemon: pikachu}, {name: "CHARMANDER", pokemon: charmander}, 
                        {name: "SQUIRTLE", pokemon: squirtle}, {name: "BULBASAUR", pokemon: bulbasaur}]
        this.selectedPokemon = 0
        this.itens = []
    }
}

const player = new Player()

for (const opc of options){
    if (opc.innerHTML == "LUTAR"){
        opc.addEventListener('click', () => {
            lutar()
        })    
    }
    if (opc.innerHTML == "POKÉMON"){
        opc.addEventListener('click', () => {
            pokemon()
        })
    }
}

addEventListener("keyup", (e) => {
    if (e.key == 'Escape'){
        ataquesDiv.style.display = "none"
        statusDiv.style.display = "none"
    }
})

pokemonGrid.oncontextmenu = (e) => {    
    ataquesDiv.style.display = "none"
    statusDiv.style.display = "none"
    e.preventDefault()
}

choosePokemonGrid.oncontextmenu = (e) => {    
    choosePokemonGrid.style.display = "none"
    pokemonGrid.style.display = "grid"
    e.preventDefault()
}

function lutar(){
    statusDiv.style.display = "block"
    ataquesDiv.style.display = "block"
}

function bolsa(){

}

let c = 0
for (const div of chooseRightDiv.children){
    if (!div.querySelector('.pokebola') && player.pokemon[c]){
        if (c == 0){
            c++
        }            
        const pokebola = document.createElement('div')
        pokebola.classList.add('pokebola')
        div.appendChild(pokebola)

        const nome = document.createElement('div')
        nome.classList.add('nome')
        nome.innerText = player.pokemon[c].name
        div.appendChild(nome)

        const level = document.createElement('div')
        level.classList.add('level')
        level.innerText = player.pokemon[c].pokemon.level
        div.appendChild(level)

        const hpBar = document.createElement('div')
        hpBar.classList.add('hpBar')
        hpBar.innerText = "HP"
        div.appendChild(hpBar)

        const hp = document.createElement('div')
        hp.classList.add('hpValue')
        hp.innerText = player.pokemon[c].pokemon.health + "/" + player.pokemon[c].pokemon.maxHealth
        div.appendChild(hp)
        c++
    }
    
}

function pokemon(){
    

    pokemonGrid.style.display = "none"
    choosePokemonGrid.style.display = "flex"
}

function fugir(){

}