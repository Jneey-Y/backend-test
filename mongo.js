const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const zyh84198= process.argv[2]

const url =
  'mongodb+srv://zyh84198:zyh84198@cluster0.bgirs.mongodb.net/seerarticle?retryWrites=true&w=majority'
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const dataSchema = new mongoose.Schema({
    
    author: String,
    title: String,
    journal: String,
    year: String,
    eprint: String,
    eprinttype: String,
    eprintclass: String,
    pages: String,
    month: String,
    annote: String,
  })
  
const Data = mongoose.model('Data', dataSchema)
  
const data = new Data({ 

  author:"Romano, Simone and Fucci, Davide and Baldassarre, Maria Teresa and Caivano, Danilo and Scanniello, Giuseppe",
  title:"An Empirical Assessment on Affective Reactions of Novice Developers when Applying Test-Driven Development",
  journal:"arXiv.org",
  year:"2019",
  eprint:"1907.12290",
  eprinttype:"arXiv",
  pages:"arXiv:1907.12290",
  month:"jul",
  annote:"Accepted for publication at the 20th International Conference on Product-Focused Software Process Improvement (PROFES19)"
})
// Data.find({}).then(result => {
//   result.forEach(data => {
//     console.log(data)
//   })
//   mongoose.connection.close()
// })
  
data.save().then(result => {
    console.log('data saved!')
    mongoose.connection.close()
  })