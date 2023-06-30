import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateAnecdote } from '../requests'
import { NotificationContext } from './NotificationContext'

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient()
  const [, showNotification] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes',
        anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      )
      showNotification(`You voted for "${updatedAnecdote.content}"`)
    }
  })

  const handleVote = () => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote
