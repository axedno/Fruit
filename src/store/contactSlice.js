import { createSlice } from '@reduxjs/toolkit'

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
       contact: [],
       comments: {}
    },
    reducers: {
        getFruits: (state, action) => {
            state.contact = action.payload
        },
        renderByMax:(state) => {
            state.contact.sort((a, b) => a.count - b.count)

        },
        renderByMin:(state) => {
            state.contact.sort((a, b) => b.count - a.count)
        },
        sortByName:(state, action) => {
            state.contact = action.payload
        },
        commentsNew:(state, action) => {
           if(state.comments.hasOwnProperty(action.payload.key)) {
               state.comments[action.payload.key].push(action.payload.value)
           } else {
               state.comments[action.payload.key] = [];
               state.comments[action.payload.key].push(action.payload.value)
           }
        },
        commentsDelete:(state, action) => {
            state.comments[action.payload.key].splice(action.payload.index, 1)
        }
    },
})


export const { getFruits, renderByMax, renderByMin, sortByName, commentsNew, commentsDelete} = contactSlice.actions

export default contactSlice.reducer