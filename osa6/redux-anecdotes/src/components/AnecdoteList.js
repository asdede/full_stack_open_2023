import { useSelector, useDispatch } from 'react-redux'
import { votePost } from './../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
      const filter = state.filter;
      return state.posts.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    })

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(votePost(id))
    }
    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList