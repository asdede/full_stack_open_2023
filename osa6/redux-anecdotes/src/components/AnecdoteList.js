import { useSelector, useDispatch } from 'react-redux'
import  { votePost } from './../reducers/anecdoteReducer'
import { setNotification } from "./../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
      const filter = state.filter;
      return state.posts.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    })
  

    const dispatch = useDispatch()

    const vote = (id,postname) => {
        console.log('vote', id)
        dispatch(votePost(id))
        const msg = `You voted "${postname}"`
        dispatch(setNotification(msg,5))
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
                <button onClick={() => vote(anecdote.id,anecdote.content) }>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList