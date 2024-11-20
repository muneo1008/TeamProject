import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: {
        nickname: null,
        isLogin: false,
        age:null,
        gender:null,
    },

    reducers:{
        SetNickName(state, action){
            state.nickname = action.payload;
        },
        isLogin(state, action){
            state.isLogin = action.payload;
        },
        SetAge(state, action){
            state.age = action.payload;
        },
        SetGender(state, action){
            state.gender = action.payload;
        },

    }
})

export let {SetNickName,isLogin,SetAge,SetGender} = user.actions;

export default configureStore({
    reducer:{
        user: user.reducer,
    }
})
