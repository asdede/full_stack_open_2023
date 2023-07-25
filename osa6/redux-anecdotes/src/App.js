import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {
  
  return (
    <div>
    <Filter />
    <h2>Anecdotes</h2>
    <AnecdoteForm />
    <AnecdoteList/>
    </div>
  )
}

export default App