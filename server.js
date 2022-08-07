const express = require('express');
const secRouter =  require('./secRouter');;
const app = express();
const port = process.env.PORT || 3000;

app.use (express.json());
app.use ('/api', secRouter);

// Cria um manipulador da rota padrão 
app.get('/', function (req, res) {
    res.send('CRUD - Acesso a BD Clientes - Juliano Cezar Caetano')
})

// Inicializa o servidor HTTP na porta 3000
app.listen(port, function () {
    console.log('Servidor rodando na porta 3000')
})


