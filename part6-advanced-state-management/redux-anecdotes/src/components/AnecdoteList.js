import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(addVoteTo(id))

    dispatch(showNotificationWithTimeout(`You voted for "${content}"`, 5))
  }

  return (
    <div>
      {anecdotes.filter(anecdote =>
        filterValue === null || anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </div>)
}

export default AnecdoteList
