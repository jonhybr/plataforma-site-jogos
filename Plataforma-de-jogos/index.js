const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'ejs')

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}))


app.listen(3000, () => {
    console.log('Servidor rodando na porta: 3000!')
})


app.get('/', (req, res) => {
    res.render('home');
})

app.get('/quiz', (req, res) => {
    res.render('quiz')
})

app.get('/tabuada', (req, res) => {
    res.render('tabuada')
})

app.get('/operacao', (req, res) => {
    res.render('operacao')
})

app.get('/endQuiz', (req, res) => {
    res.render('endQuiz', req.query)
})

app.get('/hanoi', (req, res) => {
    res.render('hanoi')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.get('/snake', (req, res) => {
    res.render('snake')
})

app.get('/brick', (req, res) => {
    res.render('brick')
})

app.get('/genius', (req, res) => {
    res.render('genius')
})

app.get('/memoria', (req, res) => {
    res.render('memoria')
})

app.get('/2048', (req, res) => {
    res.render('2048')
})