import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import  { useField } from './hooks'

const Menu = ({anecdotes, createNew, notification, setNotification}) => {

  const padding = {
    paddingRight: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <>
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/add_new' style={padding}>add new</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>

      <Notification notification={notification} />

      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/add_new" element={<AddNew createNew={createNew} setNotification={setNotification} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>- by {anecdote.author}</p>
      <p>has {anecdote.votes} votes</p>
      <p><a href={anecdote.info} target="_blank" rel="noreferrer">more info</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, on this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <footer>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
  </footer>
)

const AddNew = (props) => {
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetAuthor, ...author} = useField('text')
  const {reset: resetInfo, ...info} = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.createNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    props.setNotification(`A new anecdote "${content.value}" added!`)
    setTimeout(() => props.setNotification(null), 5000)

    navigate('/')
  }

  const resetAll = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>Add a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>add</button>
        <button type="button" onClick={resetAll} >reset</button>
      </form>
    </div>
  )
}

const Notification = ({notification}) => {
  return (
    notification &&
      <div>
        {notification}
      </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const createNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)

    // Check if 'info' starts with 'http://' or 'https://'
    if (!/^https?:\/\//i.test(anecdote.info)) {
      // If it doesn't, prepend 'http://'
      anecdote.info = 'http://' + anecdote.info
    }

    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router><Menu anecdotes={anecdotes} createNew={createNew} notification={notification} setNotification={setNotification} /></Router>
      <Footer />
    </div>
  )
}

export default App
