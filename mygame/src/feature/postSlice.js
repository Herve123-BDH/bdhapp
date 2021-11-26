import {createSlice} from '@reduxjs/toolkit'

export const postSlice=createSlice({
    name: "post",
    initialState:{
        post: null
    },
    reducers:{
        getpost: (state,action)=>{
            state.post=action.payload;
        },
        removepost:(state)=>{
            state.post=null;
        }
    }
})

export const {getpost, removepost}=postSlice.actions
export const selectpost=(state)=>state.post.post;
export default postSlice.reducer