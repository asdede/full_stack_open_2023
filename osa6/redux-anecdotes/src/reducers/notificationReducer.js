import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificatonSlice = createSlice({
    name:'notification',
    initialState,
    reducers: {
        notiChange(state,action) {
            return action.payload
        },
        setNull(state) {
            return null
        }
    }

})

export const {notiChange,setNull} = notificatonSlice.actions

export const setNotification = (msg) => (dispatch) => {
    dispatch(notiChange(msg));

    setTimeout(() => {
        dispatch(setNull());
    },5000)
}

export default notificatonSlice.reducer