import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notification, setNotification] = useState({message: null, type: null})

  useEffect(() => {
    personService
      .get()
      .then(personsData => {
        setPersons(personsData)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const resetInput = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personObj = { name: newName, number: newNumber}
    const personInPhonebook = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (personInPhonebook) {
      const isConfirmedByUser = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      if (!isConfirmedByUser) {
        return
      }

      const url = `http://localhost:3001/persons/${personInPhonebook.id}`

      personService
        .replace(url, personObj)
        .then(updatedPerson => {
          const updatedPersonsArray = persons.map(person => person.name.toLowerCase() === newName.toLowerCase()
            ? updatedPerson
            : person)
          setPersons(updatedPersonsArray)
          resetInput()

          setNotification(
            {
              message: `Replaced ${newName}'s number with the new number`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.name.toLowerCase() !== newName.toLowerCase()))
          resetInput()

          setNotification(
            {
              message: `${newName}'s number has already been deleted from server`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        })
    }
    else {
      personService
        .create(personObj)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          resetInput()

          setNotification(
            {
              message: `Added ${newName}'s number to the phonebook`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification({message: null, type: null})
          }, 5000)
        })
    }

  }

  const deletePersonOf = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name}?`)) {
        const url = `http://localhost:3001/persons/${id}`

        personService
          .remove(url)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id))

            setNotification(
              {
                message: `Deleted ${name}'s number from the phonebook`,
                type: 'success'
              }
            )
            setTimeout(() => {
              setNotification({message: null, type: null})
            }, 5000)
          })
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchName={searchName} handleSearchChange={handleSearchChange} persons={persons} />
      <br />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App;
