const caixa = document.getElementById('caixa');
const fullscreen = document.getElementById('fullscreen');
const exitFs = document.getElementById('exit-fullscreen');
const perguntasDivs = document.querySelectorAll('.pergunta-div');
const capas = document.querySelectorAll('.capa');
const voltarIcon = document.getElementsByClassName('voltar')[0];

const perguntasContainer = document.getElementById('perguntas-container');
const perguntandoContainer = document.getElementById('perguntando-container');

for (const capa of capas){
    capa.addEventListener('click', (e) => {
        capa.classList.replace('fechado', 'clicado')
        for (const test of perguntasDivs){            
            if (test.firstChild != capa){
                test.classList.add('invisivel')
            } else {
                test.classList.add('zoom')
                test.addEventListener('animationend', (e) => {
                    if (e.animationName == "pergunta-click"){
                        perguntasContainer.style.display = "none"
                        perguntandoContainer.style.display = "grid"
                        voltarIcon.classList.remove('hidden')
                    }
                })
            }
        }
    })
}

voltarIcon.addEventListener('click', () => {
    for (const pergunta of perguntasDivs){
        pergunta.classList.remove('invisivel');
        pergunta.querySelector('.capa').classList.replace('clicado', 'fechado');
        perguntandoContainer.style.display = "none"
        perguntasContainer.style.display = "flex"
        voltarIcon.classList.add('hidden');
    }
})

fullscreen.addEventListener('click', () => {
    caixa.requestFullscreen()
    fullscreen.classList.add('hidden')
    exitFs.classList.remove('hidden')
})

exitFs.addEventListener('click', () => {
    document.exitFullscreen()
    exitFs.classList.add('hidden')
    fullscreen.classList.remove('hidden')
})

