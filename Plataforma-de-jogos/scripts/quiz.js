const pergunta = document.getElementById('pergunta')
const botoes = document.querySelectorAll('.botao')
const pontos = document.getElementById('pontos')
const timer = document.getElementById('timer')

import perguntas from './quizes.json' assert{type: 'json'}
import { cronometro } from './cronometro.js'

function getRandomQuiz(){
    let randomQuiz = Math.floor(Math.random() * Object.keys(perguntas).length) + 1;
    return randomQuiz;
}

function changeQuiz(quiz){
    let perguntaAtual = perguntas[quiz]
    pergunta.textContent = perguntaAtual['pergunta'];
    if (perguntaAtual['imagem']){
        pergunta.innerHTML += `<img src='${perguntaAtual['imagem']}'>`
    }
    perguntaAtual['respostas'].sort(() => 0.5 - Math.random());
    for (let i=0; i<4; i++){
        botoes[i].value = perguntaAtual['respostas'][i];
    }

    for (let x of botoes){
        x.onclick = () => {
            if (x.value == perguntaAtual['respostaCerta']){                
                feitas.push(quiz)
                pontos.textContent = feitas.length;
                startQuiz()
                return
            } else {
                window.location.href = '/errou?pontos=' + feitas.length + '&tempo=' + timer.textContent;
            }
        }
    }
}

var feitas = []

function startQuiz(){
    let quiz = getRandomQuiz()
    if (feitas.length < Object.keys(perguntas).length){
        while (feitas.includes(quiz)){
            quiz = getRandomQuiz();
        }
    }
    changeQuiz(quiz)
}

startQuiz()

let tempo = 0
setInterval(() => {
	tempo = cronometro(tempo, timer)
}, 1000)