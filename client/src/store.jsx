import {configureStore, createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: {
        nickname: null,
        isLogin: false,
        age:null,
        gender:null,
        profileImgUrl:null,
        memberId:null,
        personalColor:null,
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
        SetProfileImgUrl(state, action){
            state.profileImgUrl = action.payload;
        },
        SetMemberId(state, action){
            state.memberId = action.payload;
        },
        SetPersonalColor(state, action){
            state.personalColor = action.payload;
        }

    }
})

export let {SetNickName,isLogin,SetAge,SetGender,SetProfileImgUrl,SetMemberId,SetPersonalColor} = user.actions;

export default configureStore({
    reducer:{
        user: user.reducer,
    }
})
