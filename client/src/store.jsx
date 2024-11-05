import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: {
        nickName: null,
    },
    reducers:{
        changeNickName(state, action){
            state.nickName = action.payload.nickName;
        }
    }
})

export let {changeNickName} = user.actions;

export default configureStore({
    reducer:{
        user: user.reducer,
    }
})
