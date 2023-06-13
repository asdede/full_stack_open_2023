import { useState } from 'react';
import Contacts from './components/Contacts';
import checkIfExists from './components/checkIfExists';
import AddNums from './components/AddNums';
import Search from './components/Search';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',id:1, num: '040-123456' },
    { name: 'Ada Lovelace',id:2, num: '39-44-5323523' },
    { name: 'Dan Abramov',id:3, num: '12-43-234345' },
    { name: 'Mary Poppendieck',id:4, num: '39-23-6423122' }
  ])

  const [newContact, setNewContact] = useState("")
  const [newNum,setNewNum] = useState("");
  const [filter,setFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    console.log(event)
  
    if (checkIfExists(persons,newContact)) {
      const msg = "Name already exists in database: " + String(newContact) + "\nOr name is blank"  
      alert(msg)
      console.log("Name exists, reuturning...")
    }
    else {
      console.log("Adding new contact")
      const phonebookObject = {
        name: newContact,
        id: persons.length + 1,
        num: newNum
      }
      console.log(phonebookObject)
      console.log("Id:",persons.length + 1)
      setPersons(persons.concat(phonebookObject))
      setNewContact("")
      setNewNum("")
    }
  }

  const numsToShow = filter
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons;

  const handleNumInput = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  }

  const handleFilter = (event) => {
    const inputValue = event.target.value;
    console.log("filter changed")
    console.log(event.target.value)
    setFilter(inputValue);
  };


  const handleInputChange = (event) => {
    console.log(event.target.value)
    const value = event.target.value;
    console.log(value)
    setNewContact(value)
  }

  return (
    <div>
      <Search filter={filter} handleFilter={handleFilter}/>
      <h2>Phonebook</h2>
      <form onSubmit={addContact} >
        <AddNums newContact={newContact} handleInputChange={handleInputChange}
              newNum={newNum} handleNumInput={handleNumInput}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts contacts={numsToShow}/>
    </div>
  )
}



export default App
