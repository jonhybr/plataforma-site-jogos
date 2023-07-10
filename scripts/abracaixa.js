const caixa = document.getElementById('caixa');
const fullscreen = document.getElementById('fullscreen');
const perguntasDivs = document.querySelectorAll('.pergunta-div');
const capas = document.querySelectorAll('.capa');

for (const capa of capas){
    capa.addEventListener('click', (e) => {
        capa.classList.replace('fechado', 'clicado')
        for (const test of perguntasDivs){            
            if (test.firstChild != capa){
                test.classList.add('invisivel')
            } else {
                test.classList.add('zoom')
            }
        }
    })
}

fullscreen.addEventListener('click', () => {
    caixa.requestFullscreen()
})

