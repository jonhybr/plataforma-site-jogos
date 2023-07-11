import perguntas from "./caixas/caixa1.json" assert {type: "json"};

const caixa = document.getElementById('caixa');
const fullscreen = document.getElementById('fullscreen');
const exitFs = document.getElementById('exit-fullscreen');
const perguntasDivs = document.querySelectorAll('.pergunta-div');
const capas = document.querySelectorAll('.capa');
const voltarIcon = document.getElementsByClassName('voltar')[0];

const perguntasContainer = document.getElementById('perguntas-container');
const perguntandoContainer = document.getElementById('perguntando-container');

let perguntaAtual = ""
let click = false

function carregarPerguntas() {
    let c = 1
    for (const p of perguntasContainer.querySelectorAll('.pergunta-div')) {
        p.querySelector('.pergunta').innerHTML = perguntas[c].pergunta
        c++
    }
}

carregarPerguntas()

for (const capa of capas) {
    capa.addEventListener('click', (e) => {
        if (!click && capa.classList.contains('fechado')) {
            capa.classList.replace('fechado', 'clicado')
            click = true
            for (const test of perguntasDivs) {
                if (test.getElementsByClassName('capa')[0] != capa) {
                    test.classList.add('invisivel')
                } else {
                    perguntaAtual = Array.prototype.indexOf.call(perguntasContainer.children, test) + 1

                    perguntandoContainer.querySelector("#pergunta").innerHTML = perguntas[perguntaAtual].pergunta;

                    let c = 0
                    for (const alternativa of perguntandoContainer.querySelectorAll('.respostas')) {
                        alternativa.innerHTML = perguntas[perguntaAtual].respostas[c];
                        alternativa.onclick = () => {
                            if (alternativa.innerHTML == perguntas[perguntaAtual].resposta) {
                                alternativa.classList.add('certo');
                                console.log(perguntasContainer.children[perguntaAtual - 1])
                                console.log(perguntasContainer.children[perguntaAtual - 1].getElementsByClassName('capa')[0].classList)
                                perguntasContainer.children[perguntaAtual - 1].getElementsByClassName('capa')[0].classList.replace('clicado', 'certo')
                            } else {
                                alternativa.classList.add('errado');
                                perguntasContainer.children[perguntaAtual - 1].getElementsByClassName('capa')[0].classList.replace('clicado', 'errado')
                            }
                        }
                        c++
                    }

                    test.classList.add('zoom')
                    test.addEventListener('animationend', (e) => {
                        if (e.animationName == "pergunta-click") {
                            perguntasContainer.style.display = "none"
                            perguntandoContainer.style.display = "grid"
                            voltarIcon.classList.remove('hidden')
                        }
                    })
                }
            }
        }

    })
}

voltarIcon.addEventListener('click', () => {
    click = false
    for (const pergunta of perguntasDivs) {
        pergunta.className = "pergunta-div"
        pergunta.querySelector('.capa').classList.replace('clicado', 'fechado');
        perguntandoContainer.style.display = "none"
        perguntasContainer.style.display = "flex"
        voltarIcon.classList.add('hidden');
    }
    for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
        resposta.classList.remove('errado');
        resposta.classList.remove('certo');
    }
})

fullscreen.addEventListener('click', () => {
    caixa.requestFullscreen()

})

exitFs.addEventListener('click', () => {
    document.exitFullscreen()
})

function checkFullScreen() {
    if (!caixa.matches(':fullscreen')) {
        perguntandoContainer.querySelector('#pergunta').style.fontSize = "2.1vmin"
        for (const pergunta of perguntasContainer.querySelectorAll('.pergunta')) {
            pergunta.style.fontSize = "1vmin"
        }
        for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
            resposta.style.fontSize = "2.5vmin"
        }
        exitFs.classList.add('hidden')
        fullscreen.classList.remove('hidden')

    } else {
        perguntandoContainer.querySelector('#pergunta').style.fontSize = "3.1vmin"
        for (const pergunta of perguntasContainer.querySelectorAll('.pergunta')) {
            pergunta.style.fontSize = "1.5vmin"
        }
        for (const resposta of perguntandoContainer.querySelectorAll('.respostas')) {
            resposta.style.fontSize = "4.5vmin"
        }
        fullscreen.classList.add('hidden')
        exitFs.classList.remove('hidden')
    }
}

setInterval(checkFullScreen, 100)