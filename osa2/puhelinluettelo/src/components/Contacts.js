const Contacts = ({contacts}) => {
    return (
      <ul>
      {contacts.map(contact =>
        <li key={contact.id}>{contact.name} : {contact.num}</li>)
      }
      </ul>
    )
  }

export default Contacts