const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('give your password, and optionally, name and number as arguments')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://amywlchong:${password}@full-stack-open-cluster.islnkqf.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.error('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  }
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name,
  number,
})

if (name && number) {
  person.save().then(result => {
    console.log(`added ${name}'s number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook entries:')

  Person.find({}).then(result => {
    if (result.length === 0) {
      console.log('no entries')
    } else {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    }
    mongoose.connection.close()
  })
}
