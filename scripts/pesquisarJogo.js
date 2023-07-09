const jogos = document.getElementsByClassName('jogo');
const pesquisaInput = document.getElementById('pesquisaInput');

pesquisaInput.addEventListener('input', (e) => {
    if (pesquisaInput.value == ""){
        for (const jogo of jogos){
            jogo.style.display = "flex"
        }
    } else {
        for (const jogo of jogos){
            if (!jogo.querySelector('div').querySelector('a').querySelector('h3').innerHTML.toLocaleLowerCase().includes(pesquisaInput.value.toLocaleLowerCase())){
                jogo.style.display = "none"
            } else {
                jogo.style.display = "flex"
            }
        }
    }
    
})

