const express = require('express')
const secRouter = express.Router()

const knex = require ('knex') ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  })

// realiza log da requisição
secRouter.use('*', function(req, res, next) {
  //console.log(new Date().toLocaleString(), req.method, req.url, req.query, req.path)
  console.log("req.method:", req.method)
  console.log("req.url:", req.url)
  console.log("req.query:", req.query)
  console.log("req.path:", req.path)
  console.log("req.body:", req.body)  
  next ()
})

//Listar a lista de produtos
secRouter.get('/produtos', function (req, res) {
    knex
      .select('*')
      .from('produto')
      .then(produto => res.json(produto))
  })


//Listar um produto por ID
secRouter.get('/produtos/:id', function (req, res) {
  let id = Number.parseInt(req.params.id)

  knex
  .select('*')
  .from('produto')
  .where ({ id: id})
  .then(produtos => { 
      if (produtos.length) {
        let produto = produtos[0]
        res.status(200).json(produto)
        res.end()
      } else {
        res.status (403).json ({ message:  "Produto inexistente."}) 
      }
  })
})

//Incluir um produto
secRouter.post('/produtos/', function (req, res) {   
  knex('produto')
  .insert({
    descricao: req.body.descricao,
    valor: req.body.valor,
    marca: req.body.marca},
    ['id', 'descricao', 'valor', 'marca'])
  .then (produtos => {
    let produto = produtos[0]
    res.json ({ produto })
  })
  .catch (err => res.status(500).json ({ message: 'Erro ao inserir produto: ${err.message}'}))
})

//Excluir um produto
secRouter.delete('/produtos/:id', function (req, res) {
  let id = Number.parseInt(req.params.id);
  if (id > 0) {
      knex('produto')
        .where('id', id)
        .del()
        .then(  res.status (200).json ( { messsage: "Produto/ID excluído com sucesso." }))
  } else {
    res.status (404).json ( { messsage: "Esse Produto/ID não existe." })
  }  
})


//Alterar um produto
secRouter.put('/produtos/:id', function (req, res) {  
  let id = Number.parseInt(req.params.id);
  if (id > 0) {
      knex('produto')
          .where('id', id)
          .update({
              descricao: req.body.descricao,
              valor: req.body.valor,
              marca: req.body.marca
          },
          ['id','descricao','valor','marca'])
          .then (produtos => {
              let produto = produtos[0]
              res.status (200).json ( { messsage: "Produto/ID alterado com sucesso." })
          })
  } else {
    res.status (404).json ( { messsage: "Esse Produto/ID não existe." })
  }  
})
module.exports = secRouter
