import { cronometro } from "./cronometro.js";

const pergunta = document.getElementById('pergunta');
const botoes = document.querySelectorAll('.botao');
const timer = document.getElementById('timer');
const pontos = document.getElementById('pontos');
const erros = document.getElementById('erros');
const resposta = document.getElementById('respostaInput');

const perguntas = [];

// CRIAÇÃO DAS PERGUNTAS E RESPOSTAS
for (let x = 2; x < 10; x++){
    for (let y = 2; y < 10; y++){
        perguntas.push([String(x) + 'x' + String(y), x*y]);
    }
}

// PEGA UMA PERGUNTA ALEATORIA
function getRandomQuiz(){
    let randomQuiz = Math.floor(Math.random() * perguntas.length) + 1;
    return randomQuiz;
}

addEventListener('keydown', (evt) => {
    if (resposta.value != ''){
        if (evt.key == 'Enter'){
            if (resposta.value == perguntaAtual[1]){
                pontos.innerText++
                resposta.value = ''
                generateGame()
            } else {
                pontos.innerText = 0
                resposta.value = ''
                erros.innerText++
            }
        }
    }
    
})

addEventListener('click', () => {
    for (const x of botoes){
        if (x.matches(':hover')){
            if (x.value == perguntaAtual[1]){
                pontos.innerText++
                generateGame()
            } else {
                erros.innerText++
                pontos.innerText = 0
            }
        }
    }
})

let perguntaAtual = ''

// CONFIGURA NA TELA A PERGUNTA E AS RESPOSTAS
function generateGame(){

    perguntaAtual = perguntas[getRandomQuiz()];

    pergunta.innerText = perguntaAtual[0];

    let rng = [0, 1, 2, 3];
    rng = shuffle(rng)

    for (let x = 0; x < 3; x++){
        if (x == 2){
            botoes[rng[x]].value = perguntaAtual[1];
        } else {
            botoes[rng[x]].value = Math.floor(Math.random() * (perguntaAtual[1] / 2 - perguntaAtual[1] * 2) ) + perguntaAtual[1] * 2;
        }
    }
    
    
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

generateGame();

let tempo = 0;
tempo = setInterval(() => {
    tempo = cronometro(tempo, timer);
}, 1000);
