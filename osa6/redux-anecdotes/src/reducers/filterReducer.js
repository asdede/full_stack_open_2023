const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            console.log(state)
            return action.payload

        default:
            return state
    }
}

export const filterChange = filter => {
    console.log(filter)
    return {
        type : 'SET_FILTER',
        payload: filter
    }
}


export default filterReducer