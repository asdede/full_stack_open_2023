import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
console.log(promise)

axios.get('http://localhost:3001/persons').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
});
