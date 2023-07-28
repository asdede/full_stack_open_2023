import { createContext, useReducer, useContext } from 'react'

const noteReducer = (state, action) => {
    switch (action.type) {
      case 'ERR':
        return "Too short anecdote, must have length of 5 or more"
      case 'VOTE':
        return `Voted ${action.anecdote.content}`;
      case 'ADD':
        return `Added new anecdote ${action.content}`;
      case 'NULL':
        return null;
      default:
        return state;
    }
  };

const NoteContext = createContext()

export const NoteContextProvider = (props) => {
    const [note,noteDispatch] = useReducer(noteReducer,null)

    return ( 
        <NoteContext.Provider value={[note, noteDispatch]}>
            {props.children}
        </NoteContext.Provider>
    )
}

export const ShowNote = () => {
    const noteAndDispatch = useContext(NoteContext)
    return noteAndDispatch[0]
}

export const NoteDispatch = () => {
    const noteAndDispatch = useContext(NoteContext)
    return noteAndDispatch[1]
}
export default NoteContext