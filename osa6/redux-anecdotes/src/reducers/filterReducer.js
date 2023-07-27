import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

/*
const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            console.log(state)
            return action.payload

        default:
            return state
    }
}
*/

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        filterChange(state,action) {
            return action.payload
        }
    }
})

/*
export const filterChange = filter => {
    console.log(filter)
    return {
        type : 'SET_FILTER',
        payload: filter
    }
}
*/


export const { filterChange } = filterSlice.actions
export default filterSlice.reducer