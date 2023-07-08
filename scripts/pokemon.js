import moves from "./pokemon.json" assert {type: "json"}

const pokemonGrid = document.getElementById("pokemonGrid");
const choosePokemonGrid = document.getElementById("choosePokemonGrid");

const playerDiv = pokemonGrid.querySelector('#playerDiv');
const playerPokemon = pokemonGrid.querySelector('#playerPokemon');
const inimigoPokemon = pokemonGrid.querySelector('#inimigoPokemon');
const inimigoDiv = pokemonGrid.querySelector('#inimigoDiv');
const battleText = pokemonGrid.querySelector('#battleText');
const options = pokemonGrid.querySelector('#options');
const ataques = pokemonGrid.querySelector('#ataques');
const status = pokemonGrid.querySelector('#status');

const selected = choosePokemonGrid.querySelector('#selected');
const choose = choosePokemonGrid.querySelector('#choose');

class Pokemon {
    constructor(name, pokemonSprite, pokemonMoves, typeOfPokemon) {
        this.sprite = new Image()
        this.sprite.src = pokemonSprite
        this.name = name
        this.type = typeOfPokemon
        this.maxHealth = 30
        this.level = 5
        this.health = 30
        this.moves = [
            pokemonMoves[0],
            pokemonMoves[0],
            pokemonMoves[1],
        ]
    }
}

class Player {
    constructor() {
        this.pokemon = []
        this.selectedPokemon = 0
        this.itens = []
    }
}

const player = new Player()

player.pokemon.push(new Pokemon("BULBASAUR", "../imagens/pokemon/bulbasaur.png", [moves.tackle], "GRASS"))
player.pokemon.push(new Pokemon("PIKACHU", "../imagens/pokemon/pikachu.png", [moves.tackle], "ELETRIC"))
player.pokemon.push(new Pokemon("CHARMANDER", "../imagens/pokemon/charmander.png", [moves.tackle, moves.ember], "FIRE"))
player.pokemon.push(new Pokemon("SQUIRTLE", "../imagens/pokemon/squirtle.png", [moves.tackle], "WATER"))

function changePlayerPokemon(pkn) {
    player.pokemon[player.pokemon.indexOf(pkn)] = player.pokemon[0]
    player.pokemon[0] = pkn

    playerPokemon.src = pkn.sprite.src
    battleText.querySelector('#nameText').innerHTML = pkn.name
    for (const config of playerDiv.children) {
        if (config.id == "playerName") {
            config.innerHTML = pkn.name
        }
        else if (config.id == "playerLvl") {
            config.innerHTML = "Lv" + pkn.level
        }
        else if (config.id == "playerHealth") {
            config.querySelector('#health').style.setProperty("--healthWidth", ((pkn.health / pkn.maxHealth) * 100) + "%")
        }
        else if (config.id == "healthNumber") {
            config.innerHTML = pkn.health + "/" + pkn.maxHealth
        }
    }
    for (let x = 0; x < 4; x++) {
        if (pkn.moves[x]) {
            ataques.children[x].innerHTML = pkn.moves[x].name
        } else {
            ataques.children[x].innerHTML = "-"
        }
    }
}

function updatePlayerHealth(){
    playerDiv.querySelector('#health').style.setProperty("--healthWidth", ((player.pokemon[0].health / player.pokemon[0].maxHealth) * 100) + "%");
    playerDiv.querySelector("#healthNumber").innerHTML = player.pokemon[0].health + "/" + player.pokemon[0].maxHealth;
}

function updateChooseScreen() {
    selected.querySelector('.nome').innerHTML = player.pokemon[0].name
    selected.querySelector('.level').innerHTML = "Lv" + player.pokemon[0].level
    selected.querySelector('.hpBar').style.setProperty("--healthWidth", ((player.pokemon[0].health / player.pokemon[0].maxHealth) * 75) + "%");
    selected.querySelector('.hpValue').innerHTML = player.pokemon[0].health + "/" + player.pokemon[0].maxHealth
    player.pokemon.forEach((pkn, index) => {
        if (index != 0) {
            if (choose.children[index - 1].querySelector('div')) {
                choose.children[index - 1].querySelector('.nome').innerHTML = pkn.name
                choose.children[index - 1].querySelector('.level').innerHTML = "Lv" + pkn.level
                choose.children[index - 1].querySelector('.hpBar').style.setProperty("--healthWidth", ((pkn.health / pkn.maxHealth) * 75) + "%");
                choose.children[index - 1].querySelector('.hpValue').innerHTML = pkn.health + "/" + pkn.maxHealth
            } else {
                const pokebola = document.createElement('div')
                pokebola.classList.add('pokebola')
                choose.children[index - 1].appendChild(pokebola)
                const nome = document.createElement('div')
                nome.innerHTML = pkn.name
                nome.classList.add('nome')
                choose.children[index - 1].appendChild(nome)
                const level = document.createElement('div')
                level.innerHTML = "Lv" + pkn.level
                level.classList.add('level')
                choose.children[index - 1].appendChild(level)
                const hpBar = document.createElement('div')
                hpBar.innerHTML = "HP"
                hpBar.classList.add('hpBar')
                choose.children[index - 1].appendChild(hpBar)
                const hpValue = document.createElement('div')
                hpValue.innerHTML = pkn.health + "/" + pkn.maxHealth
                hpValue.classList.add('hpValue')
                choose.children[index - 1].appendChild(hpValue)
            }
        }
    })
}

function checkChoosenPokemon(){
    for (const pkn of choose.children){
        pkn.addEventListener('click', () => {
            let c = 1
            for (const pkn of choose.children){
                if (pkn.matches(':hover') && pkn.querySelector('div')){
                    changePlayerPokemon(player.pokemon[c]);
                    choosePokemonGrid.style.display = "none"
                    pokemonGrid.style.display = "grid"
                }
                c++
            }
        })
    }
}

function updateStatus(){
    addEventListener('mousemove', () => {
        for (const atk of ataques.children){
            if (atk.matches(':hover') && atk.innerHTML != "-"){
                let move = moves[atk.innerHTML.toLocaleLowerCase()]
                status.querySelector('#ppCounter').innerHTML = move.pp + "/" + move.maxPp                
                status.querySelector("#type").innerHTML = move.type
            }
        }
    })
}

changePlayerPokemon(player.pokemon[2])

function startGame() {
    updateChooseScreen()
    checkChoosenPokemon()
    updateStatus()

    pokemonGrid.oncontextmenu = (e) => {
        ataques.style.display = "none"
        status.style.display = "none"
        e.preventDefault()
    }
    choosePokemonGrid.oncontextmenu = (e) => {
        choosePokemonGrid.style.display = "none"
        pokemonGrid.style.display = "grid"
        e.preventDefault()
    }
    options.querySelector('.lutar').addEventListener("click", () => { lutar() })
    options.querySelector('.pokemon').addEventListener("click", () => { pokemon() })
}

function lutar() {
    player.pokemon[0].health--
    updatePlayerHealth()
    ataques.style.display = "flex"
    status.style.display = "flex"
}

function pokemon() {    
    updateChooseScreen()
    pokemonGrid.style.display = "none"
    choosePokemonGrid.style.display = "flex"
}



startGame()