const noteReducer = (state, action) => {
    switch (action.type) {
      case 'ERR':
        return 'error'
      
      case 'VOTE':
        return 'voted'
      
      case 'ADD':
        return 'added'
      
      case 'NULL':
        return null
      
      default:
        return state
    }
}

export default noteReducer