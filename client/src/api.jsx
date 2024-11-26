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

export const registerUser = async (email, password, nickname, gender, age, latitude,longitude,profileImageUrl ) => {
    try{
        const response = await api.post('/member/signup',{
            email:email,
            password:password,
            nickname: nickname,
            gender:gender,
            age:age,
            latitude:latitude,
            longitude:longitude,
            profileImageUrl:profileImageUrl
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

export const getCodyRecommend = async (age, gender, temperature, weatherCondition, maxTemp, minTemp,rain)=>{
    try{
        const response = await api.post('/ai-fashion',{
            age:age,
            gender:gender,
            temperature:temperature,
            weatherCondition:weatherCondition,
            maxTemp:maxTemp,
            minTemp:minTemp,
            rain:rain,
        })
        return response.data;
    }catch (error) {
        console.log(error);
        throw error;
    }
}

export const getCodyImg = async (category,item,gender)=>{
    try {
        const response = await api.post('/crawling',{
            category:category,
            item:item,
            gender:gender
        })
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const getSnapById = async (id)=>{
    try{
        const response = await api.get(`/snaps/${id}`)
        return response.data;
    }catch (err){
        console.log('스냅 디테일 불러오기 실패',err);
        throw err;
    }
}

export const getSnapCommentById = async (id)=>{
    try {
        const response = await api.get(`/snaps/${id}/comments`);
        return response.data;
    }catch (err){
        console.log('스냅 댓글 불러오기 실패',err);
        throw err;
    }
}

export const getSnapLikedBySnapId = async (id)=>{
    try {
        const response = await api.get(`/snaps/${id}/liked`);
        return response.data;
    }catch (err){
        console.log('좋아요 불러오기 실패');
        throw err;
    }
}

export const getSnapList = async ()=>{
    try {
        const response = await api.get('/snaps');
        return response.data;
    }catch (err){
        console.log('스냅 리스트 불러오기 실패');
        throw err;
    }
}

export const likeTrue = async (SnapId)=>{
    try {
        const response = await api.post(`/snaps/${SnapId}/like`);
        return response.data;
    }catch (err){
        console.log('좋아요 실패');
        throw err;
    }
}

export const likeFalse = async (SnapId)=>{
    try {
        const response = await api.delete(`/snaps/${SnapId}/like`);
        return response.data;
    }catch (err){
        console.log('좋아요 취소 실패');
        throw err;
    }
}

export const mySnaps = async ()=>{
    try {
        const response = await api.get('/snaps/my-snaps');
        console.log('마이 스냅 불러오기 성공');
        return response.data;
    }catch (err){
        console.log('마이 스냅 불러오기 실패');
        throw err;
    }
}

export const likedSnaps = async ()=>{
    try {
        const response = await api.get('/snaps/liked-snaps');
        console.log('좋아요 스냅 불러오기 성공');
        return response.data;
    }catch (err){
        console.log('좋아요 스냅 불러오기 실패');
        throw err;
    }
}

export const savePersonalColor = async (personalColor)=>{
    try{
        const response = await api.post('/member/personalColor',{personalColor:personalColor});
        console.log('퍼컬 저장완료');
        return response.data;
    }catch (error){
        console.log(error);
        throw error;
    }
}

export const OtherInfo = async (memberId)=>{
    try {
        const response = await api.get(`/member/${memberId}`);
        console.log("타 유저 정보: ",response.data);
        return response.data;
    }catch (err){
        console.log(err);
        throw err;
    }
}

export const OtherSnapInfo = async (memberId)=>{
    try {
        const response = await api.get(`/snaps/member/${memberId}`);
        console.log("타 유저 스냅 정보: ",response.data);
        return response.data;
    }catch (err){
        console.log(err);
        throw err;
    }
}
export const OtherLikedSnapInfo = async (memberId)=>{
    try {
        const response = await api.get(`/snaps/member/${memberId}/liked`);
        console.log("타 유저 좋아요 스냅 정보: ",response.data);
        return response.data;
    }catch (err){
        console.log(err);
        throw err;
    }
}
