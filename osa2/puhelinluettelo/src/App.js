import { useState,useEffect } from 'react';
import axios from 'axios';
import Contacts from './components/Contacts';
import checkIfExists from './components/checkIfExists';
import AddNums from './components/AddNums';
import Search from './components/Search';
import personServices from './services/persons'
import { v4 as uuidv4 } from 'uuid';



  

const App = () => {

  const hook =() => {
    console.log("effect");
    personServices
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }
  
  useEffect(hook,[])

  const [persons, setPersons] = useState([])
  const [newContact, setNewContact] = useState("")
  const [newNum,setNewNum] = useState("");
  const [filter,setFilter] = useState("");

  const addContact = (event) => {
    console.log("AddContact")
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
        id: uuidv4(),
        num: newNum
      }
      console.log(phonebookObject)
      console.log("Id:",persons.length + 1)
      setPersons(persons.concat(phonebookObject))
      setNewContact("")
      setNewNum("")
      personServices
        .create(phonebookObject)
        .then(response => {
          console.log(response)
        })
    }
  }

  const handleDelete = (id) => {
    console.log("Confirmating delete of id:",id);
    const name = persons.find(person => person.id === id)
    console.log(name.name)
    if (window.confirm("Do you really want to delete: " + name.name)) {
    
    personServices.del(id)
      .then(response => {
        console.log("Contact delted",response)
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        console.log("Got error while deleting",error)
      });
    
    }
    
  };

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
    console.log("handling input change")
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
      <Contacts contacts={numsToShow} handleDelete={handleDelete}/>
    </div>
  )
}


export default App
