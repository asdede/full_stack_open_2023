import {useEffect} from 'react'
import NoteContext, {ShowNote,NoteDispatch} from '../NoteContext';

const Notification = () => {

  const note = ShowNote();
  const noteDispatch = NoteDispatch();

  useEffect(() => {
    if (note) {
      const timer = setTimeout(() => {
        noteDispatch({ type: 'NULL' })
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, [note, noteDispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(note)
  
  if (note) {

  return (
    <div style={style}>
      {note}
    </div>
  )
  
  }
}


export default Notification
