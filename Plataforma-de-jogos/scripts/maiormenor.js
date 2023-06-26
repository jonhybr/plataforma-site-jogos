const n1 = document.getElementById('numeroEsquerda');
const n2 = document.getElementById('numeroDireita');

const topo = document.getElementById('topo');
const acima = document.getElementById('acima');

const buttonMaior = document.getElementById('maior');
const buttonMenor = document.getElementById('menor');

const duvida = document.getElementById('duvidaDiv');

const rotateBalanceAnimation = [
    [
        {transform: 'rotate(0)'},
        {transform: 'rotate(10deg)'},
        {transform: 'rotate(10deg)'},       
        {transform: 'rotate(0)'}
    ],
    [
        {transform: 'rotate(0)'},
        {transform: 'rotate(-10deg)'},        
        {transform: 'rotate(-10deg)'},
        {transform: 'rotate(0)'}
    ],
]

const rotateBalanceTime = {
    duration: 1000,
    iterations: 1
}

var animating = false

buttonMaior.onclick = () => {
    if (!animating){
        duvida.innerText = '>'
        checkAnswer('maior')
    }    
}

buttonMenor.onclick = () => {
    if (!animating){
        duvida.innerText = '<'
        checkAnswer('menor')
    }
}

function checkAnswer(answer){
    const num1 = parseFloat(n1.innerText);
    const num2 = parseFloat(n2.innerText);

    if (num1 > num2){
        if (answer == 'maior'){
            animating = true
            let animation = topo.animate(rotateBalanceAnimation[1], rotateBalanceTime)            
            acima.animate(rotateBalanceAnimation[1], rotateBalanceTime)
            animation.onfinish = () => {
                animating = false
                duvida.innerText = '?'
                changeQuiz()
            }
        }
    }
    else {
        if (answer == 'menor'){
            animating = true
            let animation = topo.animate(rotateBalanceAnimation[0], rotateBalanceTime)            
            acima.animate(rotateBalanceAnimation[0], rotateBalanceTime)
            animation.onfinish = () => {
                animating = false
                duvida.innerText = '?'
                changeQuiz()
            }
        }
    }
}

function changeQuiz(){
    newN1 = Math.floor(Math.random() * 1000)
    newN2 = Math.floor(Math.random() * 1000)
    while (newN2 == newN1){
        newN2 = Math.floor(Math.random() * 1000)
    }
    n1.innerText = newN1
    n2.innerText = newN2
}