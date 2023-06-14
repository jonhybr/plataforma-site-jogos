const pergunta = document.getElementById('pergunta')
const botoes = document.querySelectorAll('.botao')
const pontos = document.getElementById('pontos')
const timer = document.getElementById('timer')

const perguntas = {
    1: {
        'pergunta': 'Pedro é casado com Maria, eles têm quatro filhas e cada filha tem dois irmãos. O casal tem ainda três netos, filhos de uma das filhas. Nesse caso, o número de pessoas dessa família é.',
        'respostas': [11, 13, 16, 12],
        'respostaCerta': 11
    },
    2: {
        'pergunta': 'Qual o quinto número primo?',
        'respostas': [11, 9, 13, 10],
        'respostaCerta': 11
    },
    3: {
        'pergunta': 'Você está em uma corrida de carro, ao ultrapassar o segundo colocado em que posição você fica?',
        'respostas': ['Segundo', 'Terceiro', 'Primeiro', 'Desclassificado'],
        'respostaCerta': 'Segundo'
    },
    4: {
        'pergunta': 'João tem 23 anos. Se ele tivesse nascido 10 anos atrás que idade ele teria hoje?',
        'respostas': [10, 13, 12, 20],
        'respostaCerta': 10
    },
    5: {
        'pergunta': 'Um tijolo pesa 1Kg mais meio tijolo. Quanto pesa este tijolo?',
        'respostas': ['1kg', '1,5kg', '2kg', '3kg'],
        'respostaCerta': '2kg'
    },
    6: {
        'pergunta': '',
        'imagem': '../imagens/pergunta_estacionamento.png',
        'respostas': ['83', '78', '87', '09'],
        'respostaCerta': '87'
    },
    7: {
        'pergunta': 'Alguns meses têm 30 dias, outros 31. Quantos têm 28 dias?',
        'respostas': [12, 1, 2, 'Nenhum'],
        'respostaCerta': 12
    },
    8: {
        'pergunta': 'Uma cobra está percorrendo uma caverna de 10 metros. Durante o dia, ela consegue andar dois metros. Porém, todas as noites, ela volta um metro. Em quanto tempo ela conseguirá chegar ao final da caverna?',
        'respostas': ['10 dias', '9 dias', '12 dias', '7 dias'],
        'respostaCerta': '9 dias'
    },
    9: {
        'pergunta': 'O Sr. Smith tem 4 filhas. Cada uma de suas filhas tem 1 irmão. Quantos filhos Sr. Smith tem ao todo?',
        'respostas': [5, 8, 9, 6],
        'respostaCerta': 5
    },
    10: {
        'pergunta': 'Andando por uma rua, um homem conta 10 árvores à sua direita. Na volta, conta 10 árvores à sua esquerda. Quantas árvores ele viu no total?',
        'respostas': [10, 20, 15, 30],
        'respostaCerta': 10
    },
    11: {
        'pergunta': 'Se são precisos 5 minutos para 5 máquinas produzirem 5 produtos, quanto tempo demorariam 100 máquinas a produzir 100 produtos?',
        'respostas': ['5 Minutos', '10 Minutos', '100 Minutos', '1000 Minutos'],
        'respostaCerta': '5 Minutos'
    },
    12: {
        'pergunta': 'Meu avô tem 4 filhos e cada filho tem 4 filhos. Quantos primos eu tenho?',
        'respostas': [16, 15, 12, 10],
        'respostaCerta': 12
    },
    13: {
        'pergunta': 'Uma mulher tem 30 reais para dividir entre suas duas filhas. Que horas são?',
        'respostas': ['13:45', '21:55', '15:00', '02:30'],
        'respostaCerta': '13:45'
    },
    14: {
        'pergunta': '25, 24, 22, 19, 15.',        
        'respostas': [10, 13, 12, 8],
        'respostaCerta': 10,
    },
    15: {
        'pergunta': 'Quando eu tinha seis anos, a minha irmã tinha a metade da minha idade. Agora que tenho 70 anos, com quantos anos minha irmã está?',        
        'respostas': [67, 35, 40, 37],
        'respostaCerta': 67,
    },
    16: {
        'pergunta': 'Uma garrafa com sua rolha custa R$ 1,10. Sabendo que a garrafa custa R$ 1,00 a mais que a rolha, qual é o preço da rolha?',
        'respostas': ['R$ 0,05', 'R$ 0,10', 'R$ 0,15','R$ 0,20'],
        'respostaCerta': 'R$ 0,05',
    },
    17: {
        'pergunta': 'Em um avião há 4 romanos e 1 inglês. Qual o nome da aeromoça?',    
        'respostas': ['Maria', 'Letícia', 'Luiza', 'Ivone'],
        'respostaCerta': 'Ivone',
    },
    18: {
        'pergunta': 'A mãe de Henrique teve 4 filhos: Abril, Maio e Junho foram os três primeiros. Qual o nome do quarto?',    
        'respostas': ['Henrique', 'Julho', 'Agosto', 'Setembro'],
        'respostaCerta': 'Henrique',
    },
    19: {
        'pergunta': 'CALCULE RÁPIDO: 5+5x5+5 = ?',    
        'respostas': [35, 55, 100, 60],
        'respostaCerta': 35,
    },
    20: {
        'pergunta': 'Quando entrei em um táxi, escontrei 9 passageiros. Depois de alguns minutos, desceram duas pessoas e entrou uma. Quantas pessoas há no táxi.',    
        'respostas': [7, 8, 9, 10],
        'respostaCerta': 10,
    },
    21: {        
        'respostas': ['M', 'O', 'P', '5'],
        'respostaCerta': '5',
        'imagem': '../imagens/pergunta_numeros.png',
    }
}
/*
BASE DE PERGUNTA
Nº: {
    'pergunta': '(Digite a pergunta)',    
    'respostas': [(R1, R2, R3, R4)],
    'respostaCerta': '(RCerta)',
    'imagem': '(caminho da imagem)[opcional]',
}
*/

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


var tempo = 0

function cronometro(){
    tempo += 1
    let seg = tempo
    let min = 0
    if (tempo >= 60){
        seg = tempo - (parseInt((tempo / 60)) * 60)
        min = parseInt(tempo / 60)        
    }
    if (seg < 10){
        seg = "0" + String(tempo - (parseInt((tempo / 60)) * 60))
    }
    if (min < 10){
        min = "0" + String(parseInt(tempo / 60))
    }
    

    timer.textContent = `${min}:${seg}`
}

setInterval(cronometro, 1000)