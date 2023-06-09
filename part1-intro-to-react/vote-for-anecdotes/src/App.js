import { useState } from 'react'

const Display = ({anecdote, numOfVotes}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {numOfVotes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState({anecdote: "", votes: 0})

  const updateVotes = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)

    if (votesCopy[selected] > mostVoted.votes) {
      const mostVotedCopy = { ...mostVoted }
      mostVotedCopy.anecdote = anecdotes[selected]
      mostVotedCopy.votes = votesCopy[selected]
      setMostVoted(mostVotedCopy)
    }
  }

  const updateRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  return (
    <div>
      <h1>Software Engineering Anecdotes</h1>
      <div>
        <h2>Anecdote of the day</h2>
        <Display anecdote={anecdotes[selected]} numOfVotes={votes[selected]} />
        <button onClick={updateVotes}>vote</button>
        <button onClick={updateRandom}>next anecdote</button>
      </div>
      {mostVoted.votes > 0 &&
        <div>
          <h2>Anecdote with most votes</h2>
          <Display anecdote={mostVoted.anecdote} numOfVotes={mostVoted.votes} />
        </div>
      }
    </div>
  )
}

export default App;
