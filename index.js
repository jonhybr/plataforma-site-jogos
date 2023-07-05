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

const pages = ['placeholder', 'brickBreaker', 'setGame', 'maiormenor', "2048", "memoria", "genius", "brick", "snake", "cadastro",
"login", "hanoi", "operacao", "tabuada", "quiz", "velha", "muleta", "damas", "pokemon"]

for (const page of pages){
    app.get("/" + page, (req, res) => {
        res.render(page)
    })
}

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/endQuiz', (req, res) => {
    res.render("endQuiz", req.query)
})
