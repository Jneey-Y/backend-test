const express = require('express')
const app = express()
require('dotenv').config()
const Data = require('./models/data')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/api/datas', (request, response) => {
  Data.find({}).then(datas => {
    response.json(datas.map(data => data.toJSON()))
  })
})

app.post('/api/datas', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }


  const data = new Data({
    author: body.author,
    title: body.title,
    journal: body.journal,
    year: body.year,
    eprint: body.eprint,
    eprinttype: body.eprinttype,
    eprintclass: body.eprintclass,
    pages: body.pages,
    month: body.month,
    annote: body.annote,
  })

  data.save().then(savedData => {
    response.json(savedData.toJSON())
  })
})

app.get('/api/datas/:id', (request, response, next) => {
  Data.findById(request.params.id)
    .then(data => {
      if (data) {
        response.json(data.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/data/:id', (request, response, next) => {
  Data.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/data/:id', (request, response, next) => {
  const body = request.body

  const data = {
    author: body.author,
    title: body.title,
    journal: body.journal,
    year: body.year,
    eprint: body.eprint,
    eprinttype: body.eprinttype,
    eprintclass: body.eprintclass,
    pages: body.pages,
    month: body.month,
    annote: body.annote,
  }

  Data.findByIdAndUpdate(request.params.id, data, { new: true })
    .then(updatedData => {
      response.json(updatedData.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})