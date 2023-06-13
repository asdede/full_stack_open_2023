import { useState } from 'react'


const Contacts = ({contacts}) => {
  return (
    <ul>
    {contacts.map(contact =>
      <li key={contact.id}>{contact.name} : {contact.num}</li>)
    }
    </ul>
  )
}

const checkIfExists = (ogArray,newName) => {
  console.log(ogArray)
  const nameArray = ogArray.map(item => item.name);
  console.log("Checking if",newName,"exists in array")
  if (nameArray.includes(newName) || newName === "") {
    console.log("Exists == TRUE")
    return true
  }
  console.log("Exists == FALSE")
  return false

}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',id:1, num: '040-123456' },
    { name: 'Ada Lovelace',id:2, num: '39-44-5323523' },
    { name: 'Dan Abramov',id:3, num: '12-43-234345' },
    { name: 'Mary Poppendieck',id:4, num: '39-23-6423122' }
  ])

  const [newContact, setNewContact] = useState("")
  const [newNum,setNewNum] = useState("");

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


  const handleNumInput = (event) => {
    console.log(event.target.value);
    setNewNum(event.target.value);
  }


  const handleInputChange = (event) => {
    console.log(event.target.value)
    const value = event.target.value;
    console.log(value)
    setNewContact(value)
  }

  return (
    <div>
      <p>Filter: </p>
      <input></input>
      <h2>Phonebook</h2>
      <form onSubmit={addContact} >
        <table>
          <tbody>
            <tr>
              <td>name:</td>
              <td><input value={newContact} onChange={handleInputChange}/></td> 
            </tr>
            <tr>
              <td>Number:</td>
              <td><input value={newNum} onChange={handleNumInput}/></td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts contacts={persons}/>
    </div>
  )
}



export default App
