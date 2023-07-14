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

const rotateDuvida = [
    {transform: 'rotate(10deg)'},
    {transform: 'rotate(-20deg)'},
    {transform: 'rotate(20deg)'},
    {transform: 'rotate(-20deg)'},    
    {transform: 'rotate(20deg)'},
    {transform: 'rotate(-10deg)'}
]

const rotateDuvidaTime = {
    duration: 400,
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

addEventListener('keyup', (e) => {
    if (!animating){
        if (e.key == "ArrowLeft"){
            duvida.innerText = '<'
            checkAnswer('menor')
        } else if (e.key == "ArrowRight") {
            duvida.innerText = '>'
            checkAnswer('maior')
        }
    }    
})

function checkAnswer(answer){
    const num1 = eval(n1.innerText);
    const num2 = eval(n2.innerText);

    if (num1 > num2){
        if (answer == 'maior'){
            animating = true
            let animation = topo.animate(rotateBalanceAnimation[1], rotateBalanceTime)            
            acima.animate(rotateBalanceAnimation[1], rotateBalanceTime)
            animation.onfinish = () => {
                animating = false
                duvida.innerText = '?'                
                if (document.querySelector("#fracao")){
                    changeQuizFracao()
                }
                else if (document.querySelector('#divisao')){
                    changeQuizDivisao()                
                } else {
                    changeQuiz()
                }                
            }
        } else {
            animating = true
            let animation = duvida.animate(rotateDuvida, rotateDuvidaTime)
            duvida.style.backgroundColor = "red"
            animation.onfinish = () => {
                animating = false
                duvida.innerText = "?"
                duvida.style.backgroundColor = "#4dc269"
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
                if (document.querySelector("#fracao")){
                    changeQuizFracao()
                } else if (document.querySelector('#divisao')){
                    changeQuizDivisao()                
                } else {
                    changeQuiz()
                }             
            }
        } else {            
            animating = true
            let animation = duvida.animate(rotateDuvida, rotateDuvidaTime)
            duvida.style.backgroundColor = "red"
            animation.onfinish = () => {
                animating = false
                duvida.innerText = "?"
                duvida.style.backgroundColor = "#4dc269"
            }
        }
    }
}

function changeQuiz(){
    let newN1 = Math.floor(Math.random() * 1000)
    let newN2 = Math.floor(Math.random() * 1000)
    while (newN2 == newN1){
        newN2 = Math.floor(Math.random() * 1000)
    }
    n1.innerText = newN1
    n2.innerText = newN2
}

function changeQuizFracao(){
    let newN1 = Math.floor(Math.random() * 12 + 1)
    let newN2 = Math.floor(Math.random() * 12 + 1)
    let newN3 = Math.floor(Math.random() * newN1 + 1)
    let newN4 = Math.floor(Math.random() * newN2 + 1)
    while (newN3 / newN1 == newN4 / newN2){
        newN1 = Math.floor(Math.random() * 12 + 1)
        newN3 = Math.floor(Math.random() * newN1 + 1)
    }
    n1.innerText = newN3 + "/" + newN1
    n2.innerText = newN4 + "/" + newN2
}

function changeQuizDivisao(){
    let newN1 = Math.floor(Math.random() * 12 + 1)
    let newN2 = Math.floor(Math.random() * 12 + 1)
    let newN3 = Math.floor(Math.random() * (newN1 * 3) + 1)
    let newN4 = Math.floor(Math.random() * (newN2 * 3) + 1)
    while (newN3 / newN1 == newN4 / newN2){
        newN1 = Math.floor(Math.random() * 12 + 1)
        newN3 = Math.floor(Math.random() * (newN1 * 3) + 1)
    }
    n1.innerText = newN3 + "/" + newN1
    n2.innerText = newN4 + "/" + newN2
}