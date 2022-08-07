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


secRouter.get('/clientes/:cpf', function (req, res) {
  let cpf = Number.parseInt(req.params.cpf)

  knex
  .select('*')
  .from('cliente')
  .where ({ cpf: cpf})
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
    cpf: req.body.cpf,
    nome: req.body.nome,   
    email: req.body.email},
    ['cpf', 'nome', 'email'])
  .then (clientes => {
    let cliente = clientes[0]
    res.json ({ cliente })
  })
  .catch (err => res.status(500).json ({ message: 'Erro ao inserir cliente: ${err.message}'}))
})

//Excluir um cliente
secRouter.delete('/clientes/:cpf', function (req, res) {
  let cpf = Number.parseInt(req.params.cpf);
  if (cpf > 0) {
      knex('cliente')
        .where('cpf', cpf)
        .del()
        .then(  res.status (200).json ( { messsage: "cliente excluído com sucesso." }))
  } else {
    res.status (404).json ( { messsage: "Esse cliente não existe." })
  }  
})


//Alterar um cliente
secRouter.put('/clientes/:cpf', function (req, res) {  
  let cpf = Number.parseInt(req.params.cpf);
  if (cpf > 0) {
      knex('cliente')
          .where('cpf', cpf)
          .update({
              nome: req.body.nome,
              email: req.body.email
          },
          ['cpf','nome','email'])
          .then (clientes => {
              let cliente = clientes[0]
              res.status (200).json ( { messsage: "cliente alterado com sucesso." })
          })
  } else {
    res.status (404).json ( { messsage: "Esse cliente não existe." })
  }  
})
module.exports = secRouter
