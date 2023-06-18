const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}))


app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000!')
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
})

app.get('/quiz', (req, res) => {
    res.sendFile(__dirname + '/views/quiz.html')
})

app.get('/tabuada', (req, res) => {
    res.sendFile(__dirname + '/views/tabuada.html')
})

app.get('/operacao', (req, res) => {
    res.sendFile(__dirname + '/views/operacao.html')
})

app.get('/errou', (req, res) => {
    res.render('quizErrou.ejs', req.query)
})

app.get('/hanoi', (req, res) => {
    res.sendFile(__dirname + '/views/hanoi.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/login.html")
})

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + "/views/cadastro.html")
})

app.get('/snake', (req, res) => {
    res.sendFile(__dirname + "/views/snake.html")
})