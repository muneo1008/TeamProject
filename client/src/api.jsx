import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost:8080/api',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

api.interceptors.response.use(
    response => response,
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

export const loginUser = async (email, password) => {
    try{
        const response = await api.post('/member/login',{
            email:email,
            password:password
        });
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const registerUser = async (email, password, nickname, gender, age, latitude,longitude ) => {
    try{
        const response = await api.post('/member/signup',{
            email:email,
            password:password,
            nickname: nickname,
            gender:gender,
            age:age,
            latitude:latitude,
            longitude:longitude
        });
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const registerExUser = async (email, nickname, gender, age, latitude,longitude ,socialId, provider) => {
    try{
        const response = await api.post('/member/signup/ex',{
            email:email,
            nickname: nickname,
            gender:gender,
            age:age,
            latitude:latitude,
            longitude:longitude,
            socialId: socialId,
            provider: provider
        });
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const userInfo = async ()=>{
    try{
        const response = await api.get('/member/me');
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const weatherInfo = async (latitude, longitude)=>{
    try {
        const response = await api.post('/weather',{
            latitude:latitude,
            longitude: longitude
        });
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const sendCode = async (email)=>{
    try {
        const response = await api.post('/member/send-code',{
            email:email,
            purpose:"signup"
        })
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const verifyCode = async (email, code)=>{
    try{
        const response = await api.post('/member/verify-code',{
            email:email,
            code:code
        })
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}
