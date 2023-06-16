import { useState,useEffect } from 'react';
import axios from 'axios';
import Contacts from './components/Contacts';
import checkIfExists from './components/checkIfExists';
import AddNums from './components/AddNums';
import Search from './components/Search';



  

const App = () => {

  const hook =() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("fulfilled")
        setPersons(response.data)
      })
  }
  
  useEffect(hook,[])

  const [persons, setPersons] = useState([])
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
