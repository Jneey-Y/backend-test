const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const dataSchema = new mongoose.Schema({
    author: String,
    title: String,
    journal: String,
    date: Date,
    eprint: String,
    eprinttype: String,
    eprintclass: String,
    pages: String,
    annote: String,
})

dataSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Data', dataSchema)
