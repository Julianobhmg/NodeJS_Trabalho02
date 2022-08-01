// Importa o módulo do Express Framework
const express = require('express')
// Inicializa um objeto de aplicação Express
const app = express()

const port = process.env.PORT || 3000;

const lista_produtos = {
  produtos: [
      { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
      { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
      { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
      { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
      { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
  ]
}

app.use (express.json ())
app.use(express.urlencoded({ extended: true }));


  // realiza log da requisição
app.use('*', function(req, res, next) {
  //console.log(new Date().toLocaleString(), req.method, req.url, req.query, req.path)
  console.log("req.method:", req.method)
  console.log("req.url:", req.url)
  console.log("req.query:", req.query)
  console.log("req.path:", req.path)
  console.log("req.body.dados:", req.body.dados)  
  next ()
})

// Cria um manipulador da rota padrão 
app.get('/', function (req, res) {
    res.send('CRUD HTTP - Juliano Cezar Caetano')    

})

//Listar a lista de produtos
app.get('/produtos', function (req, res) {
   res.json(lista_produtos)
})

//Listar um produto por ID
app.get('/produtos/:id', function (req, res) {
  let id = Number.parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
  if (idx > -1) {
    res.json(lista_produtos.produtos[idx])
  } else {
    res.status (404).json ( {
      messsage: "Produto não encontrado."
    })
  }
})

//Alterar um produto
app.put('/produtos/:id', function (req, res) {
  let id = Number.parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
  if (idx > -1) {
      produtoAux = lista_produtos.produtos[idx];

      if (req.body.descricao != null) {
        produtoAux.descricao = req.body.descricao;
      } 
  
      if (req.body.valor != null ) {
        produtoAux.valor = req.body.valor;
      }
      
      if (req.body.marca != null ) {
        produtoAux.marca = req.body.marca;
      }

      lista_produtos.produtos[idx] = produtoAux;

      res.status (200).json ( { messsage: "Produto/ID alterado com sucesso." })
    
  } else {
    res.status (404).json ( { messsage: "Esse Produto/ID não existe." })
  }
})


//Excluir um produto
app.delete('/produtos/:id', function (req, res) {
  let id = Number.parseInt(req.params.id)
  let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
  if (idx > -1) {
    lista_produtos.produtos.splice(idx,idx)
    res.status (200).json ( { messsage: "Produto/ID excluído com sucesso." })
  } else {
    res.status (404).json ( { messsage: "Esse Produto/ID não existe." })
  }
})

//Incluir um produto
app.post('/produtos/', function (req, res) {    
  var data = req.body

  let id = Number.parseInt(req.body.id)
  let idx = lista_produtos.produtos.findIndex(elem => elem.id == id)
  if (idx > -1) {
    res.status (200).json ( { messsage: "Esse Produto/ID já existe." })
  } else {
      if ((req.body.id == null) || 
          (req.body.descricao == null) || 
          (req.body.valor == null) || 
          (req.body.marca == null)) {
          res.status (200).json ( { messsage: "Todos os campos são obigatorios." })
      } else {
        lista_produtos.produtos.push(req.body)
        res.status (200).json ( { messsage: "Produto cadastrado com sucesso." })
    }
  }
})

// Inicializa o servidor HTTP na porta 3000
app.listen(port, function () {
    console.log('Servidor rodando na porta 3000')
})


