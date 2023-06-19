const operacoesDiv = document.getElementById('operacoesDiv')
const confirmar = document.getElementById('confirmar')

const operacoes = {
    1: {
        'operacao': [
            "<input type='text' class='calc' maxlength='2'>", 
            " + ", 
            " 25 ", 
            "<input type='text' class='calc' maxlength='1'>", 
            " 5 "],
        'resposta': 30
    },
    2: {
        'operacao': [
            "<input type='text' class='calc' maxlength='2'>", 
            " + ",
            " 50 ", 
            "<input type='text' class='calc' maxlength='2'>", 
            " 50 "],
        'resposta': 50
    },
    3: {
        'operacao': [
            " 5 ",
            " + ",
            " <input type='text' class='calc' maxlength='2'> ",
            " <input type='text' class='calc' maxlength='1'>",            
            " <input type='text' class='calc' maxlength='2'>", 
        ],
        'resposta': 100
    }


}

let opAtual = 2


function changeOp(){
    let screenOp = ''
    for (let x of operacoes[opAtual].operacao){
        screenOp += x
    }
    operacoesDiv.innerHTML = "<div>" + screenOp + " = " + operacoes[opAtual].resposta + "</div>"

    confirmar.onclick = () => {
        const inputs = document.querySelectorAll('.calc')
        let confirm = true
        for (let x of inputs){
            if (x.value == ''){
                confirm = false
            }
        }
        if (confirm){
            let c = 0
            let final = ''
            for (let x of operacoes[opAtual].operacao){
                if (x.includes('input')){
                    x = inputs[c].value
                    c++
                } 
                final += x
            }
            if (eval(final) == operacoes[opAtual].resposta){
                alert('ACERTOU!')
                opAtual = 1;
                changeOp()
            }            
            for (let x of inputs){
                x.value = ''
            }
        }
    }
}
changeOp()