import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: {
        nickName: null,
        isLogin: false,
        email: null,
        longitude: null,
        latitude: null,
    },
    reducers:{
        SetNickName(state, action){
            state.nickName = action.payload;
        },
        isLogin(state, action){
            state.isLogin = action.payload;
        },
        SetEmail(state, action){
            state.email = action.payload;
        },
        setLongitude(state, action){
            state.longitude = action.payload;
        },
        setLatitude(state, action){
            state.latitude = action.payload;
        }
    }
})

export let {SetNickName,isLogin, SetEmail, setLatitude,setLongitude} = user.actions;

export default configureStore({
    reducer:{
        user: user.reducer,
    }
})
