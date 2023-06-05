const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));


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