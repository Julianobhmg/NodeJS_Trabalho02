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

//Listar a lista de clientes
secRouter.get('/clientes', function (req, res) {
    knex
      .select('*')
      .from('cliente')
      .then(cliente => res.json(cliente))
  })


//Listar um cliente por ID
secRouter.get('/clientes/:id', function (req, res) {
  let id = Number.parseInt(req.params.id)

  knex
  .select('*')
  .from('cliente')
  .where ({ id: id})
  .then(clientes => { 
      if (clientes.length) {
        let cliente = clientes[0]
        res.status(200).json(cliente)
        res.end()
      } else {
        res.status (403).json ({ message:  "cliente inexistente."}) 
      }
  })
})

//Incluir um cliente
secRouter.post('/clientes/', function (req, res) {   
  knex('cliente')
  .insert({
    nome: req.body.nome,
    cpf: req.body.cpf,
    email: req.body.email},
    ['id', 'nome', 'cpf', 'email'])
  .then (clientes => {
    let cliente = clientes[0]
    res.json ({ cliente })
  })
  .catch (err => res.status(500).json ({ message: 'Erro ao inserir cliente: ${err.message}'}))
})

//Excluir um cliente
secRouter.delete('/clientes/:id', function (req, res) {
  let id = Number.parseInt(req.params.id);
  if (id > 0) {
      knex('cliente')
        .where('id', id)
        .del()
        .then(  res.status (200).json ( { messsage: "cliente/ID excluído com sucesso." }))
  } else {
    res.status (404).json ( { messsage: "Esse cliente/ID não existe." })
  }  
})


//Alterar um cliente
secRouter.put('/clientes/:id', function (req, res) {  
  let id = Number.parseInt(req.params.id);
  if (id > 0) {
      knex('cliente')
          .where('id', id)
          .update({
              nome: req.body.nome,
              cpf: req.body.cpf,
              email: req.body.email
          },
          ['id','nome','cpf','email'])
          .then (clientes => {
              let cliente = clientes[0]
              res.status (200).json ( { messsage: "cliente/ID alterado com sucesso." })
          })
  } else {
    res.status (404).json ( { messsage: "Esse cliente/ID não existe." })
  }  
})
module.exports = secRouter
